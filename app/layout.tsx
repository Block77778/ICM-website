import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WalletProvider } from "@/contexts/wallet-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IceMelon (ICM) - Green Crypto Revolution",
  description:
    "A community-powered ecosystem funding solar fields, wind farms, and sustainable technological development. Join the green crypto revolution with IceMelon (ICM).",
  keywords: "IceMelon, ICM, cryptocurrency, green crypto, renewable energy, Solana, blockchain, sustainable finance",
  authors: [{ name: "IceMelon Team" }],
  openGraph: {
    title: "IceMelon (ICM) - Green Crypto Revolution",
    description:
      "A community-powered ecosystem funding renewable energy projects and sustainable technology development.",
    type: "website",
    url: "https://icm-cryptocurrency.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "IceMelon (ICM) - Green Crypto Revolution",
    description: "Join the green crypto revolution with IceMelon (ICM)",
    creator: "@icmcrypto__",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
