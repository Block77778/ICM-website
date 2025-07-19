"use client"

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import WalletConnect from "@/components/wallet-connect"

interface NavbarProps {
  activeSection: string
  onNavigate: {
    about: () => void
    whitepaper: () => void
    trade: () => void
    community: () => void
    contact: () => void
    links: () => void
  }
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { key: "about", label: "About", onClick: onNavigate.about },
    { key: "whitepaper", label: "Whitepaper", onClick: onNavigate.whitepaper },
    { key: "trade", label: "Trade", onClick: onNavigate.trade },
    { key: "links", label: "Official Links", onClick: onNavigate.links },
    { key: "community", label: "Community", onClick: onNavigate.community },
    { key: "contact", label: "Contact", onClick: onNavigate.contact },
  ]

  const handleNavClick = (onClick: () => void) => {
    onClick()
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2F80ED]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-3">
              <Image src="/images/icm-logo.png" alt="ICM Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-white">IceMelon</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.key ? "text-[#56CCF2]" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <WalletConnect />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md rounded-lg mt-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.onClick)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium transition-colors rounded-md ${
                    activeSection === item.key
                      ? "text-[#56CCF2] bg-[#2F80ED]/20"
                      : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
