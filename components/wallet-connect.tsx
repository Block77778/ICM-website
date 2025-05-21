"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import { Loader2, LogOut, Wallet, RefreshCw } from "lucide-react"

export function WalletConnect() {
  const { connected, walletAddress, connecting, connectWallet, disconnectWallet, balances, refreshBalances } =
    useWallet()
  const [isClient, setIsClient] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refreshBalances()
    } catch (error) {
      console.error("Error refreshing balances:", error)
    } finally {
      setRefreshing(false)
    }
  }

  if (!isClient) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (connected && walletAddress) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 mr-2">
          <span className="text-sm font-medium">
            {balances?.SOL !== undefined ? balances.SOL.toFixed(4) : "0.0000"} SOL
          </span>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
        <Button variant="outline" size="sm" onClick={disconnectWallet} className="flex items-center gap-2">
          <span className="text-xs md:text-sm">{walletAddress}</span>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button variant="outline" size="sm" onClick={connectWallet} disabled={connecting}>
      {connecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}

export default WalletConnect
