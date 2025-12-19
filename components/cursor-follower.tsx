"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CursorFollowerProps {
  className?: string
}

export function CursorFollower({ className }: CursorFollowerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Check for hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isHoverable = target.closest("a, button, [data-cursor-hover]")
      setIsHovering(!!isHoverable)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousemove", handleElementHover, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousemove", handleElementHover)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  return (
    <div
      className={cn("fixed pointer-events-none z-[9999] mix-blend-difference", "hidden lg:block", className)}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease, width 0.3s ease, height 0.3s ease",
      }}
    >
      <div
        className="bg-white rounded-full"
        style={{
          width: isHovering ? 60 : 12,
          height: isHovering ? 60 : 12,
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  )
}
