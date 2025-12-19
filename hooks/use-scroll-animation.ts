"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface ScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: ScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -80px 0px", triggerOnce = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) observer.unobserve(element)
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.scrollY
      const elementTop = rect.top + scrolled
      const relativeScroll = scrolled - elementTop + window.innerHeight
      setOffset(relativeScroll * speed)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return { ref, offset }
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setProgress(scrollHeight > 0 ? scrolled / scrollHeight : 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return progress
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return position
}

export function useMagneticEffect(strength = 0.4) {
  const ref = useRef<HTMLElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength
      setTransform({ x: deltaX, y: deltaY })
    },
    [strength],
  )

  const handleMouseLeave = useCallback(() => {
    setTransform({ x: 0, y: 0 })
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return { ref, transform }
}

export function useCountUp(end: number, duration = 2500) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const startCounting = useCallback(() => {
    if (hasStarted) return
    setHasStarted(true)

    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out quart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * end))

      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, hasStarted])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startCounting()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [startCounting])

  return { count, ref }
}

export function useSmoothScroll() {
  const scrollTo = useCallback((target: string) => {
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  return scrollTo
}

export function useTextScramble(text: string, speed = 30) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

  const scramble = useCallback(() => {
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
        setIsComplete(true)
      }
      iteration += 1 / 3
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return { displayText, isComplete, scramble }
}

export function useStaggeredReveal(itemCount: number, staggerDelay = 100) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false))

  useEffect(() => {
    if (isVisible) {
      const timeouts: NodeJS.Timeout[] = []
      for (let i = 0; i < itemCount; i++) {
        timeouts.push(
          setTimeout(() => {
            setVisibleItems((prev) => {
              const next = [...prev]
              next[i] = true
              return next
            })
          }, i * staggerDelay),
        )
      }
      return () => timeouts.forEach(clearTimeout)
    }
  }, [isVisible, itemCount, staggerDelay])

  return { ref, isVisible, visibleItems }
}

export function useScrollRotation(maxRotation = 360) {
  const [rotation, setRotation] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementCenter = rect.top + rect.height / 2
      const progress = 1 - elementCenter / windowHeight
      setRotation(progress * maxRotation)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [maxRotation])

  return { ref, rotation }
}
