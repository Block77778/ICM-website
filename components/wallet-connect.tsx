"use client"

import { useWallet } from "@/contexts/wallet-context"
import { Wallet, X, Loader2 } from "lucide-react"

export default function WalletConnect() {
  const { isConnected, isConnecting, walletAddress, connect, disconnect } = useWallet()

  if (isConnecting) {
    return (
      <button
        disabled
        className="hidden md:flex items-center px-3 py-1.5 text-xs bg-[#2F80ED]/20 rounded-lg text-[#56CCF2] cursor-not-allowed"
      >
        <Loader2 className="animate-spin mr-1" size={12} />
        <span className="hidden sm:inline">Connecting...</span>
        <span className="sm:hidden">...</span>
      </button>
    )
  }

  if (isConnected && walletAddress) {
    return (
      <div className="flex items-center">
        <div className="hidden md:flex items-center px-3 py-1.5 text-xs bg-[#2F80ED]/20 rounded-lg text-[#56CCF2] mr-2">
          <Wallet className="mr-1" size={12} />
          <span className="hidden lg:inline">{`${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`}</span>
          <span className="lg:hidden">{`${walletAddress.slice(0, 3)}...`}</span>
        </div>
        <button
          onClick={disconnect}
          className="px-2 py-1 text-xs bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors md:flex items-center"
          title="Disconnect wallet"
        >
          <X size={10} className="md:hidden" />
          <span className="hidden md:inline">Disconnect</span>
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      className="px-3 py-1.5 text-xs bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] rounded-lg font-medium text-white hover:opacity-90 transition-all flex items-center"
    >
      <Wallet className="mr-1" size={12} />
      <span className="hidden sm:inline">Connect</span>
      <span className="sm:hidden">Connect</span>
    </button>
  )
}
