"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Check,
  Cpu,
  Layers,
  Gauge,
  Shield,
  Globe,
  Palette,
  Wand2,
  Camera,
  Brush,
  Box,
  Users,
  Lock,
  Code,
  Cloud,
  Play,
  ArrowUpRight,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal, ClipReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { cn } from "@/lib/utils"

const heroFeatures = [
  { label: "Neural Engine v3", value: "100B params" },
  { label: "Generation Time", value: "2.8 seconds" },
  { label: "Max Resolution", value: "8K Ultra HD" },
  { label: "Uptime SLA", value: "99.99%" },
]

const capabilities = [
  {
    id: "neural",
    icon: Cpu,
    title: "Neural Engine v3",
    subtitle: "100 Billion Parameters",
    description:
      "Our proprietary model trained on the world's largest curated dataset delivers unprecedented quality, understanding context and nuance like never before.",
    stats: [
      { label: "Parameters", value: "100B+" },
      { label: "Training Data", value: "2PB" },
      { label: "Languages", value: "95" },
    ],
    image: "/neural-network-visualization-dark-modern.jpg",
  },
  {
    id: "speed",
    icon: Gauge,
    title: "Lightning Fast",
    subtitle: "2.8 Second Generation",
    description:
      "Distributed processing across 200+ edge nodes ensures your images are ready in seconds, not minutes. Perfect for real-time workflows.",
    stats: [
      { label: "Avg. Speed", value: "2.8s" },
      { label: "Edge Nodes", value: "200+" },
      { label: "Regions", value: "45" },
    ],
    image: "/speed-performance-dashboard-dark-minimal.jpg",
  },
  {
    id: "resolution",
    icon: Layers,
    title: "8K Resolution",
    subtitle: "7680 x 4320 Pixels",
    description:
      "Create ultra-high-definition images perfect for print, billboards, and large-scale displays. Every detail rendered with precision.",
    stats: [
      { label: "Max Width", value: "7680px" },
      { label: "Max Height", value: "4320px" },
      { label: "DPI Support", value: "300+" },
    ],
    image: "/high-resolution-image-quality-comparison.jpg",
  },
]

const toolsGrid = [
  { icon: Wand2, name: "Smart Prompts", description: "AI enhances your prompts automatically" },
  { icon: Camera, name: "Image-to-Image", description: "Transform any image with AI" },
  { icon: Brush, name: "Inpainting", description: "Edit specific areas seamlessly" },
  { icon: Box, name: "3D Aware", description: "Accurate depth and perspective" },
  { icon: Palette, name: "Style Transfer", description: "Apply any artistic style" },
  { icon: Users, name: "Team Spaces", description: "Collaborate in real-time" },
  { icon: Lock, name: "Enterprise SSO", description: "SAML & SCIM support" },
  { icon: Code, name: "Full API", description: "RESTful & GraphQL endpoints" },
  { icon: Cloud, name: "Cloud Storage", description: "Unlimited secure storage" },
  { icon: Globe, name: "Global CDN", description: "45 edge locations" },
  { icon: Shield, name: "SOC 2 Type II", description: "Enterprise-grade security" },
  { icon: Gauge, name: "99.99% SLA", description: "Guaranteed uptime" },
]

