"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { Send, Check, ArrowRight, Copy, ArrowUpRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Split Text Animation
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

// Interactive globe/location marker
function LocationMarker({ city, delay = 0 }: { city: string; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-3 h-3 rounded-full bg-foreground transition-all duration-500",
        isHovered && "scale-150"
      )}>
        <div className={cn(
          "absolute inset-0 rounded-full bg-foreground/30 animate-ping",
          !isHovered && "opacity-0"
        )} />
      </div>
      <span className={cn(
        "absolute left-6 top-1/2 -translate-y-1/2 text-sm font-medium whitespace-nowrap transition-all duration-300",
        isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
      )}>
        {city}
      </span>
    </div>
  )
}

const contactOptions = [
  { id: "sales", label: "Sales", email: "sales@mattr.ai", time: "< 4 hours" },
  { id: "support", label: "Support", email: "support@mattr.ai", time: "< 2 hours" },
  { id: "press", label: "Press", email: "press@mattr.ai", time: "< 24 hours" },
]

const faqs = [
  { q: "What's the best way to reach you?", a: "Email us directly or use the contact form. We typically respond within a few hours during business hours." },
  { q: "Do you offer enterprise support?", a: "Yes, enterprise customers get dedicated support with guaranteed response times and a dedicated account manager." },
  { q: "Can I schedule a demo?", a: "Reach out to our sales team and we'll set up a personalized demo to show you how MATTR can work for your team." },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)
  const [activeOption, setActiveOption] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero - Asymmetric editorial layout */}
      <section ref={heroRef} className="min-h-screen relative overflow-hidden pt-32 pb-24">
        {/* Subtle moving background element */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-foreground/[0.02] blur-3xl pointer-events-none transition-transform duration-1000 ease-out"
          style={{
            left: `${mousePosition.x * 30}%`,
            top: `${mousePosition.y * 30}%`,
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 min-h-[70vh] items-end">
            {/* Left - Large typography */}
            <div className="lg:col-span-7 lg:pb-20">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-foreground/20" />
                  <span className="text-sm font-mono text-muted-foreground tracking-wider">CONTACT</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <h1 className="text-[clamp(4rem,12vw,10rem)] font-bold tracking-tighter leading-[0.85] mb-8">
                  <SplitText text="Say" delay={100} />
                  <br />
                  <span className="text-muted-foreground/20">
                    <SplitText text="hello." delay={300} />
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                  We're here to help bring your vision to life. Let's start a conversation.
                </p>
              </ScrollReveal>
            </div>

            {/* Right - Vertical info stack */}
            <div className="lg:col-span-5 lg:pb-20">
              <ScrollReveal delay={300}>
                <div className="space-y-12">
                  {/* Response time indicator */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <span className="text-sm text-muted-foreground">Usually respond within 2 hours</span>
                  </div>

                  {/* Quick contact cards */}
                  <div className="space-y-3">
                    {contactOptions.map((option, i) => (
                      <div
                        key={option.id}
                        onMouseEnter={() => setActiveOption(option.id)}
                        onMouseLeave={() => setActiveOption(null)}
                        onClick={() => copyEmail(option.email)}
                        className={cn(
                          "group flex items-center justify-between p-5 rounded-2xl border border-foreground/5 cursor-pointer transition-all duration-500",
                          activeOption === option.id ? "bg-foreground text-background border-foreground" : "hover:border-foreground/20",
                          activeOption !== null && activeOption !== option.id && "opacity-40"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono opacity-40">0{i + 1}</span>
                          <span className="font-medium">{option.label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "text-sm font-mono transition-colors",
                            activeOption === option.id ? "text-background/60" : "text-muted-foreground"
                          )}>
                            {option.email}
                          </span>
                          {copiedEmail === option.email ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className={cn(
                              "w-4 h-4 transition-opacity",
                              activeOption === option.id ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                            )} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Global presence indicator */}
                  <div className="pt-8 border-t border-foreground/5">
                    <p className="text-xs font-mono text-muted-foreground mb-6 tracking-wider">GLOBAL PRESENCE</p>
                    <div className="flex items-center gap-12">
                      <LocationMarker city="San Francisco" delay={0} />
                      <LocationMarker city="London" delay={100} />
                      <LocationMarker city="Singapore" delay={200} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Scroll indicator */}
          <ScrollReveal delay={500}>
            <div className="absolute bottom-8 left-6 lg:left-8 flex items-center gap-3 text-muted-foreground">
              <div className="w-px h-12 bg-foreground/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-scroll-line" />
              </div>
              <span className="text-xs font-mono tracking-wider">SCROLL</span>
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* Form Section - Split layout with large form */}
      <section className="py-32 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Sticky info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <ScrollReveal>
                <span className="text-xs font-mono text-background/40 tracking-wider">01 / MESSAGE</span>
                <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mt-6 mb-8">
                  <SplitText text="Let's" delay={0} />
                  <br />
                  <span className="text-background/30">
                    <SplitText text="talk." delay={200} />
                  </span>
                </h2>
                <p className="text-lg text-background/60 max-w-md leading-relaxed mb-12">
                  Tell us about your project. We'll get back to you within 24 hours with next steps.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-background/10">
                  {[
                    { value: "2hr", label: "Response" },
                    { value: "98%", label: "Satisfaction" },
                    { value: "24/7", label: "Support" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <span className="text-3xl font-bold block mb-1">{stat.value}</span>
                      <span className="text-xs text-background/40 uppercase tracking-wider">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Form */}
            <ScrollReveal delay={150}>
              <div className="bg-background text-foreground rounded-3xl p-8 lg:p-12 shadow-2xl">
                {isSubmitted ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 rounded-full border-2 border-emerald-500 flex items-center justify-center mx-auto mb-8">
                      <Check className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Message sent</h3>
                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                      Thanks for reaching out. We'll be in touch soon.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({ name: "", email: "", company: "", message: "" })
                      }}
                      className="text-sm font-medium underline underline-offset-4 hover:no-underline text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full h-14 px-5 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 focus:bg-foreground/[0.08] transition-all duration-300"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-muted-foreground">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full h-14 px-5 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 focus:bg-foreground/[0.08] transition-all duration-300"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground">Company (optional)</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full h-14 px-5 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 focus:bg-foreground/[0.08] transition-all duration-300"
                        placeholder="Company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-muted-foreground">Message</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="w-full px-5 py-4 bg-foreground/5 border border-foreground/10 rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/30 focus:bg-foreground/[0.08] resize-none transition-all duration-300"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full h-14 bg-foreground text-background rounded-full font-semibold text-lg inline-flex items-center justify-center gap-3 hover:bg-foreground/90 transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span className="w-6 h-6 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                        ) : (
                          <>
                            Send message
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section - Minimal */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="text-xs font-mono text-muted-foreground tracking-wider">02 / FAQ</span>
              <div className="flex-1 h-px bg-foreground/5" />
            </div>
          </ScrollReveal>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="border-b border-foreground/5 last:border-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full py-8 flex items-start justify-between text-left group"
                  >
                    <div className="flex items-start gap-6">
                      <span className="text-xs font-mono text-muted-foreground pt-1">0{i + 1}</span>
                      <span className="text-xl font-medium pr-8 group-hover:text-foreground/70 transition-colors">
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center flex-shrink-0 transition-all duration-500",
                        openFaq === i && "bg-foreground text-background rotate-180 border-foreground"
                      )}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <div className={cn(
                    "overflow-hidden transition-all duration-500",
                    openFaq === i ? "max-h-48 pb-8" : "max-h-0"
                  )}>
                    <p className="text-muted-foreground leading-relaxed pl-12">{faq.a}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Minimal */}
      <section className="py-32 border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div>
                <h2 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  <SplitText text="Ready to" delay={0} />
                  <br />
                  <span className="text-muted-foreground/30">
                    <SplitText text="create?" delay={300} />
                  </span>
                </h2>
              </div>
              <MagneticButton
                strength={0.15}
                className="h-16 px-10 bg-foreground text-background rounded-full font-semibold text-lg inline-flex items-center gap-3 group"
              >
                Start free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
