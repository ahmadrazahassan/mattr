"use client"

import { useRef, useState, useEffect } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

const features = [
  {
    id: "speed",
    number: "01",
    title: "Blazing Fast",
    headline: "From thought to image in under 3 seconds",
    description:
      "Our distributed infrastructure processes across 200+ edge nodes globally. No waiting, no queues, just instant creation.",
    stats: [
      { value: "2.8s", label: "Average generation" },
      { value: "99.99%", label: "Uptime SLA" },
      { value: "200+", label: "Edge locations" },
    ],
  },
  {
    id: "quality",
    number: "02",
    title: "Unmatched Quality",
    headline: "8K resolution that rivals professional photography",
    description:
      "100 billion parameter model trained on curated datasets. Every pixel is intentional, every detail is perfect.",
    stats: [
      { value: "8K", label: "Max resolution" },
      { value: "100B+", label: "Parameters" },
      { value: "16-bit", label: "Color depth" },
    ],
  },
  {
    id: "control",
    number: "03",
    title: "Total Control",
    headline: "Your vision, executed precisely",
    description:
      "Advanced controls for composition, lighting, style, and mood. Fine-tune every aspect or let AI handle the details.",
    stats: [
      { value: "50+", label: "Style presets" },
      { value: "∞", label: "Customization" },
      { value: "1:1", label: "Prompt accuracy" },
    ],
  },
]

const showcaseImages = [
  {
    src: "/images/feature-portrait.jpg",
    query: "hyperrealistic portrait beautiful woman dramatic studio lighting",
    label: "Portrait",
  },
  {
    src: "/images/feature-architecture.jpg",
    query: "modern minimalist architecture interior white marble luxury",
    label: "Architecture",
  },
  {
    src: "/images/feature-landscape.jpg",
    query: "epic mountain landscape golden hour dramatic clouds cinematic",
    label: "Landscape",
  },
  {
    src: "/images/feature-abstract.jpg",
    query: "abstract digital art flowing colors vibrant energy",
    label: "Abstract",
  },
  {
    src: "/images/feature-product.jpg",
    query: "premium product photography floating sneaker clean white background",
    label: "Product",
  },
  {
    src: "/images/feature-fashion.jpg",
    query: "high fashion editorial photography dramatic black and white contrast",
    label: "Fashion",
  },
]

function FeatureVisual({ feature, isActive }: { feature: (typeof features)[0]; isActive: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col justify-between transition-all duration-700",
        isActive ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {/* Large number background */}
      <div className="absolute -top-20 -right-20 text-[300px] font-bold text-foreground/[0.02] select-none leading-none pointer-events-none">
        {feature.number}
      </div>

      {/* Spacer for headline area */}
      <div className="flex-1" />

      {/* Stats - positioned at bottom with proper spacing */}
      <div className="relative z-10 pt-8">
        <div className="flex flex-wrap gap-x-8 gap-y-6 lg:gap-x-12">
          {feature.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "min-w-[100px] transition-all duration-500",
                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Auto-cycle features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="features" ref={sectionRef} className="relative overflow-hidden bg-[#FAF8F5] bg-noise">
      {/* Part 1: Feature Showcase */}
      <div className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-24">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Why MATTR</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight max-w-4xl">
                The future of
                <br />
                <span className="text-muted-foreground">visual creation</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Feature navigation */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Feature selector */}
            <div className="space-y-0">
              {features.map((feature, i) => (
                <ScrollReveal key={feature.id} delay={200 + i * 100}>
                  <button
                    onClick={() => setActiveFeature(i)}
                    className={cn(
                      "w-full text-left py-8 border-t border-foreground/10 group transition-all duration-300",
                      i === features.length - 1 && "border-b",
                    )}
                  >
                    <div className="flex items-start gap-6">
                      <span
                        className={cn(
                          "text-sm font-mono transition-colors duration-300",
                          activeFeature === i ? "text-accent" : "text-muted-foreground",
                        )}
                      >
                        {feature.number}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={cn(
                            "text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300",
                            activeFeature === i ? "text-foreground" : "text-foreground/40",
                          )}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={cn(
                            "text-lg transition-all duration-500 overflow-hidden",
                            activeFeature === i ? "text-muted-foreground max-h-24 opacity-100" : "max-h-0 opacity-0",
                          )}
                        >
                          {feature.description}
                        </p>
                      </div>
                      {/* Progress indicator */}
                      <div
                        className={cn(
                          "w-1 h-16 bg-foreground/5 rounded-full overflow-hidden",
                          activeFeature === i && "bg-foreground/10",
                        )}
                      >
                        <div
                          className={cn(
                            "w-full bg-accent transition-all duration-5000 ease-linear rounded-full",
                            activeFeature === i ? "h-full" : "h-0",
                          )}
                        />
                      </div>
                    </div>
                  </button>
                </ScrollReveal>
              ))}
            </div>

            {/* Right - Feature visual */}
            <ScrollReveal delay={400} direction="right">
              <div className="relative h-[500px] lg:h-[600px]">
                {features.map((feature, i) => (
                  <FeatureVisual key={feature.id} feature={feature} isActive={activeFeature === i} />
                ))}

                {/* Active feature headline */}
                <div className="relative z-10">
                  {features.map((feature, i) => (
                    <h3
                      key={feature.id}
                      className={cn(
                        "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-lg transition-all duration-700 absolute top-0 left-0",
                        activeFeature === i
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8 pointer-events-none",
                      )}
                    >
                      {feature.headline}
                    </h3>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Part 2: Image Showcase Grid */}
      <div className="py-32 lg:py-40">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Every style. One platform.
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From photorealism to abstract art, MATTR handles it all.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {showcaseImages.map((img, i) => (
                <div
                  key={img.label}
                  className={cn(
                    "relative group cursor-pointer overflow-hidden rounded-2xl",
                    i === 0 && "col-span-2 row-span-2",
                    i === 3 && "col-span-2",
                    i !== 0 && i !== 3 && "aspect-square",
                    i === 0 && "aspect-square",
                  )}
                  onMouseEnter={() => setHoveredImage(i)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-foreground/60 flex items-end p-6 transition-opacity duration-500",
                      hoveredImage === i ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <div
                      className={cn(
                        "transition-all duration-500",
                        hoveredImage === i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                      )}
                    >
                      <span className="text-white text-xl font-bold">{img.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Part 3: Large Statement */}
      <div className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="relative">
              <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-muted-foreground">We built MATTR because </span>
                creativity shouldn't have limits.
                <span className="text-muted-foreground"> The best ideas deserve </span>
                instant, beautiful execution.
              </p>
              <div className="absolute -left-8 top-0 w-1 h-full bg-accent rounded-full hidden lg:block" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
