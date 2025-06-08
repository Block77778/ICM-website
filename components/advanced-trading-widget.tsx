"use client"
import { useState, useEffect } from "react"
import { PublicKey } from "@solana/web3.js"
import { ArrowDown, RefreshCw, ExternalLink, Info, ChevronDown, ArrowUpRight } from "lucide-react"
import Image from "next/image"

// Constants
const SOL_TOKEN_ADDRESS = "So11111111111111111111111111111111111111112"
const ICM_TOKEN_ADDRESS = "6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp" // Address hidden from frontend
const BIRDEYE_SWAP_URL = `https://birdeye.so/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?chain=solana`
const FIXED_PRICE = 1 / 33410832.26 // Set the fixed exchange rate as requested

export default function TradingWidget() {
  const [fromToken, setFromToken] = useState<"SOL" | "ICM">("SOL")
  const [toToken, setToToken] = useState<"SOL" | "ICM">("ICM")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletPublicKey, setWalletPublicKey] = useState<PublicKey | null>(null)
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState(FIXED_PRICE)
  const [status, setStatus] = useState({ message: "", type: "" })
  const [slippage, setSlippage] = useState(0.5)
  const [balances, setBalances] = useState({ SOL: 0, ICM: 0 })
  const [showInfo, setShowInfo] = useState(false)

  // Connect wallet
  const connectWallet = async () => {
    try {
      // In preview mode, simulate wallet connection
      setLoading(true)

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock wallet data
      const mockPublicKey = new PublicKey("11111111111111111111111111111111")
      const shortAddress = "DEMO...WALLET"

      setWalletAddress(shortAddress)
      setWalletPublicKey(mockPublicKey)
      setWalletConnected(true)
      setStatus({ message: "Demo wallet connected!", type: "success" })

      // Set mock balances
      setBalances({
        SOL: 1,
        ICM: 0,
      })
    } catch (error) {
      setStatus({ message: `Error: ${error instanceof Error ? error.message : "Unknown error"}`, type: "error" })
    } finally {
      setLoading(false)
      setTimeout(() => setStatus({ message: "", type: "" }), 5000)
    }
  }

  // Calculate output amount
  const calculateOutput = () => {
    if (!fromAmount || isNaN(Number(fromAmount))) return

    if (fromToken === "SOL" && toToken === "ICM") {
      setToAmount((Number(fromAmount) * 33410832.26).toFixed(2))
    } else if (fromToken === "ICM" && toToken === "SOL") {
      setToAmount((Number(fromAmount) / 33410832.26).toFixed(6))
    }
  }

  // Swap token positions
  const swapTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  // Set max amount
  const setMaxAmount = () => {
    if (fromToken === "SOL") {
      // Leave 0.01 SOL for fees
      const maxAmount = Math.max(0, balances.SOL - 0.01)
      setFromAmount(maxAmount.toFixed(4))
    } else {
      setFromAmount(balances.ICM.toFixed(0))
    }
  }

  // Execute swap
  const executeSwap = async () => {
    if (!walletConnected) return connectWallet()
    if (!fromAmount || isNaN(Number(fromAmount))) {
      setStatus({ message: "Please enter a valid amount", type: "error" })
      setTimeout(() => setStatus({ message: "", type: "" }), 3000)
      return
    }

    if (Number(fromAmount) > balances[fromToken]) {
      setStatus({ message: `Insufficient ${fromToken} balance`, type: "error" })
      setTimeout(() => setStatus({ message: "", type: "" }), 3000)
      return
    }

    setLoading(true)
    setStatus({ message: "Preparing swap...", type: "pending" })

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful swap
      const mockTxId = "DEMO_TX_" + Math.random().toString(36).substring(2, 10)

      // Update balances with simulated values
      const fromAmountNum = Number(fromAmount)
      const toAmountNum = Number(toAmount)

      setBalances((prev) => ({
        SOL: fromToken === "SOL" ? Math.max(0, prev.SOL - fromAmountNum) : prev.SOL + toAmountNum,
        ICM: fromToken === "ICM" ? Math.max(0, prev.ICM - fromAmountNum) : prev.ICM + toAmountNum,
      }))

      setStatus({
        message: `Swap successful! Demo TX: ${mockTxId}`,
        type: "success",
      })
    } catch (error) {
      setStatus({
        message: `Swap failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        type: "error",
      })
    } finally {
      setLoading(false)
      setTimeout(() => {
        setStatus({ message: "", type: "" })
        setFromAmount("")
        setToAmount("")
      }, 5000)
    }
  }

  // Open Birdeye swap interface
  const openBirdeyeSwap = () => {
    let url = BIRDEYE_SWAP_URL

    // Add amount if provided
    if (fromAmount && !isNaN(Number(fromAmount))) {
      url += `&amount=${fromAmount}`
    }

    // If swapping from ICM to SOL, reverse the from/to parameters
    if (fromToken === "ICM") {
      url = `https://birdeye.so/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?chain=solana`
      if (fromAmount) {
        url += `&amount=${fromAmount}`
      }
    }

    window.open(url, "_blank")
  }

  // Calculate output when inputs change
  useEffect(() => {
    calculateOutput()
  }, [fromAmount, fromToken, toToken])

  return (
    <div className="max-w-md mx-auto bg-[#0F172A] rounded-xl shadow-md overflow-hidden p-6 border border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Image src="/images/icm-logo.png" alt="ICM Logo" width={24} height={24} className="mr-2" priority />
          <h2 className="text-lg font-semibold">ICM Swap</h2>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-1.5 rounded-full hover:bg-gray-800 transition-colors mr-2"
          >
            <Info size={16} className="text-gray-400" />
          </button>
          <a
            href={`https://birdeye.so/token/${ICM_TOKEN_ADDRESS}?chain=solana`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Image src="/placeholder.svg?height=16&width=16" alt="Birdeye" width={16} height={16} className="mr-1" />
            Birdeye
          </a>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="mb-4 p-3 bg-gray-800/50 rounded-lg text-sm">
          <p className="text-gray-300 mb-2">This widget connects to Birdeye's swap interface for trading ICM tokens.</p>
          <p className="text-gray-400 mt-1">
            Current Price: <span className="text-green-400">33,410,832.26 ICM per SOL</span>
          </p>
        </div>
      )}

      {/* From Token */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-2">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">From</span>
          <div className="flex items-center text-gray-400">
            <span>Balance: {walletConnected ? balances[fromToken].toFixed(fromToken === "SOL" ? 4 : 0) : "-.--"}</span>
            {walletConnected && (
              <button onClick={setMaxAmount} className="ml-2 text-xs text-blue-400 hover:text-blue-300">
                MAX
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            placeholder="0.0"
            className="bg-transparent text-xl font-bold focus:outline-none w-full"
            disabled={loading}
          />
          <div
            className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg ml-2 cursor-pointer"
            onClick={swapTokens}
          >
            <div className="w-5 h-5 mr-2">
              {fromToken === "SOL" ? (
                <Image
                  src="/images/sol-logo.png"
                  alt="SOL Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/images/icm-logo.png"
                  alt="ICM Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <span>{fromToken}</span>
            <ChevronDown size={16} className="ml-1 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Swap direction button */}
      <div className="flex justify-center -my-2 z-10">
        <button
          onClick={swapTokens}
          disabled={loading}
          className="bg-gray-700/50 p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <ArrowDown size={16} />
        </button>
      </div>

      {/* To Token */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">To</span>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={toAmount}
            readOnly
            className="bg-transparent text-xl font-bold focus:outline-none w-full"
          />
          <div
            className="flex items-center bg-gray-700/50 px-3 py-2 rounded-lg ml-2 cursor-pointer"
            onClick={swapTokens}
          >
            <div className="w-5 h-5 mr-2">
              {toToken === "SOL" ? (
                <Image
                  src="/images/sol-logo.png"
                  alt="SOL Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/images/icm-logo.png"
                  alt="ICM Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <span>{toToken}</span>
            <ChevronDown size={16} className="ml-1 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Price info */}
      <div className="mb-4 text-sm text-gray-400 flex justify-between p-2 bg-gray-800/30 rounded-lg">
        <span>Exchange Rate:</span>
        <span className="flex items-center">
          1 SOL = 33,410,832.26 ICM
          <RefreshCw size={12} className="ml-1 animate-spin opacity-50" />
        </span>
      </div>

      {/* Birdeye Swap Button */}
      <button
        onClick={openBirdeyeSwap}
        className="w-full py-3 px-4 rounded-lg font-bold text-lg bg-[#00C6A9] hover:bg-[#00B09B] text-black transition-all flex items-center justify-center"
      >
        Swap on Birdeye <ArrowUpRight className="ml-2" size={18} />
      </button>

      {/* Birdeye Branding */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center">
          <span className="text-xs text-gray-500">Powered by</span>
          <a href="https://birdeye.so" target="_blank" rel="noopener noreferrer" className="flex items-center ml-1">
            <span className="text-xs font-semibold text-[#00C6A9]">Birdeye</span>
            <ExternalLink size={10} className="ml-0.5 text-[#00C6A9]" />
          </a>
        </div>
      </div>

      {/* Additional links */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-xs">
        <a
          href={`https://birdeye.so/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?chain=solana`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors flex items-center"
        >
          Token Info <ExternalLink className="ml-1" size={10} />
        </a>
        <a
          href={`https://solscan.io/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors flex items-center"
        >
          Solscan <ExternalLink className="ml-1" size={10} />
        </a>
        <a
          href={`https://raydium.io/swap/?inputMint=sol&outputMint=6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors flex items-center"
        >
          Raydium <ExternalLink className="ml-1" size={10} />
        </a>
      </div>
    </div>
  )
}
