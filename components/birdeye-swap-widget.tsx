"use client"
import { useState, useEffect, useRef } from "react"
import { RefreshCw, ExternalLink, Maximize2, ArrowRight } from "lucide-react"
import Image from "next/image"

// ICM token address
const ICM_TOKEN_ADDRESS = "6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp"

// Birdeye swap URL with ICM token pre-selected
const BIRDEYE_SWAP_URL = `https://birdeye.so/swap?chain=solana&from=So11111111111111111111111111111111111111112&to=${ICM_TOKEN_ADDRESS}&embed=1`

// Actual ICM price per SOL
const ICM_PRICE_PER_SOL = 33410832.26

export default function BirdeyeSwapWidget() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Format large numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US", { maximumFractionDigits: 2 })
  }

  // Handle iframe load events
  const handleIframeLoad = () => {
    setLoading(false)
  }

  // Handle iframe error
  const handleIframeError = () => {
    setLoading(false)
    setError(true)
  }

  // Open in full screen
  const openFullScreen = () => {
    window.open(BIRDEYE_SWAP_URL.replace("&embed=1", ""), "_blank")
  }

  // Retry loading iframe
  const retryLoading = () => {
    setLoading(true)
    setError(false)

    if (iframeRef.current) {
      iframeRef.current.src = BIRDEYE_SWAP_URL
    }
  }

  // Set up message listener for iframe communication
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Handle any postMessage events from the Birdeye iframe
      // This could be used for custom integration if Birdeye provides an API
      if (event.origin.includes("birdeye.so")) {
        console.log("Message from Birdeye:", event.data)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <div className="w-full h-full flex flex-col bg-[#0F172A] rounded-xl shadow-md overflow-hidden border border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="flex items-center">
          <Image src="/images/icm-logo.png" alt="ICM Logo" width={24} height={24} className="mr-2" />
          <h2 className="text-lg font-semibold">ICM Token Swap</h2>
        </div>
        <div className="flex items-center space-x-2">
          <a
            href={`https://birdeye.so/token/${ICM_TOKEN_ADDRESS}?chain=solana`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            Token Info <ExternalLink size={14} className="ml-1" />
          </a>
          <button
            onClick={openFullScreen}
            className="p-1.5 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
            title="Open in full screen"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Price Display */}
      <div className="p-3 bg-gray-800/50 flex items-center justify-center border-b border-gray-700">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <Image src="/images/icm-logo.png" alt="ICM Logo" width={20} height={20} className="mr-1" />
            <span className="font-bold text-[#00C6A9]">{formatNumber(ICM_PRICE_PER_SOL)}</span>
            <span className="text-gray-400 mx-1">ICM</span>
          </div>
          <ArrowRight size={14} className="text-gray-500 mx-1" />
          <div className="flex items-center ml-3">
            <Image src="/images/sol-logo.png" alt="SOL Logo" width={20} height={20} className="mr-1" />
            <span className="font-bold text-amber-500">1</span>
            <span className="text-gray-400 ml-1">SOL</span>
          </div>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="relative flex-grow w-full" style={{ height: "560px" }}>
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0F172A] z-10">
            <RefreshCw size={40} className="animate-spin text-[#00C6A9] mb-4" />
            <p className="text-gray-300">Loading Birdeye Swap...</p>
          </div>
        )}

        {/* Error Overlay */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0F172A] z-10 p-6">
            <div className="bg-red-900/20 p-6 rounded-lg text-center max-w-md">
              <p className="text-red-400 mb-4">
                Unable to load Birdeye Swap. This could be due to browser restrictions or network issues.
              </p>
              <div className="flex flex-col space-y-3">
                <button
                  onClick={retryLoading}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Retry
                </button>
                <a
                  href={BIRDEYE_SWAP_URL.replace("&embed=1", "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#00C6A9] hover:bg-[#00B09B] text-black rounded-lg transition-colors flex items-center justify-center"
                >
                  Open Birdeye Swap <ExternalLink size={14} className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Birdeye Swap Iframe */}
        <iframe
          ref={iframeRef}
          src={BIRDEYE_SWAP_URL}
          title="Birdeye Swap"
          className="w-full h-full border-0"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="clipboard-write; clipboard-read"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>

      {/* Footer - REMOVED TOKEN ADDRESS */}
      <div className="p-3 border-t border-gray-800 flex justify-center items-center">
        <div className="flex items-center">
          <span className="text-xs text-gray-500">Powered by</span>
          <a href="https://birdeye.so" target="_blank" rel="noopener noreferrer" className="flex items-center ml-1">
            <span className="text-xs font-semibold text-[#00C6A9]">Birdeye</span>
            <ExternalLink size={10} className="ml-0.5 text-[#00C6A9]" />
          </a>
        </div>
      </div>
    </div>
  )
}
