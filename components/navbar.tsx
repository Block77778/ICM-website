"use client"

import { useState } from "react"
import { Menu, X, Wallet } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

interface NavbarProps {
  activeSection: string
  onNavigate: {
    about: () => void
    whitepaper: () => void
    trade: () => void
    community: () => void
    contact: () => void
  }
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { connected, walletAddress, connecting, connectWallet } = useWallet()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (section: string) => {
    setIsMenuOpen(false)

    if (section === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (section === "about") {
      onNavigate.about()
    } else if (section === "whitepaper") {
      onNavigate.whitepaper()
    } else if (section === "trade") {
      onNavigate.trade()
    } else if (section === "community") {
      onNavigate.community()
    } else if (section === "contact") {
      onNavigate.contact()
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-[#2F80ED]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <button onClick={() => handleNavClick("home")} className="flex items-center">
              {/* ICM Logo */}
              <div className="mr-3">
                <img
                  src="/images/icm-logo.png"
                  alt="ICM Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#4ECDC4] to-[#56CCF2] bg-clip-text text-transparent">
                IceMelon
              </span>
            </button>
          </div>

          {/* Rest of the navbar remains the same */}
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavButton label="Home" active={activeSection === "home"} onClick={() => handleNavClick("home")} />
            <NavButton label="About" active={activeSection === "about"} onClick={() => handleNavClick("about")} />
            <NavButton
              label="White Paper"
              active={activeSection === "whitepaper"}
              onClick={() => handleNavClick("whitepaper")}
            />
            <NavButton label="Trade ICM" active={activeSection === "trade"} onClick={() => handleNavClick("trade")} />
            <NavButton
              label="Community"
              active={activeSection === "community"}
              onClick={() => handleNavClick("community")}
            />
            <NavButton label="Contact" active={activeSection === "contact"} onClick={() => handleNavClick("contact")} />
          </div>

          <div className="hidden md:flex">
            {connected ? (
              <button className="px-6 py-2 bg-[#2F80ED]/20 rounded-lg font-medium hover:bg-[#2F80ED]/30 transition-all flex items-center">
                <Wallet className="mr-2" size={16} />
                {walletAddress}
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] rounded-lg font-medium hover:opacity-90 transition-all"
                onClick={connectWallet}
                disabled={connecting}
              >
                {connecting ? "Connecting..." : "Connect Wallet"}
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md">
          <div className="px-4 py-6 space-y-4">
            <NavButton label="Home" active={activeSection === "home"} onClick={() => handleNavClick("home")} />
            <NavButton label="About" active={activeSection === "about"} onClick={() => handleNavClick("about")} />
            <NavButton
              label="White Paper"
              active={activeSection === "whitepaper"}
              onClick={() => handleNavClick("whitepaper")}
            />
            <NavButton label="Trade ICM" active={activeSection === "trade"} onClick={() => handleNavClick("trade")} />
            <NavButton
              label="Community"
              active={activeSection === "community"}
              onClick={() => handleNavClick("community")}
            />
            <NavButton label="Contact" active={activeSection === "contact"} onClick={() => handleNavClick("contact")} />
            <div className="pt-4">
              {connected ? (
                <button className="w-full px-6 py-3 bg-[#2F80ED]/20 rounded-lg font-medium hover:bg-[#2F80ED]/30 transition-all flex items-center justify-center">
                  <Wallet className="mr-2" size={16} />
                  {walletAddress}
                </button>
              ) : (
                <button
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] rounded-lg font-medium hover:opacity-90 transition-all"
                  onClick={connectWallet}
                  disabled={connecting}
                >
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavButton({ label, active = false, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`block md:inline-block py-2 hover:text-[#56CCF2] transition-colors ${
        active ? "text-[#56CCF2]" : "text-gray-300"
      }`}
    >
      {label}
    </button>
  )
}
