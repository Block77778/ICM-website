"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Diamond, ChevronRight, ExternalLink, FileText } from "lucide-react"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import StatsCounter from "@/components/stats-counter"
import FeatureCard from "@/components/feature-card"
import AdvancedTradingWidget from "@/components/advanced-trading-widget"
import ContactSection from "@/components/contact-section"

export default function Home() {
  // References to sections for navigation
  const aboutRef = useRef<HTMLElement>(null)
  const whitepaperRef = useRef<HTMLElement>(null)
  const tradeRef = useRef<HTMLElement>(null)
  const communityRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // State to track active section
  const [activeSection, setActiveSection] = useState("home")

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset for navbar

      // Check which section is in view
      if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection("contact")
      } else if (communityRef.current && scrollPosition >= communityRef.current.offsetTop) {
        setActiveSection("community")
      } else if (whitepaperRef.current && scrollPosition >= whitepaperRef.current.offsetTop) {
        setActiveSection("whitepaper")
      } else if (aboutRef.current && scrollPosition >= aboutRef.current.offsetTop) {
        setActiveSection("about")
      } else if (tradeRef.current && scrollPosition >= tradeRef.current.offsetTop) {
        setActiveSection("trade")
      } else {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const logoPath = "/images/icm-logo.png" // Replace with actual logo path
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar
          activeSection={activeSection}
          onNavigate={{
            about: () => scrollToSection(aboutRef),
            whitepaper: () => scrollToSection(whitepaperRef),
            trade: () => scrollToSection(tradeRef),
            community: () => scrollToSection(communityRef),
            contact: () => scrollToSection(contactRef),
          }}
        />

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16 flex flex-col items-center justify-center text-center">
          {/* Fixed logo implementation */}
          <div className="mb-8">
            <img
              src="/images/icm-logo.png"
              alt="ICM Logo"
              width={224}
              height={224}
              className="w-40 h-40 md:w-56 md:h-56 object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4ECDC4] via-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
            Welcome to IceMelon (ICM)
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-6 text-gray-300">
            The <span className="text-[#ADFF2F]">Green Crypto Revolution</span>
          </p>

          <p className="text-lg max-w-3xl mx-auto mb-10 text-gray-300">
            Sustainable Energy. Decentralized Finance. Real-World Impact.
            <br />
            IceMelon (ICM) is a next-generation cryptocurrency built to support a sustainable future.
            <br />
            We are not just another coin. We are a movement.
            <br />
            With a fixed supply of 100,000,000 ICM tokens, our mission is clear:
            <br />
            To channel profits and growth into real-world green energy solutions – including solar farms, wind turbines,
            and cutting-edge innovations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] rounded-lg font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center"
              onClick={() => scrollToSection(whitepaperRef)}
            >
              Read White Paper <ChevronRight className="ml-2" size={20} />
            </button>
            <button
              className="px-8 py-4 bg-transparent border-2 border-[#56CCF2] rounded-lg font-bold text-lg hover:bg-[#56CCF2]/10 transition-all flex items-center justify-center"
              onClick={() => scrollToSection(tradeRef)}
            >
              Trade ICM <ChevronRight className="ml-2" size={20} />
            </button>
          </div>
        </section>

        {/* Trading Section - Moved up as requested */}
        <section ref={tradeRef} id="trade" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-[#4ECDC4] via-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
              Trade IceMelon (ICM)
            </span>
          </h2>

          {/* Token address removed as requested */}

          {/* Trading Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Price Chart (3/5 width on desktop) */}
            <div className="lg:col-span-3 bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-4 h-[600px] flex flex-col">
              <h3 className="text-xl font-bold mb-4 text-[#56CCF2]">ICM Price Chart</h3>

              <div className="flex-1 flex flex-col items-center justify-center bg-black/20 rounded-lg p-6 text-center">
                <p className="text-lg mb-6">View real-time price data and charts on these platforms:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
                  <a
                    href="https://www.dextools.io/app/en/solana/pair-explorer/6ob9P9peWK3gC1Vm26Amo5364SyvHre2PLtMt2m1XWds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#2F80ED]/20 rounded-lg text-[#56CCF2] hover:bg-[#2F80ED]/30 transition-colors flex items-center justify-center"
                  >
                    DexTools <ExternalLink className="ml-2" size={18} />
                  </a>

                  <a
                    href="https://raydium.io/swap/?inputMint=sol&outputMint=6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#2F80ED]/20 rounded-lg text-[#56CCF2] hover:bg-[#2F80ED]/30 transition-colors flex items-center justify-center"
                  >
                    Raydium <ExternalLink className="ml-2" size={18} />
                  </a>

                  <a
                    href="https://birdeye.so/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?chain=solana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#2F80ED]/20 rounded-lg text-[#56CCF2] hover:bg-[#2F80ED]/30 transition-colors flex items-center justify-center"
                  >
                    Birdeye <ExternalLink className="ml-2" size={18} />
                  </a>

                  <a
                    href="https://solscan.io/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#2F80ED]/20 rounded-lg text-[#56CCF2] hover:bg-[#2F80ED]/30 transition-colors flex items-center justify-center"
                  >
                    Solscan <ExternalLink className="ml-2" size={18} />
                  </a>
                </div>

                <div className="mt-8 p-4 bg-black/30 rounded-lg max-w-md">
                  <h4 className="font-medium mb-2 text-[#ADFF2F]">Token Information</h4>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">Current Price:</span>
                    <a
                      href="https://www.dextools.io/app/en/solana/pair-explorer/6ob9P9peWK3gC1Vm26Amo5364SyvHre2PLtMt2m1XWds"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#56CCF2] hover:underline"
                    >
                      View on DexTools
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">24h Volume:</span>
                    <a
                      href="https://birdeye.so/token/6C9vpQRnestpLjc4dk6d7sFJJFiUsEhDYJVn1houiJyp?chain=solana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#56CCF2] hover:underline"
                    >
                      View on Birdeye
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Widget (2/5 width on desktop) */}
            <div className="lg:col-span-2 bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-4 h-[600px]">
              <h3 className="text-xl font-bold mb-4 text-[#56CCF2]">Swap Tokens</h3>
              <AdvancedTradingWidget />
            </div>
          </div>

          {/* Token Info */}
          <div className="mt-12 bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#ADFF2F] to-[#4ECDC4] bg-clip-text text-transparent">
              ICM Token Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black/40 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2 text-gray-300">Token Supply</h4>
                <p className="text-2xl font-bold text-white">100,000,000</p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2 text-gray-300">Blockchain</h4>
                <p className="text-2xl font-bold text-white">Solana</p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2 text-gray-300">Token Type</h4>
                <p className="text-2xl font-bold text-white">SPL</p>
              </div>

              <div className="bg-black/40 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2 text-gray-300">Decimals</h4>
                <p className="text-2xl font-bold text-white">9</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="backdrop-blur-md py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatsCounter label="Max Supply" value="100,000,000" icon="chart" />
              <StatsCounter label="Community Members" value="24,891" icon="users" />
              <StatsCounter label="Green Projects" value="12" icon="activity" />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="container mx-auto px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-[#ADFF2F] to-[#4ECDC4] bg-clip-text text-transparent">
              A Crypto Born for Climate Action
            </span>
          </h2>

          <p className="text-xl text-center max-w-3xl mx-auto mb-16 text-gray-300">
            At IceMelon, we believe that technology and sustainability must go hand in hand. That's why we created a
            cryptocurrency that directly funds renewable energy initiatives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <FeatureCard
              title="Fight Climate Change"
              description="Investing in solar and wind energy projects around the world."
              icon="leaf"
            />
            <FeatureCard
              title="Green Innovation"
              description="Encouraging sustainable technology development worldwide."
              icon="zap"
            />
            <FeatureCard
              title="Global Community"
              description="Building a community that believes in clean, decentralized energy."
              icon="users"
            />
            <FeatureCard
              title="Deflationary Token"
              description="Limited supply, community-powered token with long-term utility."
              icon="shield"
            />
          </div>

          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-[#2F80ED]/20">
            <h3 className="text-2xl font-bold mb-6 text-center text-[#56CCF2]">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-black/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[#ADFF2F] font-bold text-xl">
                  1
                </div>
                <p className="text-gray-300">Every transaction supports liquidity and growth</p>
              </div>
              <div className="text-center">
                <div className="bg-black/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[#ADFF2F] font-bold text-xl">
                  2
                </div>
                <p className="text-gray-300">
                  As the token gains value, ICM funds are allocated to green energy projects
                </p>
              </div>
              <div className="text-center">
                <div className="bg-black/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[#ADFF2F] font-bold text-xl">
                  3
                </div>
                <p className="text-gray-300">
                  We publicly track these investments and allow the community to vote on the next projects
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Whitepaper Section */}
        <section ref={whitepaperRef} id="whitepaper" className="container mx-auto px-4 py-24">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-[#2F80ED]/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              <span className="bg-gradient-to-r from-[#4ECDC4] via-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
                IceMelon White Paper
              </span>
            </h2>

            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-center mb-8 text-gray-300">
                Download the full IceMelon White Paper to learn about our mission, tokenomics, and roadmap.
              </p>

              <div className="bg-black/40 p-6 rounded-xl mb-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2">
                    <img
                      src="/images/whitepaper-preview.jpeg"
                      alt="IceMelon Whitepaper Preview"
                      className="w-full h-auto rounded-lg shadow-lg border border-[#2F80ED]/30"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4 text-[#56CCF2]">White Paper Preview</h3>
                    <p className="mb-4 text-gray-300">The IceMelon White Paper covers:</p>
                    <ul className="space-y-2 text-gray-300 list-disc pl-5 mb-6">
                      <li>Introduction to IceMelon's green crypto initiative</li>
                      <li>Token overview and specifications (100,000 ICM supply)</li>
                      <li>Market and liquidity information</li>
                      <li>Vision and mission for renewable energy funding</li>
                      <li>Utility and use cases for community-powered ecosystem</li>
                      <li>Community governance and decision making</li>
                    </ul>

                    <a
                      href="/documents/icemelon-whitepaper.pdf"
                      download
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center"
                    >
                      <FileText className="mr-2" size={20} />
                      Download White Paper (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section ref={communityRef} id="community" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2F80ED]/10 to-[#56CCF2]/10 backdrop-blur-sm z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Diamond className="w-16 h-16 mx-auto mb-6 text-[#56CCF2]" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
              <p className="text-xl mb-10 text-gray-300">
                Be part of the green crypto revolution and help build a sustainable blockchain future.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                <a
                  href="https://www.facebook.com/share/18puXHchzU/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-[#ADFF2F] to-[#4ECDC4] rounded-lg font-bold text-black hover:opacity-90 transition-all"
                >
                  Facebook
                </a>
                <a
                  href="https://www.geckoterminal.com/solana/pools/6ob9P9peWK3gC1Vm26Amo5364SyvHre2PLtMt2m1XWds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-[#ADFF2F] to-[#4ECDC4] rounded-lg font-bold text-black hover:opacity-90 transition-all"
                >
                  Gecko Terminal
                </a>
                <a
                  href="https://t.me/+r5F9-F-BvmFjNjY0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-transparent border-2 border-[#56CCF2] rounded-lg font-bold hover:bg-[#56CCF2]/10 transition-all"
                >
                  Join Telegram Group
                </a>
                <a
                  href="https://x.com/icmcrypto__?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-transparent border-2 border-[#56CCF2] rounded-lg font-bold hover:bg-[#56CCF2]/10 transition-all"
                >
                  Follow X
                </a>
              </div>

              <div className="mt-16 bg-black/30 backdrop-blur-md rounded-xl border border-[#2F80ED]/20 p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6 text-[#56CCF2]">Community Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex">
                    <div className="bg-[#2F80ED]/30 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-[#ADFF2F]">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Participate in Votes</h4>
                      <p className="text-gray-300">Help decide which green energy projects receive funding</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-[#2F80ED]/30 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-[#ADFF2F]">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Early Access</h4>
                      <p className="text-gray-300">Get news and updates before they're publicly released</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-[#2F80ED]/30 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-[#ADFF2F]">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Earn Rewards</h4>
                      <p className="text-gray-300">Receive rewards through community engagement and activities</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-[#2F80ED]/30 w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-[#ADFF2F]">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Build the Future</h4>
                      <p className="text-gray-300">Help shape the green crypto revolution, together</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="container mx-auto px-4 py-24">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-[#4ECDC4] via-[#56CCF2] to-[#2F80ED] bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <ContactSection />
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
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection(aboutRef)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection(whitepaperRef)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Whitepaper
                </button>
                <button
                  onClick={() => scrollToSection(tradeRef)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Trade
                </button>
                <button
                  onClick={() => scrollToSection(communityRef)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community
                </button>
                <button
                  onClick={() => scrollToSection(contactRef)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
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
