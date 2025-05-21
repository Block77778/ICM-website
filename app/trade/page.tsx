"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Info } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import BirdeyeSwapWidget from "@/components/birdeye-swap-widget"
import PriceChart from "@/components/price-chart"
import WalletConnect from "@/components/wallet-connect"

export default function TradePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-28 pb-16">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#4ECDC4] via-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
              Trade IceMelon (ICM)
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
              Buy, sell, and track ICM tokens directly on our platform. Join the green crypto revolution today.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <Link
                href="https://raydium.io/swap/?inputMint=sol&outputMint=6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp"
                target="_blank"
                className="flex items-center px-4 py-2 bg-[#2F80ED]/20 rounded-lg text-[#56CCF2] hover:bg-[#2F80ED]/30 transition-colors"
              >
                Raydium <ExternalLink className="ml-2" size={16} />
              </Link>
              <Link
                href="https://birdeye.so/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?chain=solana"
                target="_blank"
                className="flex items-center px-4 py-2 bg-[#2F80ED]/20 rounded-lg text-[#56CCF2] hover:bg-[#2F80ED]/30 transition-colors"
              >
                Birdeye <ExternalLink className="ml-2" size={16} />
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Token Address:</span>
              <code className="bg-black/30 px-2 py-1 rounded text-xs md:text-sm">
                6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp
              </code>
              <button
                className="text-[#56CCF2] hover:text-[#4ECDC4] transition-colors"
                onClick={() => {
                  navigator.clipboard.writeText("6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp")
                  alert("Token address copied to clipboard!")
                }}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Wallet Connect */}
          <div className="max-w-md mx-auto mb-12">
            <WalletConnect />
          </div>

          {/* Trading Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Price Chart (3/5 width on desktop) */}
            <div className="lg:col-span-3 bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-4 h-[600px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#56CCF2]">ICM Price Chart</h2>
                <div className="flex items-center text-xs text-gray-400">
                  <Info size={14} className="mr-1" />
                  <span>Chart includes price and volume indicators</span>
                </div>
              </div>
              <div className="h-[530px]">
                <PriceChart />
              </div>
            </div>

            {/* Birdeye Swap Widget (2/5 width on desktop) */}
            <div className="lg:col-span-2 h-[600px]">
              <BirdeyeSwapWidget />
            </div>
          </div>
        </section>

        {/* Token Info Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ADFF2F] to-[#4ECDC4] bg-clip-text text-transparent">
              ICM Token Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-gray-300">Token Supply</h3>
                <p className="text-2xl font-bold text-white">100,000,000</p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-gray-300">Blockchain</h3>
                <p className="text-2xl font-bold text-white">Solana</p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-gray-300">Token Type</h3>
                <p className="text-2xl font-bold text-white">SPL</p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-gray-300">Decimals</h3>
                <p className="text-2xl font-bold text-white">9</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 text-gray-300">How to buy ICM tokens:</h3>
              <ol className="space-y-4 text-gray-300">
                <li className="flex">
                  <span className="bg-[#2F80ED]/30 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-[#56CCF2]">
                    1
                  </span>
                  <div>
                    <p>
                      <strong>Connect your Solana wallet</strong> - Use Phantom, Solflare, or any Solana-compatible
                      wallet
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[#2F80ED]/30 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-[#56CCF2]">
                    2
                  </span>
                  <div>
                    <p>
                      <strong>Swap SOL for ICM</strong> - Use our integrated Birdeye swap widget or Raydium directly
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[#2F80ED]/30 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-[#56CCF2]">
                    3
                  </span>
                  <div>
                    <p>
                      <strong>Confirm the transaction</strong> - Approve the transaction in your wallet
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[#2F80ED]/30 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-[#56CCF2]">
                    4
                  </span>
                  <div>
                    <p>
                      <strong>Welcome to the community!</strong> - You're now part of the Green Crypto Revolution
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="backdrop-blur-md border-t border-[#2F80ED]/20 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="relative w-10 h-10 mr-3">
                  <Image src="/images/icm-logo.png" alt="ICM Logo" fill className="object-contain" />
                </div>
                <span className="text-xl font-bold">ICM</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
                <Link
                  href="/documents/icemelon-whitepaper.pdf"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Whitepaper
                </Link>
                <Link href="/trade" className="text-gray-400 hover:text-white transition-colors">
                  Trade
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
              © {new Date().getFullYear()} IceMelon (ICM). All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
