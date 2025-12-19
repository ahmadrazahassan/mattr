"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, Send, Copy, Check, Mail, MapPin, ChevronUp } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"

const navigationGroups = [
  {
    title: "Platform",
    links: [
      { label: "AI Generator", href: "/create", badge: "New" },
      { label: "Style Library", href: "/gallery" },
      { label: "API Access", href: "/api-docs" },
      { label: "Integrations", href: "/integrations" },
      { label: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "Blog", href: "/blog" },
      { label: "Changelog", href: "/changelog", badge: "v2.4" },
      { label: "Status", href: "/status", status: "operational" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers", badge: "Hiring" },
      { label: "Press Kit", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

const socialLinks = [
  { name: "X / Twitter", handle: "@mattr_ai", href: "#" },
  { name: "GitHub", handle: "mattr-ai", href: "#" },
  { name: "Discord", handle: "Join Community", href: "#" },
  { name: "LinkedIn", handle: "MATTR AI", href: "#" },
]

const stackCards = [
  {
    title: "10M+",
    subtitle: "Images Generated",
    color: "#f59e0b",
  },
  {
    title: "150K+",
    subtitle: "Active Creators",
    color: "#1a1a1a",
  },
  {
    title: "99.9%",
    subtitle: "Uptime SLA",
    color: "#b45309",
  },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [stackProgress, setStackProgress] = useState(0)
  const footerRef = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const currentYear = new Date().getFullYear()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail("")
      }, 3000)
    }
  }

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@mattr.ai")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const footer = footerRef.current
    if (footer) {
      footer.addEventListener("mousemove", handleMouseMove)
      return () => footer.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (stackRef.current) {
        const rect = stackRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const progress = Math.max(0, Math.min(1, 1 - (rect.top - windowHeight * 0.3) / (windowHeight * 0.5)))
        setStackProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer ref={footerRef} className="relative">
      <div className="relative bg-[#faf8f5]">
        <div className="h-24 md:h-32" />
      </div>

      <div className="relative bg-[#1a1a1a] text-white overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem]">
        {/* Decorative curved SVG overlay at top */}
        <div className="absolute top-0 left-0 right-0 h-20 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-1 w-full h-auto"
            preserveAspectRatio="none"
          >
            <path d="M0 100V0C240 60 480 90 720 90C960 90 1200 60 1440 0V100H0Z" fill="#1a1a1a" />
          </svg>
        </div>

        {/* Subtle mouse-following glow */}
        <div
          className="absolute pointer-events-none opacity-15 transition-opacity duration-500"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(180,83,9,0.2) 0%, transparent 70%)",
          }}
        />

        <div ref={stackRef} className="relative z-10 pt-20 md:pt-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <ScrollReveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-20">
                {/* Left - Heading */}
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-white/40 mb-6">
                    <span className="w-8 h-px bg-white/40" />
                    The numbers
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                    Trusted by
                    <br />
                    <span className="text-white/30">creators worldwide</span>
                  </h2>
                </div>

                {/* Right - Stacking cards */}
                <div className="relative h-[200px] w-full lg:w-[400px]">
                  {stackCards.map((card, index) => {
                    const cardProgress = Math.max(0, Math.min(1, (stackProgress - index * 0.2) / 0.4))
                    const translateY = (1 - cardProgress) * 100
                    const scale = 0.9 + cardProgress * 0.1
                    const rotate = (1 - cardProgress) * (index % 2 === 0 ? 5 : -5)
                    const opacity = 0.3 + cardProgress * 0.7

                    return (
                      <div
                        key={card.title}
                        className="absolute inset-0 rounded-2xl p-6 flex flex-col justify-end transition-all duration-100"
                        style={{
                          backgroundColor: card.color,
                          transform: `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                          opacity,
                          zIndex: stackCards.length - index,
                        }}
                      >
                        <span className="text-5xl md:text-6xl font-black text-white">{card.title}</span>
                        <span className="text-sm text-white/70 mt-1">{card.subtitle}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10">
          {/* Top Section - Large CTA */}
          <div className="border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
              <ScrollReveal>
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-end">
                  {/* Left - Big Bold Text */}
                  <div>
                    <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]">
                      Start
                      <br />
                      <span className="text-white/30">building</span>
                      <br />
                      today<span className="text-[#b45309]">.</span>
                    </h2>
                  </div>

                  {/* Right - Newsletter Form */}
                  <div className="lg:pb-4">
                    <p className="text-lg text-white/60 mb-8 max-w-md leading-relaxed">
                      Join 50,000+ creators getting weekly updates on AI image generation, new features, and creative
                      inspiration.
                    </p>
                    <form onSubmit={handleSubscribe} className="space-y-4">
                      <div className="relative group">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full h-16 px-6 pr-16 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-all duration-300"
                          required
                        />
                        <button
                          type="submit"
                          disabled={isSubscribed}
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white text-[#1a1a1a] flex items-center justify-center hover:bg-white/90 transition-all duration-300 disabled:opacity-50"
                        >
                          {isSubscribed ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-white/40">
                        {isSubscribed ? (
                          <span className="text-green-400">Thanks for subscribing! Check your inbox.</span>
                        ) : (
                          "No spam. Unsubscribe anytime."
                        )}
                      </p>
                    </form>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Middle Section - Navigation Grid */}
          <div className="border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">
                {/* Brand Column */}
                <ScrollReveal className="col-span-2 lg:col-span-2">
                  <Link href="#" className="inline-flex items-center gap-3 group mb-8">
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    >
                      <rect width="40" height="40" rx="10" fill="white" />
                      <path
                        d="M10 28V16L15 24L20 16V28"
                        stroke="#1a1a1a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 28V16L29 24L34 16"
                        stroke="#1a1a1a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <span className="text-xl font-bold tracking-tight block">MATTR</span>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">
                        AI Studio
                      </span>
                    </div>
                  </Link>

                  {/* Contact Card */}
                  <div className="space-y-4">
                    <button
                      onClick={copyEmail}
                      className="group flex items-center gap-3 text-left w-full p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">hello@mattr.ai</p>
                        <p className="text-xs text-white/40">Click to copy</p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </div>
                    </button>

                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white/60" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">San Francisco, CA</p>
                        <p className="text-xs text-white/40">Global Remote Team</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Navigation Columns */}
                {navigationGroups.map((group, groupIndex) => (
                  <ScrollReveal key={group.title} delay={(groupIndex + 1) * 100}>
                    <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-6">
                      {group.title}
                    </h4>
                    <ul className="space-y-3">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-300"
                          >
                            <span className="relative">
                              {link.label}
                              <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                            </span>
                            {link.badge && (
                              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#b45309] text-white rounded-full">
                                {link.badge}
                              </span>
                            )}
                            {link.status === "operational" && (
                              <span className="flex items-center gap-1.5">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4">
                {socialLinks.map((social, index) => (
                  <ScrollReveal key={social.name} delay={index * 75}>
                    <Link
                      href={social.href}
                      className="group flex items-center justify-between py-6 px-4 -mx-4 hover:bg-white/5 transition-all duration-300 border-r border-white/10 last:border-r-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-[#b45309] transition-colors duration-300">
                          {social.name}
                        </p>
                        <p className="text-xs text-white/40 mt-0.5">{social.handle}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-white/40">
                <span>© {currentYear} MATTR AI Inc.</span>
                <span className="hidden md:inline">·</span>
                <Link href="#" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-white transition-colors duration-300">
                  Cookie Settings
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span>All systems operational</span>
                </div>
                <span className="text-white/20">|</span>
                <button
                  onClick={scrollToTop}
                  className="group flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors duration-300"
                >
                  <span>Back to top</span>
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <ChevronUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Background Text */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
          <div className="flex justify-center">
            <span className="text-[20vw] font-black text-white/[0.02] leading-none tracking-tighter translate-y-[30%]">
              MATTR
            </span>
          </div>
        </div>

        <div className="absolute top-40 right-20 w-64 h-64 pointer-events-none opacity-5">
          <div className="absolute inset-0 rounded-full border-2 border-white animate-pulse-dot" />
          <div className="absolute inset-8 rounded-full border border-white animate-pulse-dot delay-200" />
          <div className="absolute inset-16 rounded-full border border-white animate-pulse-dot delay-400" />
        </div>
      </div>
    </footer>
  )
}
