"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { value: 2021, label: "Founded", suffix: "" },
  { value: 150, label: "Team members", suffix: "+" },
  { value: 12, label: "Countries", suffix: "" },
  { value: 50, label: "Raised", prefix: "$", suffix: "M" },
]

const values = [
  {
    number: "01",
    title: "Innovation First",
    description: "We push the boundaries of what's possible with AI, constantly exploring new frontiers.",
  },
  {
    number: "02",
    title: "Creator Centric",
    description: "Every decision we make starts with our creators. Their success is our success.",
  },
  {
    number: "03",
    title: "Open & Transparent",
    description: "We believe in building in public, sharing our learnings, and being honest.",
  },
  {
    number: "04",
    title: "Ethical AI",
    description: "We're committed to developing AI responsibly, with safeguards for societal impact.",
  },
]

const team = [
  { 
    name: "Elena Rodriguez", 
    role: "Co-founder & CEO", 
    expertise: "AI & Machine Learning"
  },
  { 
    name: "Kai Nakamura", 
    role: "Co-founder & CTO", 
    expertise: "Systems Architecture"
  },
  { 
    name: "Zara Okafor", 
    role: "Head of Design", 
    expertise: "Product Design"
  },
]

const milestones = [
  { year: "2021", title: "Founded in San Francisco" },
  { year: "2022", title: "Raised $8M seed round" },
  { year: "2023", title: "Launched to 100K creators" },
  { year: "2024", title: "Expanded globally" },
]

// Animated Counter Component
function AnimatedCounter({ 
  target, 
  prefix = "", 
  suffix = "", 
  duration = 2000 
}: { 
  target: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const startTime = performance.now()
          
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * target))
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              setCount(target)
            }
          }
          
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Split Text Animation Component
function SplitText({ 
  text, 
  className, 
  delay = 0 
}: { 
  text: string
  className?: string
  delay?: number
}) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-fade-up"
          style={{ 
            animationDelay: `${delay + i * 30}ms`, 
            animationFillMode: "forwards" 
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}

// Word Reveal Component
function WordReveal({ 
  text, 
  className,
  delay = 0 
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const words = text.split(" ")
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block opacity-0 animate-fade-up mr-[0.25em]"
          style={{ 
            animationDelay: `${delay + i * 100}ms`, 
            animationFillMode: "forwards" 
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

export default function AboutPage() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null)
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero - Minimal split layout */}
      <section className="min-h-screen flex items-center pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <ScrollReveal>
                <p className="text-sm font-medium text-muted-foreground mb-6 tracking-wide">About MATTR</p>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold tracking-tight leading-[0.95] mb-8">
                  <SplitText text="We make" delay={100} />
                  <br />
                  <span className="text-muted-foreground/30">
                    <SplitText text="creativity" delay={500} />
                  </span>
                  <br />
                  <SplitText text="accessible." delay={1000} />
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                  Our mission is to build tools that amplify human creativity, making professional visuals accessible to
                  everyone.
                </p>
              </ScrollReveal>
            </div>

            {/* Stats - Clean grid */}
            <ScrollReveal delay={300}>
              <div className="grid grid-cols-2 gap-px bg-foreground/10 rounded-2xl overflow-hidden">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="bg-[#FAF8F5] p-8 lg:p-10">
                    <span className="text-4xl lg:text-5xl font-bold tracking-tight block mb-2">
                      <AnimatedCounter 
                        target={stat.value} 
                        prefix={stat.prefix} 
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    </span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission - Full width statement */}
      <section className="py-32 border-t border-foreground/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <blockquote className="text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.3] tracking-tight text-center">
              <WordReveal 
                text="We believe everyone has creative potential. Our job is to" 
                delay={0}
              />{" "}
              <span className="text-muted-foreground/40">
                <WordReveal text="unlock it" delay={800} />
              </span>."
            </blockquote>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-center text-muted-foreground mt-8">Alexandra Chen, CEO & Co-founder</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values - Horizontal scroll list */}
      <section className="py-32 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Our values</p>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  <SplitText text="What we believe." delay={0} />
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {values.map((value, i) => (
              <ScrollReveal key={value.number} delay={i * 75}>
                <div
                  onMouseEnter={() => setHoveredValue(i)}
                  onMouseLeave={() => setHoveredValue(null)}
                  className={cn(
                    "group flex items-start gap-8 py-8 border-t border-foreground/10 transition-all duration-500 cursor-default",
                    hoveredValue !== null && hoveredValue !== i && "opacity-30",
                  )}
                >
                  <span className="text-sm font-mono text-muted-foreground pt-1 w-12 shrink-0 transition-colors duration-300 group-hover:text-accent">
                    {value.number}
                  </span>
                  <div className="flex-1 grid md:grid-cols-[1fr,2fr] gap-4 md:gap-8">
                    <h3 className="text-2xl font-semibold transition-transform duration-300 group-hover:translate-x-1">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground max-w-lg transition-all duration-300 group-hover:text-foreground/80">
                      {value.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Minimal horizontal */}
      <section className="py-32 border-t border-foreground/5 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-sm font-medium text-background/50 mb-3">Our journey</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-20">
              <SplitText text="The story so far." delay={0} />
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((milestone, i) => (
              <ScrollReveal key={milestone.year} delay={i * 100}>
                <div className="relative">
                  <span className="text-6xl lg:text-7xl font-bold text-background/10 block mb-4 transition-all duration-700 hover:text-background/20">
                    {milestone.year}
                  </span>
                  <p className="text-background/70 leading-relaxed">{milestone.title}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team - Modern Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3 tracking-widest uppercase">Leadership</p>
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  <SplitText text="The people" delay={0} />
                  <br />
                  <span className="text-muted-foreground/30">
                    <SplitText text="behind MATTR." delay={400} />
                  </span>
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm lg:text-right">
                A focused team building the future of creative tools.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 150}>
                <div
                  onMouseEnter={() => setHoveredTeam(member.name)}
                  onMouseLeave={() => setHoveredTeam(null)}
                  className={cn(
                    "group relative bg-foreground/[0.02] rounded-3xl overflow-hidden transition-all duration-700",
                    hoveredTeam !== null && hoveredTeam !== member.name && "opacity-40 scale-[0.98]",
                    hoveredTeam === member.name && "bg-foreground/[0.04]"
                  )}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/professional-headshot.png"
                      alt={member.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-500" />
                  </div>

                  {/* Info */}
                  <div className="p-6 lg:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-1 transition-transform duration-300 group-hover:translate-x-1">
                          {member.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/50 pt-1">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="h-px w-full bg-foreground/5 mb-3" />
                    <p className="text-xs text-muted-foreground/70 tracking-wide uppercase">
                      {member.expertise}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Minimal */}
      <section className="py-32 border-t border-foreground/5">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              <SplitText text="Join us." delay={0} />
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
              We're always looking for talented people who share our vision.
            </p>
            <Link href="/careers">
              <MagneticButton
                strength={0.15}
                className="h-14 px-8 bg-foreground text-background rounded-full font-semibold inline-flex items-center gap-3 group"
              >
                View open positions
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
