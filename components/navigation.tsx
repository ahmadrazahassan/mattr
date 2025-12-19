"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { useSmoothScroll } from "@/hooks/use-scroll-animation"

const navItems = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Gallery", href: "/gallery" },
  { label: "Create", href: "/create" },
]

function MattrLogo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-10 h-10", className)}>
      <rect width="40" height="40" rx="10" fill={inverted ? "white" : "currentColor"} />
      <path
        d="M10 28V16L15 24L20 16V28"
        stroke={inverted ? "#1a1a1a" : "#FAF8F5"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 28V16L29 24L34 16"
        stroke={inverted ? "#1a1a1a" : "#FAF8F5"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  // Magnetic effect removed
  return ref
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeNav, setActiveNav] = useState<string | null>(null)
  const scrollTo = useSmoothScroll()
  const ctaRef = useMagnetic(0.2)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Standard navigation, no scroll hijacking needed for separate pages
    setIsMobileOpen(false)
  }

  return (
    <>
      <header
        className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500", isScrolled ? "pt-4" : "pt-6")}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <nav
            className={cn(
              "flex items-center justify-between transition-all duration-500 rounded-full px-4 lg:px-6",
              isScrolled
                ? "bg-[#FAF8F5]/90 backdrop-blur-xl shadow-lg shadow-foreground/5 py-3"
                : "bg-transparent py-4",
            )}
          >
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <MattrLogo className="text-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">MATTR</span>
            </Link>

            <div className="hidden lg:flex items-center">
              <div className="flex items-center bg-foreground/[0.03] rounded-full p-1.5 relative">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onMouseEnter={() => setActiveNav(item.label)}
                    onMouseLeave={() => setActiveNav(null)}
                    className={cn(
                      "relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full",
                      activeNav === item.label ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                      pathname === item.href && "text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-0 bg-foreground/[0.05] rounded-full transition-all duration-300",
                        activeNav === item.label || pathname === item.href
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95",
                      )}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/auth"
                className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                Sign in
                <span className="absolute bottom-1.5 left-4 right-4 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
              <div ref={ctaRef} className="transition-transform duration-300 ease-out">
                <Link href="/auth?mode=signup">
                  <button className="relative overflow-hidden bg-foreground text-background px-6 py-2.5 rounded-full text-sm font-semibold group">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors duration-300"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={cn(
                    "absolute left-0 w-6 h-0.5 bg-foreground transition-all duration-300",
                    isMobileOpen ? "top-[11px] rotate-45" : "top-[5px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-[11px] w-6 h-0.5 bg-foreground transition-all duration-300",
                    isMobileOpen ? "opacity-0 scale-x-0" : "opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 w-6 h-0.5 bg-foreground transition-all duration-300",
                    isMobileOpen ? "top-[11px] -rotate-45" : "top-[17px]",
                  )}
                />
              </div>
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-x-0 top-[80px] bottom-0 bg-[#FAF8F5] z-40 transition-all duration-500",
            isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          )}
        >
          <div className="h-full flex flex-col px-6 py-10">
            <div className="flex-1 flex flex-col justify-center space-y-2">
              {navItems.map((item, i) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "text-4xl font-bold text-foreground py-4 transition-all duration-500",
                    isMobileOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                  )}
                  style={{ transitionDelay: isMobileOpen ? `${i * 100}ms` : "0ms" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div
              className={cn(
                "space-y-3 transition-all duration-500",
                isMobileOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: isMobileOpen ? "400ms" : "0ms" }}
            >
              <Link href="/auth">
                <button className="w-full py-4 rounded-full border-2 border-foreground/10 text-foreground font-semibold hover:bg-foreground/5 transition-colors duration-300">
                  Sign in
                </button>
              </Link>
              <Link href="/auth?mode=signup">
                <button className="w-full py-4 rounded-full bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors duration-300 flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
