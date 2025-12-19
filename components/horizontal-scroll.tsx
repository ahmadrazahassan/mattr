"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface HorizontalScrollProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function HorizontalScroll({ children, className, speed = 1 }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollX, setScrollX] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementHeight = rect.height

      // Calculate scroll progress when element is in view
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        const progress = (windowHeight - elementTop) / (windowHeight + elementHeight)
        const scrollAmount = progress * (container.scrollWidth - window.innerWidth) * speed
        setScrollX(Math.max(0, scrollAmount))
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div
        className="flex gap-6 transition-transform duration-100 ease-out"
        style={{ transform: `translateX(-${scrollX}px)` }}
      >
        {children}
      </div>
    </div>
  )
}
