"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { useScrollAnimation, useParallax } from "@/hooks/use-scroll-animation"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "blur" | "none" | "rotate"
  duration?: number
  distance?: number
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 1200,
  distance = 60,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  const getStyles = () => {
    const base = {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionProperty: "opacity, transform, filter",
    }

    if (!isVisible) {
      switch (direction) {
        case "up":
          return { ...base, opacity: 0, transform: `translateY(${distance}px)` }
        case "down":
          return { ...base, opacity: 0, transform: `translateY(-${distance}px)` }
        case "left":
          return { ...base, opacity: 0, transform: `translateX(${distance}px)` }
        case "right":
          return { ...base, opacity: 0, transform: `translateX(-${distance}px)` }
        case "scale":
          return { ...base, opacity: 0, transform: "scale(0.85)" }
        case "blur":
          return { ...base, opacity: 0, filter: "blur(20px)", transform: `translateY(${distance / 2}px)` }
        case "rotate":
          return { ...base, opacity: 0, transform: `translateY(${distance}px) rotate(5deg)` }
        case "none":
          return { ...base, opacity: 0 }
        default:
          return { ...base, opacity: 0 }
      }
    }

    return { ...base, opacity: 1, transform: "none", filter: "none" }
  }

  return (
    <div ref={ref} className={cn(className)} style={getStyles()}>
      {children}
    </div>
  )
}

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.3, className }: ParallaxProps) {
  const { ref, offset } = useParallax(speed)

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}>{children}</div>
    </div>
  )
}

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  direction?: "up" | "left" | "right" | "scale" | "blur"
  duration?: number
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 80,
  direction = "up",
  duration = 1000,
}: StaggerChildrenProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  const getItemStyles = (index: number) => {
    const base = {
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      transitionDelay: isVisible ? `${index * staggerDelay}ms` : "0ms",
      transitionProperty: "opacity, transform, filter",
    }

    if (!isVisible) {
      switch (direction) {
        case "up":
          return { ...base, opacity: 0, transform: "translateY(50px)" }
        case "left":
          return { ...base, opacity: 0, transform: "translateX(50px)" }
        case "right":
          return { ...base, opacity: 0, transform: "translateX(-50px)" }
        case "scale":
          return { ...base, opacity: 0, transform: "scale(0.9)" }
        case "blur":
          return { ...base, opacity: 0, filter: "blur(10px)", transform: "translateY(30px)" }
        default:
          return { ...base, opacity: 0 }
      }
    }

    return { ...base, opacity: 1, transform: "none", filter: "none" }
  }

  return (
    <div ref={ref} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div key={i} style={getItemStyles(i)}>
              {child}
            </div>
          ))
        : children}
    </div>
  )
}

interface ClipRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
}

export function ClipReveal({ children, className, direction = "up", delay = 0, duration = 1200 }: ClipRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  const getClipPath = () => {
    if (isVisible) return "inset(0 0 0 0)"
    switch (direction) {
      case "up":
        return "inset(100% 0 0 0)"
      case "down":
        return "inset(0 0 100% 0)"
      case "left":
        return "inset(0 100% 0 0)"
      case "right":
        return "inset(0 0 0 100%)"
      default:
        return "inset(100% 0 0 0)"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        clipPath: getClipPath(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionProperty: "clip-path",
      }}
    >
      {children}
    </div>
  )
}

interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  delay?: number
}

export function ImageReveal({ src, alt, className, imageClassName, delay = 0 }: ImageRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        style={{
          transitionDuration: "1400ms",
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionProperty: "transform, clip-path",
          clipPath: isVisible ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transform: isVisible ? "scale(1)" : "scale(1.2)",
        }}
      >
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={cn("w-full h-full object-cover", imageClassName)}
          style={{
            transitionDuration: "1400ms",
            transitionDelay: `${delay}ms`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionProperty: "transform",
            transform: isVisible ? "scale(1)" : "scale(1.1)",
          }}
        />
      </div>
    </div>
  )
}
