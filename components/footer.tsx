import { Facebook, Instagram, Twitter, ExternalLink, TextIcon as Telegram } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-[#2F80ED]/20 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image src="/images/icm-logo.png" alt="IceMelon Logo" width={40} height={40} className="mr-3" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-[#4ECDC4] via-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
                IceMelon (ICM)
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              A green cryptocurrency initiative designed to support and invest in renewable energy projects around the
              world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#56CCF2] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/trade" className="text-gray-400 hover:text-[#56CCF2] transition-colors">
                  Trade
                </Link>
              </li>
              <li>
                <a
                  href="/documents/icemelon-whitepaper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#56CCF2] transition-colors"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="https://birdeye.so/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?chain=solana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#56CCF2] transition-colors flex items-center"
                >
                  Token Info <ExternalLink className="ml-1" size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-medium mb-4">Connect With Us</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/people/Icm-Cryptocurrency/61575979997294/?mibextid=wwXIfr&rdid=gdKjd1WNx7dOmmmZ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18eDszNtSJ%2F%3Fmibextid%3DwwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2F80ED]/20 p-2 rounded-full hover:bg-[#2F80ED]/40 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/icemelon2025/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2F80ED]/20 p-2 rounded-full hover:bg-[#2F80ED]/40 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://x.com/icmcrypto_?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2F80ED]/20 p-2 rounded-full hover:bg-[#2F80ED]/40 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://t.me/+r5F9-F-BvmFjNjY0"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2F80ED]/20 p-2 rounded-full hover:bg-[#2F80ED]/40 transition-colors"
                aria-label="Telegram"
              >
                <Telegram size={20} />
              </a>
              <a
                href="https://www.tiktok.com/@icemelon.icm.cryp"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2F80ED]/20 p-2 rounded-full hover:bg-[#2F80ED]/40 transition-colors"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                  <path d="M16 8v8a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5v0" />
                  <path d="M22 2 L18 6" />
                  <path d="M16 6V2h-4" />
                  <path d="M16 12.5V6h-4" />
                </svg>
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              © {new Date().getFullYear()} IceMelon (ICM). All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
