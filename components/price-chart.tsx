"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Maximize, Minimize, RefreshCw } from "lucide-react"

// ICM token address
const ICM_TOKEN_ADDRESS = "6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp"

interface PriceData {
  date: string
  price: number
  volume: number
}

export default function CustomChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [timePeriod, setTimePeriod] = useState("1D")
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [currentPrice, setCurrentPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showVolume, setShowVolume] = useState(true)
  const [indicators, setIndicators] = useState<string[]>([])
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch real price data
  useEffect(() => {
    const fetchPriceData = async () => {
      setLoading(true)
      setError(null)

      try {
        // In a real implementation, this would be an API call to Birdeye, Raydium, or another price oracle
        // For example: const response = await fetch(`https://api.birdeye.so/public/price?token=${ICM_TOKEN_ADDRESS}`)

        // Since we can't make actual API calls in this environment, we'll simulate a response
        // but in a real implementation, you would replace this with actual API calls

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get current price (this would come from the API)
        const currentTokenPrice = 0.000125 // 1 SOL = 8,000 ICM

        // Generate historical data based on time period (this would come from the API)
        const days = timePeriod === "1H" ? 1 / 24 : timePeriod === "1D" ? 1 : timePeriod === "1W" ? 7 : 30

        const dataPoints =
          timePeriod === "1H"
            ? 60
            : // 1 minute intervals
              timePeriod === "1D"
              ? 24
              : // hourly intervals
                timePeriod === "1W"
                ? 7 * 24
                : // hourly intervals
                  30 * 24 // hourly intervals for month

        const data: PriceData[] = []
        const now = new Date()
        let price = currentTokenPrice

        // Generate historical data points
        for (let i = dataPoints; i >= 0; i--) {
          const date = new Date(now)
          if (timePeriod === "1H") {
            date.setMinutes(date.getMinutes() - i)
          } else {
            date.setHours(date.getHours() - i)
          }

          // Add some randomness to simulate price movement
          const change = (Math.random() - 0.5) * 0.01
          price = price * (1 + change)
          price = Math.max(price, 0.000001)

          data.push({
            date: date.toISOString(),
            price: price,
            volume: Math.floor(Math.random() * 1000000) + 500000,
          })
        }

        setPriceData(data)
        setCurrentPrice(currentTokenPrice)

        // Calculate price change
        if (data.length > 1) {
          const earliest = data[0].price
          const latest = data[data.length - 1].price
          setPriceChange(((latest - earliest) / earliest) * 100)
        }

        setLoading(false)
      } catch (err) {
        console.error("Error fetching price data:", err)
        setError("Failed to load price data. Please try again.")
        setLoading(false)
      }
    }

    fetchPriceData()

    // Set up interval to refresh price data
    const intervalId = setInterval(fetchPriceData, 60000) // Refresh every minute

    return () => clearInterval(intervalId)
  }, [timePeriod])

  // Draw the chart
  useEffect(() => {
    if (!canvasRef.current || priceData.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const container = chartContainerRef.current
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Extract price and volume data
    const prices = priceData.map((d) => d.price)
    const volumes = priceData.map((d) => d.volume)

    // Calculate min and max for scaling
    const minPrice = Math.min(...prices) * 0.95
    const maxPrice = Math.max(...prices) * 1.05
    const maxVolume = Math.max(...volumes)

    // Chart dimensions
    const padding = { top: 40, right: 40, bottom: showVolume ? 100 : 40, left: 60 }
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom
    const volumeHeight = showVolume ? 60 : 0

    // Draw price chart background
    ctx.fillStyle = "rgba(47, 128, 237, 0.05)"
    ctx.fillRect(padding.left, padding.top, chartWidth, chartHeight - volumeHeight)

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 1

    // Horizontal grid lines
    const priceStep = (maxPrice - minPrice) / 5
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight - volumeHeight) * (1 - i / 5)
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(padding.left + chartWidth, y)
      ctx.stroke()

      // Price labels
      const price = minPrice + priceStep * i
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.font = "10px Arial"
      ctx.textAlign = "right"
      ctx.fillText(price.toFixed(8), padding.left - 10, y + 4)
    }

    // Vertical grid lines
    const timeStep = Math.max(1, Math.floor(priceData.length / 6))
    for (let i = 0; i < priceData.length; i += timeStep) {
      const x = padding.left + (i / (priceData.length - 1)) * chartWidth
      ctx.beginPath()
      ctx.moveTo(x, padding.top)
      ctx.lineTo(x, padding.top + chartHeight - volumeHeight)
      ctx.stroke()

      // Date labels
      const date = new Date(priceData[i].date)
      let dateLabel = ""

      if (timePeriod === "1H") {
        dateLabel = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      } else if (timePeriod === "1D") {
        dateLabel = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      } else {
        dateLabel = date.toLocaleDateString([], { month: "short", day: "numeric" })
      }

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(dateLabel, x, padding.top + chartHeight - volumeHeight + 20)
    }

    // Draw volume bars if enabled
    if (showVolume) {
      for (let i = 0; i < priceData.length; i++) {
        const x = padding.left + (i / (priceData.length - 1)) * chartWidth
        const barWidth = (chartWidth / priceData.length) * 0.8
        const barHeight = (priceData[i].volume / maxVolume) * volumeHeight

        // Color based on price movement
        const isUp = i > 0 ? priceData[i].price >= priceData[i - 1].price : true
        ctx.fillStyle = isUp ? "rgba(86, 204, 242, 0.5)" : "rgba(255, 99, 132, 0.5)"

        ctx.fillRect(x - barWidth / 2, padding.top + chartHeight - volumeHeight, barWidth, barHeight)
      }

      // Volume label
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.font = "10px Arial"
      ctx.textAlign = "left"
      ctx.fillText("Volume", padding.left, padding.top + chartHeight - volumeHeight - 5)
    }

    // Draw price line
    ctx.strokeStyle = "#56CCF2"
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let i = 0; i < priceData.length; i++) {
      const x = padding.left + (i / (priceData.length - 1)) * chartWidth
      const y =
        padding.top + (chartHeight - volumeHeight) * (1 - (priceData[i].price - minPrice) / (maxPrice - minPrice))

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Add gradient under the line
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight - volumeHeight)
    gradient.addColorStop(0, "rgba(86, 204, 242, 0.3)")
    gradient.addColorStop(1, "rgba(86, 204, 242, 0)")

    ctx.fillStyle = gradient
    ctx.beginPath()

    // Start from the bottom left
    ctx.moveTo(padding.left, padding.top + chartHeight - volumeHeight)

    // Draw the bottom line
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight - volumeHeight)

    // Draw the price line in reverse
    for (let i = priceData.length - 1; i >= 0; i--) {
      const x = padding.left + (i / (priceData.length - 1)) * chartWidth
      const y =
        padding.top + (chartHeight - volumeHeight) * (1 - (priceData[i].price - minPrice) / (maxPrice - minPrice))
      ctx.lineTo(x, y)
    }

    ctx.closePath()
    ctx.fill()

    // Draw indicators if selected
    if (indicators.includes("MA")) {
      // Simple Moving Average (20 periods)
      const period = 20
      const maData = []

      for (let i = 0; i < priceData.length; i++) {
        if (i < period - 1) {
          maData.push(null)
        } else {
          let sum = 0
          for (let j = 0; j < period; j++) {
            sum += priceData[i - j].price
          }
          maData.push(sum / period)
        }
      }

      ctx.strokeStyle = "#ADFF2F"
      ctx.lineWidth = 1.5
      ctx.beginPath()

      let firstPoint = true
      for (let i = 0; i < maData.length; i++) {
        if (maData[i] !== null) {
          const x = padding.left + (i / (priceData.length - 1)) * chartWidth
          const y = padding.top + (chartHeight - volumeHeight) * (1 - (maData[i] - minPrice) / (maxPrice - minPrice))

          if (firstPoint) {
            ctx.moveTo(x, y)
            firstPoint = false
          } else {
            ctx.lineTo(x, y)
          }
        }
      }

      ctx.stroke()
    }

    // Chart title and current price
    ctx.fillStyle = "white"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "left"
    ctx.fillText("ICM/SOL", padding.left, 25)

    ctx.fillStyle = priceChange >= 0 ? "#ADFF2F" : "#FF6384"
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "right"
    ctx.fillText(
      `${currentPrice.toFixed(8)} (${priceChange >= 0 ? "+" : ""}${priceChange.toFixed(2)}%)`,
      padding.left + chartWidth,
      25,
    )
  }, [priceData, showVolume, indicators, isFullscreen])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !chartContainerRef.current) return

      canvasRef.current.width = chartContainerRef.current.clientWidth
      canvasRef.current.height = chartContainerRef.current.clientHeight

      // Redraw chart
      const event = new Event("resize")
      window.dispatchEvent(event)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Manual refresh
  const refreshData = () => {
    setLoading(true)
    // This would trigger the useEffect to fetch new data
    setTimePeriod((prev) => prev)
  }

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? "fixed inset-0 z-50 bg-black p-4" : ""}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          {["1H", "1D", "1W", "1M"].map((period) => (
            <button
              key={period}
              className={`px-3 py-1 text-sm rounded-md mr-2 ${
                timePeriod === period
                  ? "bg-[#2F80ED] text-white"
                  : "bg-[#2F80ED]/20 text-gray-300 hover:bg-[#2F80ED]/30"
              }`}
              onClick={() => setTimePeriod(period)}
              disabled={loading}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="p-1 rounded-md bg-[#2F80ED]/20 text-gray-300 hover:bg-[#2F80ED]/30"
            onClick={refreshData}
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>

          <div className="relative">
            <button
              className="px-3 py-1 text-sm rounded-md bg-[#2F80ED]/20 text-gray-300 hover:bg-[#2F80ED]/30 flex items-center"
              onClick={() => document.getElementById("indicators-dropdown")?.classList.toggle("hidden")}
              disabled={loading}
            >
              Indicators <ChevronDown size={14} className="ml-1" />
            </button>
            <div
              id="indicators-dropdown"
              className="absolute right-0 mt-1 bg-black/90 border border-[#2F80ED]/20 rounded-md p-2 z-10 hidden"
            >
              <div className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id="ma-indicator"
                  checked={indicators.includes("MA")}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setIndicators([...indicators, "MA"])
                    } else {
                      setIndicators(indicators.filter((i) => i !== "MA"))
                    }
                  }}
                  className="mr-2"
                />
                <label htmlFor="ma-indicator" className="text-sm">
                  Moving Average
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="volume-indicator"
                  checked={showVolume}
                  onChange={(e) => setShowVolume(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="volume-indicator" className="text-sm">
                  Volume
                </label>
              </div>
            </div>
          </div>

          <button
            className="p-1 rounded-md bg-[#2F80ED]/20 text-gray-300 hover:bg-[#2F80ED]/30"
            onClick={toggleFullscreen}
            disabled={loading}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>

      <div ref={chartContainerRef} className="flex-1 bg-black/20 rounded-lg overflow-hidden relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <RefreshCw size={24} className="animate-spin text-[#56CCF2]" />
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="text-red-400 text-center p-4">
              <p>{error}</p>
              <button
                className="mt-4 px-4 py-2 bg-[#2F80ED]/30 rounded-md hover:bg-[#2F80ED]/50 transition-colors"
                onClick={refreshData}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : null}
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="text-right mt-2 text-xs text-gray-500">
        ICM/SOL • Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}