const comparisonData = [
  { feature: "Generation Speed", mattr: "2.8s", others: "15s+", winner: "mattr" },
  { feature: "Max Resolution", mattr: "8K", others: "4K", winner: "mattr" },
  { feature: "Model Parameters", mattr: "100B", others: "~20B", winner: "mattr" },
  { feature: "Art Styles", mattr: "50+", others: "10-15", winner: "mattr" },
  { feature: "API Rate Limit", mattr: "Unlimited", others: "Limited", winner: "mattr" },
  { feature: "Uptime SLA", mattr: "99.99%", others: "99.5%", winner: "mattr" },
  { feature: "Enterprise SSO", mattr: "Included", others: "Add-on", winner: "mattr" },
  { feature: "Custom Training", mattr: "Available", others: "No", winner: "mattr" },
]

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: { target: number; suffix?: string; duration?: number }) {
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
            const easeOut = 1 - Math.pow(1 - progress, 4)
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
  }, [target, hasAnimated, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function FeatureShowcase({ capability, index }: { capability: (typeof capabilities)[0]; index: number }) {
  const isEven = index % 2 === 0

  return (
    <div className="min-h-screen flex items-center py-32">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className={cn("grid lg:grid-cols-2 gap-16 lg:gap-24 items-center", !isEven && "lg:grid-flow-dense")}>
          {/* Content */}
          <div className={cn(!isEven && "lg:col-start-2")}>
            <ScrollReveal delay={100}>
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center text-background">
                  <capability.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    {capability.subtitle}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8">{capability.title}</h2>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-xl">
                {capability.description}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="grid grid-cols-3 gap-8">
                {capability.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-black mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Image */}
          <ClipReveal
            direction={isEven ? "left" : "right"}
            delay={200}
            className={cn(!isEven && "lg:col-start-1 lg:row-start-1")}
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-foreground/5">
              <Image
                src={capability.image || "/placeholder.svg"}
                alt={capability.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-foreground/5" />
            </div>
          </ClipReveal>
        </div>
      </div>
    </div>
  )
}

export default function FeaturesPage() {
  const [activeCapability, setActiveCapability] = useState(0)

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero Section - Full viewport with bold typography */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-24">
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[25vw] font-black text-foreground/[0.015] tracking-tighter whitespace-nowrap">
            FEATURES
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-5xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-semibold">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Platform v3.0
                </div>
                <span className="text-sm text-muted-foreground">Released December 2024</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8">
                Built
                <br />
                <span className="text-muted-foreground/40">different.</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-16">
                Every feature obsessively engineered for creators who demand the absolute best. No compromises. No
                shortcuts.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="flex flex-wrap gap-4 mb-20">
                <Link href="/auth?mode=signup">
                  <MagneticButton
                    strength={0.15}
                    className="h-16 px-10 bg-foreground text-background rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 group"
                  >
                    Start Creating
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </MagneticButton>
                </Link>
                <MagneticButton
                  strength={0.15}
                  className="h-16 px-10 rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 border-2 border-foreground/10 hover:border-foreground/20 transition-colors group"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats bar */}
          <ScrollReveal delay={400}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-foreground/5">
              {heroFeatures.map((feature) => (
                <div key={feature.label}>
                  <p className="text-3xl md:text-4xl font-black mb-1">{feature.value}</p>
                  <p className="text-sm text-muted-foreground">{feature.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-bounce-subtle">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-foreground/20" />
          </div>
        </div>
      </section>

      {/* Capability Showcases - Each is a full viewport section */}
      {capabilities.map((capability, index) => (
        <FeatureShowcase key={capability.id} capability={capability} index={index} />
      ))}

      {/* Tools Grid - Bento style */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <ScrollReveal>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight">
                Everything
                <br />
                you need.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-xl text-background/60 lg:pt-4">
                A complete toolkit for professional creators. Every feature designed to amplify your creativity and
                streamline your workflow.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {toolsGrid.map((tool, index) => (
              <ScrollReveal key={tool.name} delay={index * 50}>
                <div className="group p-6 rounded-2xl bg-background/5 hover:bg-background/10 transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center mb-4 group-hover:bg-background/20 transition-colors">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold mb-1">{tool.name}</h3>
                  <p className="text-sm text-background/50">{tool.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section - Clean table design */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Comparison</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-6">See the difference.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                MATTR outperforms in every metric that matters for professional creators.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="rounded-3xl overflow-hidden border border-foreground/5 bg-white">
              {/* Header */}
              <div className="grid grid-cols-3 bg-foreground text-background">
                <div className="p-6 font-bold">Feature</div>
                <div className="p-6 text-center font-bold">MATTR</div>
                <div className="p-6 text-center font-bold text-background/60">Others</div>
              </div>

              {/* Rows */}
              {comparisonData.map((row, i) => (
                <div
                  key={row.feature}
                  className={cn("grid grid-cols-3 border-t border-foreground/5", i % 2 === 0 && "bg-foreground/[0.01]")}
                >
                  <div className="p-6 font-medium">{row.feature}</div>
                  <div className="p-6 text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-sm">
                      <Check className="w-3.5 h-3.5" />
                      {row.mattr}
                    </span>
                  </div>
                  <div className="p-6 text-center text-muted-foreground">{row.others}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA - Bold and simple */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[30vw] font-black text-foreground/[0.02] tracking-tighter">GO</span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
              Ready to
              <br />
              <span className="text-muted-foreground/40">create?</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-xl mx-auto">
              Join 150,000+ creators already using MATTR to bring their ideas to life.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?mode=signup">
                <MagneticButton
                  strength={0.15}
                  className="h-16 px-12 bg-foreground text-background rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 group"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              </Link>
              <Link href="/pricing">
                <MagneticButton
                  strength={0.15}
                  className="h-16 px-12 rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 border-2 border-foreground/10 hover:border-foreground/20 transition-colors"
                >
                  View Pricing
                  <ArrowUpRight className="w-5 h-5" />
                </MagneticButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
