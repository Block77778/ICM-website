"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"

// ICM token address
const ICM_TOKEN_ADDRESS = "6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp"

// Solana RPC endpoint - using public mainnet for real data
const SOLANA_RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"

// ICM token decimals
const ICM_DECIMALS = 9

interface WalletContextType {
  connected: boolean
  publicKey: string | null
  walletAddress: string | null
  connecting: boolean
  balances: {
    SOL: number
    ICM: number
  }
  connectWallet: () => Promise<void>
  disconnectWallet: () => Promise<void>
  refreshBalances: () => Promise<void>
  phantomProvider: any
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  walletAddress: null,
  connecting: false,
  balances: {
    SOL: 0,
    ICM: 0,
  },
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  refreshBalances: async () => {},
  phantomProvider: null,
})

export const useWallet = () => useContext(WalletContext)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [balances, setBalances] = useState({ SOL: 0, ICM: 0 })
  const [fetchingBalances, setFetchingBalances] = useState(false)
  const [phantomProvider, setPhantomProvider] = useState<any>(null)

  // Initialize connection
  const connection = new Connection(SOLANA_RPC_ENDPOINT, "confirmed")

  // Check if wallet is already connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      // Check if Phantom is installed
      if (typeof window !== "undefined" && window.phantom?.solana) {
        setPhantomProvider(window.phantom.solana)

        // Check if already connected
        try {
          const isConnected = localStorage.getItem("walletConnected") === "true"
          if (isConnected) {
            const savedPublicKey = localStorage.getItem("walletFullAddress")
            const savedWalletAddress = localStorage.getItem("walletAddress")

            if (savedPublicKey && savedWalletAddress) {
              // Try to reconnect to Phantom
              try {
                await window.phantom.solana.connect({ onlyIfTrusted: true })
                setConnected(true)
                setPublicKey(savedPublicKey)
                setWalletAddress(savedWalletAddress)

                // Fetch balances
                await fetchBalances(savedPublicKey)
              } catch (error) {
                console.error("Error reconnecting to wallet:", error)
                // Clear localStorage if reconnect fails
                localStorage.removeItem("walletConnected")
                localStorage.removeItem("walletAddress")
                localStorage.removeItem("walletFullAddress")
              }
            }
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    checkWalletConnection()

    // Set up event listeners for Phantom wallet
    if (typeof window !== "undefined" && window.phantom?.solana) {
      const handleAccountsChanged = () => {
        console.log("Phantom accounts changed")
        checkWalletConnection()
      }

      window.phantom.solana.on("accountChanged", handleAccountsChanged)

      return () => {
        window.phantom.solana.off("accountChanged", handleAccountsChanged)
      }
    }
  }, [])

  // Fetch SOL and ICM token balances
  const fetchBalances = async (walletPublicKey: string) => {
    if (fetchingBalances) return { SOL: balances.SOL, ICM: balances.ICM }

    setFetchingBalances(true)

    try {
      // Create PublicKey object
      const pubKey = new PublicKey(walletPublicKey)

      // Fetch SOL balance
      const solBalance = await connection.getBalance(pubKey)
      const solBalanceInSol = solBalance / LAMPORTS_PER_SOL

      // Fetch ICM balance using the more efficient approach
      let icmBalance = 0
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubKey, {
          programId: TOKEN_PROGRAM_ID,
          mint: new PublicKey(ICM_TOKEN_ADDRESS),
        })

        icmBalance =
          tokenAccounts.value.length > 0
            ? Number(tokenAccounts.value[0].account.data.parsed.info.tokenAmount.amount) / Math.pow(10, ICM_DECIMALS)
            : 0
      } catch (err) {
        console.error("Error fetching ICM balance:", err)
      }

      const newBalances = {
        SOL: solBalanceInSol,
        ICM: icmBalance,
      }

      setBalances(newBalances)
      return newBalances
    } catch (err) {
      console.error("Error fetching balances:", err)
      return { SOL: 0, ICM: 0 }
    } finally {
      setFetchingBalances(false)
    }
  }

  // Connect wallet
  const connectWallet = async () => {
    try {
      setConnecting(true)

      // Check if Phantom is installed
      const isPhantomInstalled = window.phantom?.solana?.isPhantom

      if (!isPhantomInstalled) {
        alert("Phantom wallet is not installed. Please install it from https://phantom.app/")
        window.open("https://phantom.app/", "_blank")
        setConnecting(false)
        return
      }

      // Connect to Phantom
      const response = await window.phantom?.solana?.connect()
      const walletPublicKey = response.publicKey.toString()

      // Format the address for display
      const shortAddress = `${walletPublicKey.slice(0, 4)}...${walletPublicKey.slice(-4)}`

      setConnected(true)
      setPublicKey(walletPublicKey)
      setWalletAddress(shortAddress)
      setPhantomProvider(window.phantom.solana)

      // Store in localStorage
      localStorage.setItem("walletConnected", "true")
      localStorage.setItem("walletAddress", shortAddress)
      localStorage.setItem("walletFullAddress", walletPublicKey)
      localStorage.setItem("walletType", "Phantom")

      // Fetch balances
      await fetchBalances(walletPublicKey)

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("walletConnectionChanged"))

      setConnecting(false)
    } catch (error) {
      console.error("Error connecting to wallet:", error)
      alert("Failed to connect to wallet. Please try again.")
      setConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      // If using Phantom, disconnect properly
      if (localStorage.getItem("walletType") === "Phantom" && window.phantom?.solana) {
        await window.phantom.solana.disconnect()
      }

      setConnected(false)
      setPublicKey(null)
      setWalletAddress(null)
      setBalances({ SOL: 0, ICM: 0 })

      // Clear localStorage
      localStorage.removeItem("walletConnected")
      localStorage.removeItem("walletAddress")
      localStorage.removeItem("walletFullAddress")
      localStorage.removeItem("walletType")

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("walletConnectionChanged"))
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  // Refresh balances
  const refreshBalances = async () => {
    if (connected && publicKey) {
      return await fetchBalances(publicKey)
    }
    return { SOL: 0, ICM: 0 }
  }

  // Add the periodic balance refresh effect
  useEffect(() => {
    if (!connected || !publicKey) return

    const interval = setInterval(() => {
      fetchBalances(publicKey)
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [connected, publicKey])

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey,
        walletAddress,
        connecting,
        balances,
        connectWallet,
        disconnectWallet,
        refreshBalances,
        phantomProvider,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
