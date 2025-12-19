import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"

import { CursorFollower } from "@/components/cursor-follower"
import { DM_Sans, Geist_Mono, Source_Serif_4, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-serif",
})

export const metadata: Metadata = {
  title: "Lumina - AI Image Generation Platform",
  description:
    "The most advanced AI image generation platform. Create stunning, photorealistic visuals from simple text descriptions in seconds.",
  keywords: ["AI", "image generation", "artificial intelligence", "creative tools", "design"],
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${geistMono.variable} ${sourceSerif.variable} font-sans antialiased`}>
        <CursorFollower />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
