"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export default function RaydiumChart() {
  const [timeframe, setTimeframe] = useState("1D")

  // Map timeframes to chart parameters
  const timeframeMap = {
    "1H": "1H",
    "1D": "1D",
    "1W": "1W",
    "1M": "1M",
  }

  return (
    <div className="h-full flex flex-col">
      {/* Timeframe selector */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          {Object.keys(timeframeMap).map((tf) => (
            <button
              key={tf}
              className={`px-3 py-1 text-sm rounded-md mr-2 ${
                timeframe === tf ? "bg-[#2F80ED] text-white" : "bg-[#2F80ED]/20 text-gray-300 hover:bg-[#2F80ED]/30"
              }`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <Info size={14} className="mr-1" />
          <span>Raydium Chart</span>
        </div>
      </div>

      {/* Raydium Chart */}
      <div className="flex-1 w-full h-full bg-black/20 rounded-lg overflow-hidden">
        <iframe
          src={`https://dex.raydium.io/market/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?timeframe=${timeframeMap[timeframe]}`}
          className="w-full h-full border-0"
          title="ICM Price Chart from Raydium"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
