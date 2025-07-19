"use client"

import { useState } from "react"
import {
  Copy,
  Check,
  ExternalLink,
  Globe,
  MessageCircle,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Music,
} from "lucide-react"

export default function OfficialLinks() {
  const [copiedAddress, setCopiedAddress] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const walletAddress = "6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp"

  return (
    <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-[#2F80ED]/20">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        <span className="bg-gradient-to-r from-[#4ECDC4] via-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
          🌐 Official Links
        </span>
      </h2>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Official Links Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-[#56CCF2] flex items-center">
            <Globe className="mr-3" size={24} />
            Official Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://icm-cryptocurrency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Globe className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">🌍 Website</div>
                <div className="text-sm text-gray-400">icm-cryptocurrency.com</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://medium.com/@yonismalon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <MessageCircle className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">✍️ Medium Blog</div>
                <div className="text-sm text-gray-400">@yonismalon</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://x.com/icmcrypto__"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Twitter className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">🐦 Twitter (X)</div>
                <div className="text-sm text-gray-400">@icmcrypto__</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://t.me/IcemelonOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <MessageCircle className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">💬 Telegram Group</div>
                <div className="text-sm text-gray-400">IcemelonOfficial</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://www.geckoterminal.com/solana/pools/6ob9P9peWK3gC1Vm26Amo5364SyvHre2PLtMt2m1XWds"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Globe className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">📊 GeckoTerminal</div>
                <div className="text-sm text-gray-400">ICM/SOL Trading Pool</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://x.com/i/communities/1943910897509925303"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Twitter className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">🏘️ X Community</div>
                <div className="text-sm text-gray-400">Join our X Community</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-[#56CCF2] flex items-center">
            <MessageCircle className="mr-3" size={24} />📱 Social Media Links
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://instagram.com/icemelon2025"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Instagram className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">📸 Instagram</div>
                <div className="text-sm text-gray-400">@icemelon2025</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://www.threads.net/@icemelon2025"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <MessageCircle className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">🧵 Threads</div>
                <div className="text-sm text-gray-400">@icemelon2025</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://facebook.com/share/18puXHchzU"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Facebook className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">📘 Facebook</div>
                <div className="text-sm text-gray-400">Official Page</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://www.tiktok.com/@icemelon.icm.cryp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Music className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">🎵 TikTok</div>
                <div className="text-sm text-gray-400">@icemelon.icm.cryp</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://youtube.com/@Icemelon2025"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Youtube className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">📺 YouTube</div>
                <div className="text-sm text-gray-400">@Icemelon2025</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>

            <a
              href="https://discord.gg/M7SPwmfx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <MessageCircle className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">💬 Discord</div>
                <div className="text-sm text-gray-400">Join our Discord</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>
          </div>
        </div>

        {/* Wallet & Token Details Section */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-[#56CCF2] flex items-center">
            <Globe className="mr-3" size={24} />📦 Wallet & Token Details
          </h3>
          <div className="space-y-4">
            <div className="bg-black/40 p-6 rounded-lg">
              <h4 className="font-bold text-white mb-3">Official ICM Wallet Address (Solana):</h4>
              <div className="flex items-center gap-3 p-3 bg-black/60 rounded-lg">
                <code className="flex-1 text-sm text-[#ADFF2F] break-all font-mono">{walletAddress}</code>
                <button
                  onClick={() => copyToClipboard(walletAddress)}
                  className="px-3 py-2 bg-[#2F80ED]/20 rounded-lg hover:bg-[#2F80ED]/30 transition-colors flex items-center"
                  title="Copy wallet address"
                >
                  {copiedAddress ? (
                    <Check className="text-green-400" size={16} />
                  ) : (
                    <Copy className="text-[#56CCF2]" size={16} />
                  )}
                </button>
              </div>
            </div>

            <a
              href="https://explorer.solana.com/address/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?cluster=mainnet-beta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-black/40 rounded-lg hover:bg-black/60 transition-colors group"
            >
              <Globe className="mr-3 text-[#ADFF2F]" size={20} />
              <div className="flex-1">
                <div className="font-medium text-white">🔍 Solana Explorer Link</div>
                <div className="text-sm text-gray-400">View token details on Solana Explorer</div>
              </div>
              <ExternalLink className="ml-2 text-gray-400 group-hover:text-[#56CCF2]" size={16} />
            </a>
          </div>
        </div>

        {/* Quick Access Note */}
        <div className="bg-gradient-to-r from-[#2F80ED]/10 to-[#56CCF2]/10 p-6 rounded-xl border border-[#2F80ED]/20">
          <h4 className="font-bold text-[#56CCF2] mb-2">📌 Quick Access Note:</h4>
          <p className="text-gray-300 text-sm">
            All external links open in a new tab for your convenience. The wallet address includes a copy button for
            easy access. Bookmark this page to quickly access all official IceMelon (ICM) resources and stay connected
            with our community!
          </p>
        </div>
      </div>
    </div>
  )
}
