"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ExternalLink, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useWallet } from "@/contexts/wallet-context"
import { Connection } from "@solana/web3.js"

// Constants
const ICM_TOKEN_ADDRESS = "ICM_TOKEN_ADDRESS" // Address hidden from frontend
const RPC_ENDPOINT = "https://api.mainnet-beta.solana.com" // Consider using a dedicated RPC provider
const RAYDIUM_API_URL = "https://api.raydium.io/v2/main/route"
const FIXED_EXCHANGE_RATE = 33410832.26 // Set the fixed exchange rate as requested

export default function TradingWidget() {
  const { connected, publicKey, balances, connectWallet, refreshBalances } = useWallet()
  const [fromToken, setFromToken] = useState("SOL")
  const [toToken, setToToken] = useState("ICM")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [slippage, setSlippage] = useState(1) // 1% default slippage
  const [priceImpact, setPriceImpact] = useState(0)
  const [routeInfo, setRouteInfo] = useState(null)

  // Initialize connection
  const connection = new Connection(RPC_ENDPOINT)

  // Calculate output based on fixed exchange rate
  const calculateOutput = () => {
    if (!fromAmount || isNaN(Number(fromAmount))) {
      setToAmount("")
      return
    }

    if (fromToken === "SOL" && toToken === "ICM") {
      setToAmount((Number(fromAmount) * FIXED_EXCHANGE_RATE).toFixed(2))
    } else {
      setToAmount((Number(fromAmount) / FIXED_EXCHANGE_RATE).toFixed(6))
    }
  }

  // Execute swap
  const executeSwap = async () => {
    if (!publicKey || !fromAmount) return

    setLoading(true)

    try {
      // For now, we'll redirect to Raydium with the correct parameters
      let raydiumUrl = "https://raydium.io/swap/"

      if (fromToken === "SOL" && toToken === "ICM") {
        raydiumUrl += `?inputCurrency=SOL&outputCurrency=${ICM_TOKEN_ADDRESS}&fixed=in&exactAmount=${fromAmount}`
      } else {
        raydiumUrl += `?inputCurrency=${ICM_TOKEN_ADDRESS}&outputCurrency=SOL&fixed=in&exactAmount=${fromAmount}`
      }

      window.open(raydiumUrl, "_blank")

      // Refresh balances after swap
      setTimeout(() => {
        refreshBalances()
        setLoading(false)
      }, 2000)
    } catch (error) {
      console.error("Error executing swap:", error)
      alert("Swap failed. Please try again.")
      setLoading(false)
    }
  }

  // Swap token positions
  const swapTokenPositions = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  // Set max amount
  const setMaxAmount = () => {
    if (fromToken === "SOL") {
      // Leave some SOL for transaction fees
      const maxSol = Math.max(0, balances.SOL - 0.01)
      setFromAmount(maxSol.toString())
    } else {
      setFromAmount(balances.ICM.toString())
    }
  }

  // Refresh balances when component mounts or wallet connects
  useEffect(() => {
    if (connected) {
      refreshBalances()
    }
  }, [connected])

  // Calculate output when inputs change
  useEffect(() => {
    calculateOutput()
  }, [fromAmount, fromToken, toToken])

  return (
    <div className="flex flex-col h-full">
      {/* Token Selection */}
      <div className="bg-black/40 rounded-lg p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">From</span>
          <div className="flex items-center text-gray-400">
            <span>
              Balance: {connected ? (fromToken === "SOL" ? balances.SOL.toFixed(4) : balances.ICM.toFixed(0)) : "-.--"}
            </span>
            {connected && (
              <button
                onClick={setMaxAmount}
                className="ml-2 text-xs text-[#56CCF2] hover:text-[#4ECDC4]"
                disabled={loading}
              >
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
            disabled={loading || !connected}
          />

          <div className="flex items-center bg-[#2F80ED]/20 px-3 py-2 rounded-lg ml-2">
            <div className="relative w-5 h-5 mr-2">
              {fromToken === "SOL" ? (
                <Image
                  src="/images/sol-logo.png"
                  alt="SOL"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/images/icm-logo.png"
                  alt="ICM"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <span>{fromToken}</span>
          </div>
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center -my-2 z-10">
        <button
          className="bg-[#2F80ED]/30 p-2 rounded-full hover:bg-[#2F80ED]/50 transition-colors"
          onClick={swapTokenPositions}
          disabled={loading}
        >
          <ArrowDown size={16} />
        </button>
      </div>

      {/* To Token */}
      <div className="bg-black/40 rounded-lg p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">To</span>
          <span className="text-gray-400">
            Balance: {connected ? (toToken === "SOL" ? balances.SOL.toFixed(4) : balances.ICM.toFixed(0)) : "-.--"}
          </span>
        </div>

        <div className="flex items-center">
          <div className="text-xl font-bold w-full">
            {loading ? (
              <div className="flex items-center">
                <RefreshCw className="animate-spin mr-2" size={20} />
                <span>Calculating...</span>
              </div>
            ) : (
              toAmount || "0.0"
            )}
          </div>

          <div className="flex items-center bg-[#2F80ED]/20 px-3 py-2 rounded-lg ml-2">
            <div className="relative w-5 h-5 mr-2">
              {toToken === "SOL" ? (
                <Image
                  src="/images/sol-logo.png"
                  alt="SOL"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/images/icm-logo.png"
                  alt="ICM"
                  width={20}
                  height={20}
                  className="object-contain"
                  priority
                />
              )}
            </div>
            <span>{toToken}</span>
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      <div className="bg-black/20 rounded-lg p-4 mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Exchange Rate</span>
          <span className="text-green-400">1 SOL = 33,410,832.26 ICM</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Slippage Tolerance</span>
          <div className="flex space-x-1">
            <button
              onClick={() => setSlippage(0.5)}
              className={`px-2 py-1 rounded text-xs ${slippage === 0.5 ? "bg-[#2F80ED] text-white" : "bg-gray-700"}`}
            >
              0.5%
            </button>
            <button
              onClick={() => setSlippage(1)}
              className={`px-2 py-1 rounded text-xs ${slippage === 1 ? "bg-[#2F80ED] text-white" : "bg-gray-700"}`}
            >
              1%
            </button>
            <button
              onClick={() => setSlippage(3)}
              className={`px-2 py-1 rounded text-xs ${slippage === 3 ? "bg-[#2F80ED] text-white" : "bg-gray-700"}`}
            >
              3%
            </button>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      {connected ? (
        <button
          className={`w-full py-3 rounded-lg font-bold mb-4 ${
            loading || !fromAmount
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] hover:opacity-90"
          } transition-all`}
          onClick={executeSwap}
          disabled={loading || !fromAmount}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <RefreshCw className="animate-spin mr-2" size={16} />
              Processing...
            </div>
          ) : !fromAmount ? (
            "Enter an amount"
          ) : (
            `Swap ${fromToken} for ${toToken}`
          )}
        </button>
      ) : (
        <button
          className="w-full py-3 rounded-lg font-bold mb-4 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] hover:opacity-90 transition-all"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}

      {/* External Links */}
      <div className="text-center mt-auto space-y-2">
        <a
          href={`https://raydium.io/swap/?inputCurrency=SOL&outputCurrency=${ICM_TOKEN_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#56CCF2] hover:text-[#4ECDC4] transition-colors flex items-center justify-center"
        >
          Open in Raydium <ExternalLink className="ml-1" size={14} />
        </a>

        <a
          href={`https://birdeye.so/token/${ICM_TOKEN_ADDRESS}?chain=solana`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#56CCF2] hover:text-[#4ECDC4] transition-colors flex items-center justify-center"
        >
          View on Birdeye <ExternalLink className="ml-1" size={14} />
        </a>
      </div>
    </div>
  )
}
