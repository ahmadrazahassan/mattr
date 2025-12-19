"use client"

import type React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
}

export function Marquee({ children, className, speed = 40, direction = "left", pauseOnHover = true }: MarqueeProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn("flex w-max", pauseOnHover && "hover:[animation-play-state:paused]")}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-8 pr-8">{children}</div>
        <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
