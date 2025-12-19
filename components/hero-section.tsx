"use client"

import type React from "react"

import { useRef, useState, useEffect, useCallback } from "react"
import { ArrowRight, Play } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useSmoothScroll } from "@/hooks/use-scroll-animation"

const words = ["Imagination", "Creativity", "Vision", "Dreams", "Ideas"]

const trustedCompanies = [
  {
    name: "Spotify",
    logo: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z",
  },
  {
    name: "Airbnb",
    logo: "M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.177-1.903.267-2.616.44-.72 1.16-1.143 1.983-1.195.897-.063 1.787.29 2.463.97.713.716 1.063 1.727.993 2.79-.073 1.107-.573 2.287-1.483 3.507-.313.42-.647.827-1.003 1.22-.117-.073-.54-.143-.807-.22zm7.815-2.985c-.297 1.603-1.133 3.04-2.393 4.163-1.413 1.26-3.227 1.947-5.107 1.947h-.63c-1.88 0-3.693-.687-5.107-1.947-1.26-1.123-2.097-2.56-2.393-4.163-.297-1.533-.067-3.097.667-4.51.73-1.4 1.903-2.563 3.39-3.363 1.12-.6 2.333-.937 3.443-.937 1.11 0 2.323.337 3.443.937 1.487.8 2.66 1.963 3.39 3.363.733 1.413.963 2.977.667 4.51z",
  },
  {
    name: "Netflix",
    logo: "M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z",
  },
  {
    name: "Stripe",
    logo: "M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z",
  },
  {
    name: "Notion",
    logo: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.934-.56.934-1.166V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.046-.747.326-.747.933zm14.337.745c.093.42 0 .84-1.168.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.513.28-.886.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z",
  },
  {
    name: "Figma",
    logo: "M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zM4 20a4 4 0 0 1 4-4h4v4a4 4 0 1 1-8 0zM12 0v8h4a4 4 0 0 0 0-8h-4zM4 4a4 4 0 0 0 4 4h4V0H8a4 4 0 0 0-4 4zM4 12a4 4 0 0 0 4 4h4V8H8a4 4 0 0 0-4 4z",
  },
]

function TextScramble({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(true)
  const chars = "!<>-_\\/[]{}—=+*^?#________"

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join(""),
      )
      if (iteration >= text.length) {
        clearInterval(interval)
        setIsScrambling(false)
      }
      iteration += 1 / 3
    }, 30)
    return () => clearInterval(interval)
  }, [text])

  return <span className={className}>{displayText}</span>
}

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-fade-up"
          style={{ animationDelay: `${delay + i * 30}ms`, animationFillMode: "forwards" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = 0
          const duration = 2000
          const startTime = performance.now()

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function TrustedSlider() {
  return (
    <div className="w-full overflow-hidden py-8">
      <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-[0.2em] font-medium">
        Trusted by teams at
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div className="flex animate-marquee-slow">
          {/* First set */}
          {[...trustedCompanies, ...trustedCompanies].map((company, i) => (
            <div key={`${company.name}-${i}`} className="flex items-center justify-center mx-8 md:mx-12 group">
              <div className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity duration-300">
                <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7 fill-current text-foreground">
                  <path d={company.logo} />
                </svg>
                <span className="text-lg md:text-xl font-semibold text-foreground whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HeroSection() {
  const scrollTo = useSmoothScroll()
  const containerRef = useRef<HTMLElement>(null)
  const [currentWord, setCurrentWord] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 50,
      y: (e.clientY - rect.top - rect.height / 2) / 50,
    })
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FAF8F5] bg-noise"
    >
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-3xl"
        style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-3xl"
        style={{ transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)` }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        <ScrollReveal delay={0} direction="down">
          <div className="flex justify-center mb-16">
            <div className="inline-flex items-center gap-4 px-5 py-2.5 bg-foreground/[0.03] rounded-full group cursor-pointer hover:bg-foreground/[0.05] transition-all duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-foreground/70">
                <TextScramble text="Introducing MATTR 2.0" />
              </span>
              <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </ScrollReveal>

        <div className="text-center mb-16">
          <div className="overflow-hidden mb-2">
            <h1
              className="text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-tight leading-[1] opacity-0 animate-slide-up-reveal"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              Transform Your
            </h1>
          </div>
          <div className="overflow-hidden mb-2">
            <div className="relative h-[clamp(3rem,11vw,9rem)] flex items-center justify-center">
              {words.map((word, i) => (
                <h1
                  key={word}
                  className={`absolute text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-tight leading-[1] text-accent transition-all duration-700 ${
                    i === currentWord ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm"
                  }`}
                >
                  {word}
                </h1>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <h1
              className="text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-tight leading-[1] opacity-0 animate-slide-up-reveal"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              Into Art
            </h1>
          </div>
        </div>

        <ScrollReveal delay={500} direction="blur">
          <p className="text-center text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            The AI image generation platform trusted by over 150,000 creators. Turn text into stunning visuals in
            seconds.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={550}>
          <TrustedSlider />
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
            <MagneticButton
              strength={0.25}
              className="group relative h-14 px-8 bg-foreground text-background rounded-full font-semibold text-base inline-flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <span>Start Creating Free</span>
              <div className="w-6 h-6 bg-background/20 rounded-full flex items-center justify-center group-hover:bg-background/30 transition-colors">
                <ArrowRight className="w-3 h-3" />
              </div>
            </MagneticButton>
            <MagneticButton
              strength={0.25}
              className="h-14 px-8 rounded-full font-semibold text-base inline-flex items-center justify-center gap-3 text-foreground/70 hover:text-foreground transition-all group border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/[0.02]"
            >
              <div className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center group-hover:bg-foreground/10 transition-all">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
              Watch Demo
            </MagneticButton>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={700}>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-1">
                <AnimatedCounter target={150} suffix="K+" />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Creators</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-foreground/10" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-1">
                <AnimatedCounter target={10} suffix="M+" />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Images Generated</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-foreground/10" />
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-1">
                <AnimatedCounter target={4} suffix=".9" />
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Rating</div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={900}>
        <button
          onClick={() => scrollTo("#create")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-5 h-8 border border-foreground/20 rounded-full flex items-start justify-center p-1.5 group-hover:border-foreground/40 transition-colors">
            <div className="w-1 h-1.5 bg-foreground/40 rounded-full animate-bounce-subtle" />
          </div>
        </button>
      </ScrollReveal>
    </section>
  )
}
