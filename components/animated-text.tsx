"use client"

import type React from "react"
import { useEffect, useState, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedHeadingProps {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "h1" | "h2" | "h3" | "h4"
}

export function AnimatedHeading({ children, className, delay = 0, as: Tag = "h2" }: AnimatedHeadingProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLHeadingElement>()

  return (
    <Tag
      ref={ref}
      className={cn(className)}
      style={{
        transitionDuration: "1200ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(60px)",
      }}
    >
      {children}
    </Tag>
  )
}

interface SplitTextProps {
  text: string
  className?: string
  charClassName?: string
  staggerDelay?: number
  startDelay?: number
}

export function SplitText({ text, className, charClassName, staggerDelay = 25, startDelay = 0 }: SplitTextProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>()
  const chars = useMemo(() => text.split(""), [text])

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={cn("inline-block", charClassName)}
          style={{
            transitionDuration: "800ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: `${startDelay + i * staggerDelay}ms`,
            transitionProperty: "opacity, transform",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(100%) rotateX(-90deg)",
            transformOrigin: "top",
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>()

  return (
    <span ref={ref} className={cn("inline-block overflow-hidden", className)}>
      <span
        className="inline-block"
        style={{
          transitionDuration: "1200ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${delay}ms`,
          transitionProperty: "transform",
          transform: isVisible ? "translateY(0)" : "translateY(110%)",
        }}
      >
        {children}
      </span>
    </span>
  )
}

interface WordRevealProps {
  text: string
  className?: string
  wordClassName?: string
  staggerDelay?: number
}

export function WordReveal({ text, className, wordClassName, staggerDelay = 60 }: WordRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLParagraphElement>()
  const words = useMemo(() => text.split(" "), [text])

  return (
    <p ref={ref} className={cn(className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <span
            className={cn("inline-block", wordClassName)}
            style={{
              transitionDuration: "1000ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${i * staggerDelay}ms`,
              transitionProperty: "opacity, transform",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(100%) rotateX(-80deg)",
              transformOrigin: "top center",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </p>
  )
}

interface LineRevealProps {
  lines: string[]
  className?: string
  lineClassName?: string
  staggerDelay?: number
}

export function LineReveal({ lines, className, lineClassName, staggerDelay = 150 }: LineRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <div ref={ref} className={cn("space-y-2", className)}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <p
            className={cn(lineClassName)}
            style={{
              transitionDuration: "1000ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${i * staggerDelay}ms`,
              transitionProperty: "opacity, transform",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(100%)",
            }}
          >
            {line}
          </p>
        </div>
      ))}
    </div>
  )
}

interface TypewriterProps {
  texts: string[]
  className?: string
  speed?: number
  pauseDuration?: number
  cursorChar?: string
}

export function Typewriter({ texts, className, speed = 50, pauseDuration = 2500, cursorChar = "|" }: TypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[currentTextIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentText.length) {
            setDisplayedText(currentText.slice(0, displayedText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration)
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    )

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentTextIndex, texts, speed, pauseDuration])

  return (
    <span className={cn(className)}>
      {displayedText}
      <span className="inline-block w-[2px] h-[1.1em] bg-accent ml-0.5 animate-pulse" aria-hidden="true" />
    </span>
  )
}

interface TextScrambleProps {
  text: string
  className?: string
  speed?: number
  trigger?: boolean
}

export function TextScramble({ text, className, speed = 30, trigger = true }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>()
  const hasAnimated = useRef(false)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  useEffect(() => {
    if (isVisible && trigger && !hasAnimated.current) {
      hasAnimated.current = true
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " "
              if (index < iteration) return text[index]
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join(""),
        )

        if (iteration >= text.length) {
          clearInterval(interval)
        }
        iteration += 1 / 3
      }, speed)

      return () => clearInterval(interval)
    }
  }, [isVisible, trigger, text, speed])

  return (
    <span ref={ref} className={cn("font-mono", className)}>
      {displayText}
    </span>
  )
}

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
  decimals?: number
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 2500,
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>()
  const hasStarted = useRef(false)

  useEffect(() => {
    if (isVisible && !hasStarted.current) {
      hasStarted.current = true
      const startTime = Date.now()
      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        setCount(eased * value)

        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }, [isVisible, value, duration])

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  )
}

interface HighlightRevealProps {
  children: string
  className?: string
  highlightClassName?: string
  delay?: number
}

export function HighlightReveal({ children, className, highlightClassName, delay = 0 }: HighlightRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>()

  return (
    <span ref={ref} className={cn("relative inline", className)}>
      <span
        className={cn("absolute inset-0 bg-accent/20 origin-left", highlightClassName)}
        style={{
          transitionDuration: "1000ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${delay}ms`,
          transitionProperty: "transform",
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
        }}
      />
      <span className="relative">{children}</span>
    </span>
  )
}
