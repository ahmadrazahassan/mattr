"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { AnimatedHeading } from "@/components/animated-text"
import { Marquee } from "@/components/marquee"

const showcaseImages = [
  {
    query: "ethereal forest mist sunlight rays magical",
    label: "Ethereal",
    src: "/images/showcase-ethereal.jpg",
    altSrc: "/images/showcase-ethereal-alt.jpg",
  },
  {
    query: "cyberpunk city neon lights rain night futuristic",
    label: "Cyberpunk",
    src: "/images/showcase-cyberpunk.jpg",
    altSrc: "/images/showcase-cyberpunk-alt.jpg",
  },
  {
    query: "zen garden stones water ripples minimal calm",
    label: "Minimal",
    src: "/images/showcase-minimal.jpg",
    altSrc: "/images/showcase-minimal-alt.jpg",
  },
  {
    query: "abstract fluid art colorful organic shapes",
    label: "Abstract",
    src: "/images/showcase-abstract.jpg",
    altSrc: "/images/showcase-abstract-alt.jpg",
  },
  {
    query: "vintage film photography portrait golden hour",
    label: "Vintage",
    src: "/images/showcase-vintage.jpg",
    altSrc: "/images/showcase-vintage-alt.jpg",
  },
  {
    query: "surreal dreamscape floating islands clouds",
    label: "Surreal",
    src: "/images/showcase-surreal.jpg",
    altSrc: "/images/showcase-surreal-alt.jpg",
  },
]

const stats = [
  "10M+ Images Generated",
  "150K+ Active Users",
  "99.9% Uptime",
  "4K Resolution",
  "50+ Style Presets",
  "3s Generation Time",
]

export function ShowcaseSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#FAF8F5] bg-noise">
      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16">
          <ScrollReveal>
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-6">
              Showcase
            </span>
          </ScrollReveal>

          <AnimatedHeading as="h2" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Endless Possibilities
          </AnimatedHeading>

          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              From photorealistic portraits to abstract dreamscapes, your imagination is the only limit.
            </p>
          </ScrollReveal>
        </div>

        {/* Marquee Gallery */}
        <Marquee speed={50} pauseOnHover className="mb-8">
          {showcaseImages.map((image, i) => (
            <div
              key={i}
              className="relative w-[300px] md:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden group hover-lift"
            >
              <img
                src={image.src}
                alt={image.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
              <span className="absolute bottom-4 left-4 px-3 py-1.5 bg-background/90 text-sm font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.label}
              </span>
            </div>
          ))}
        </Marquee>

        <Marquee speed={45} direction="right" pauseOnHover>
          {[...showcaseImages].reverse().map((image, i) => (
            <div
              key={i}
              className="relative w-[280px] md:w-[350px] aspect-[4/3] rounded-2xl overflow-hidden group hover-lift"
            >
              <img
                src={image.altSrc}
                alt={image.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
            </div>
          ))}
        </Marquee>

        {/* Stats Marquee */}
        <div className="mt-20 py-6 bg-foreground/[0.02]">
          <Marquee speed={30} className="text-muted-foreground">
            {stats.map((stat, i) => (
              <span key={i} className="text-sm font-medium flex items-center gap-3">
                {stat}
                <span className="w-1 h-1 rounded-full bg-accent" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
