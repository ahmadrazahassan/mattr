"use client"

import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

const brands = ["Spotify", "Airbnb", "Netflix", "Stripe", "Notion", "Figma", "Linear", "Vercel"]

const ctaShowcase = [
  { query: "stunning portrait golden hour professional", src: "/images/cta-1.jpg" },
  { query: "futuristic cityscape neon cyberpunk", src: "/images/cta-2.jpg" },
  { query: "abstract art flowing colors energy", src: "/images/cta-3.jpg" },
  { query: "fantasy landscape magical ethereal", src: "/images/cta-4.jpg" },
]

export function CTASection() {
  const [offset, setOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const scrollProgress = 1 - rect.top / window.innerHeight
        setOffset(scrollProgress * 50)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={containerRef} className="py-40 relative overflow-hidden bg-[#FAF8F5] bg-noise">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {ctaShowcase.map((item, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden opacity-20 hover:opacity-40 transition-opacity"
            style={{
              top: `${15 + i * 20}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : "auto",
              right: i % 2 !== 0 ? `${5 + i * 3}%` : "auto",
              transform: `rotate(${i % 2 === 0 ? -6 : 6}deg) translateY(${offset * (i % 2 === 0 ? 0.5 : -0.5)}px)`,
            }}
          >
            <img
              src={item.src}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <ScrollReveal>
            <p className="text-sm text-muted-foreground mb-4">Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 mb-20 opacity-40">
              {brands.slice(0, 6).map((brand) => (
                <span key={brand} className="text-lg font-semibold">
                  {brand}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <div style={{ transform: `translateY(${-offset}px)` }}>
            <ScrollReveal delay={100}>
              <h2 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8">
                Ready to create
                <br />
                <span className="text-accent">something amazing?</span>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12">
              Join 150,000+ creators already using MATTR to bring their ideas to life.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <MagneticButton
              strength={0.3}
              className="group h-16 px-10 text-lg bg-foreground text-background rounded-full font-semibold inline-flex items-center justify-center gap-4 transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              <span>Start Creating Free</span>
              <div className="w-8 h-8 bg-background/20 rounded-full flex items-center justify-center group-hover:bg-background/30 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </MagneticButton>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="text-sm text-muted-foreground mt-8">
              No credit card required • Free forever plan • Cancel anytime
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
