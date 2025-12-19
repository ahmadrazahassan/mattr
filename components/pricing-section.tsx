"use client"

import { useState, useEffect, useRef } from "react"
import { Check, ArrowRight, ArrowUpRight, Shield, Clock, CreditCard } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For individuals",
    price: { monthly: 0, yearly: 0 },
    unit: "Free forever",
    highlight: "50 images/mo",
    features: [
      "50 generations per month",
      "Standard quality (720p)",
      "5 base styles",
      "Community support",
      "Basic export formats",
    ],
    cta: "Start Free",
    accent: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For creators",
    price: { monthly: 29, yearly: 19 },
    unit: "/month",
    highlight: "Unlimited",
    features: [
      "Unlimited generations",
      "4K Ultra HD quality",
      "50+ premium styles",
      "Priority rendering",
      "API access included",
      "Commercial license",
    ],
    cta: "Start Trial",
    accent: true,
  },
  {
    id: "team",
    name: "Team",
    tagline: "For agencies",
    price: { monthly: 79, yearly: 59 },
    unit: "/seat/month",
    highlight: "10 seats",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared workspace",
      "Admin dashboard",
      "SSO authentication",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    accent: false,
  },
]

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes, upgrade or downgrade at any time. Changes apply immediately.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major credit cards, PayPal, and wire transfer for enterprise.",
  },
  {
    q: "Is there a free trial?",
    a: "Pro plan includes a 14-day free trial. No credit card required.",
  },
  {
    q: "Do you offer refunds?",
    a: "Full refund within 30 days if you're not satisfied.",
  },
]

function AnimatedPrice({ value, isVisible }: { value: number; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 800
    const steps = 30
    const stepValue = value / steps
    let current = 0

    const interval = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [value, isVisible])

  return <span>{displayValue}</span>
}

export function PricingSection() {
  const [yearly, setYearly] = useState(true)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="pricing" className="py-40 relative overflow-hidden bg-[#FAF8F5] bg-noise">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[30vw] font-black text-foreground/[0.015] tracking-tighter whitespace-nowrap">
          PRICING
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 rounded-full mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Simple pricing, no surprises</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8">
              Choose your
              <br />
              <span className="relative inline-block">
                creative power
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10C50 4 100 4 150 7C200 10 250 6 298 4"
                    stroke="#b45309"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="animate-draw"
                  />
                </svg>
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Start free, scale as you grow. All plans include core features.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="inline-flex items-center p-1.5 bg-foreground/5 rounded-full">
              <button
                onClick={() => setYearly(false)}
                className={cn(
                  "relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-500",
                  !yearly ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={cn(
                  "relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-500 flex items-center gap-3",
                  yearly ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Yearly
                {yearly && (
                  <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">SAVE 35%</span>
                )}
              </button>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 mb-24">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.id} delay={index * 100} direction="up">
              <div
                className={cn(
                  "group relative h-full transition-all duration-700",
                  hoveredPlan && hoveredPlan !== plan.id && "opacity-40 scale-[0.98]",
                )}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                <div
                  className={cn(
                    "relative h-full rounded-3xl p-10 transition-all duration-500 overflow-hidden",
                    plan.accent ? "bg-foreground text-background" : "bg-white hover:shadow-2xl",
                  )}
                >
                  {/* Popular indicator */}
                  {plan.accent && (
                    <div className="absolute top-6 right-6">
                      <div className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold rounded-full">
                        MOST POPULAR
                      </div>
                    </div>
                  )}

                  {/* Plan name and tagline */}
                  <div className="mb-10">
                    <span
                      className={cn(
                        "text-sm font-medium uppercase tracking-widest",
                        plan.accent ? "text-background/60" : "text-muted-foreground",
                      )}
                    >
                      {plan.tagline}
                    </span>
                    <h3 className="text-3xl font-black mt-1">{plan.name}</h3>
                  </div>

                  {/* Price display */}
                  <div className="mb-10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black">
                        $<AnimatedPrice value={yearly ? plan.price.yearly : plan.price.monthly} isVisible={isVisible} />
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className={cn("text-lg", plan.accent ? "text-background/60" : "text-muted-foreground")}>
                          {plan.unit}
                        </span>
                      )}
                    </div>
                    {plan.price.monthly === 0 && (
                      <p className={cn("text-sm mt-2", plan.accent ? "text-background/60" : "text-muted-foreground")}>
                        {plan.unit}
                      </p>
                    )}
                    {yearly && plan.price.yearly > 0 && (
                      <p className={cn("text-sm mt-2", plan.accent ? "text-background/60" : "text-muted-foreground")}>
                        Billed ${plan.price.yearly * 12}/year
                      </p>
                    )}
                  </div>

                  {/* Highlight metric */}
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-10",
                      plan.accent ? "bg-background/10 text-background" : "bg-foreground/5 text-foreground",
                    )}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {plan.highlight}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0",
                            plan.accent ? "bg-background/10" : "bg-emerald-500/10",
                          )}
                        >
                          <Check className={cn("w-3 h-3", plan.accent ? "text-emerald-400" : "text-emerald-600")} />
                        </div>
                        <span className={cn("text-sm", plan.accent ? "text-background/80" : "text-muted-foreground")}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <MagneticButton
                    strength={0.15}
                    className={cn(
                      "w-full h-14 rounded-2xl font-bold text-base inline-flex items-center justify-center gap-3 transition-all duration-500 group/btn",
                      plan.accent
                        ? "bg-background text-foreground hover:shadow-xl"
                        : "bg-foreground text-background hover:shadow-xl",
                    )}
                  >
                    {plan.cta}
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 py-10 border-y border-foreground/5 mb-24">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">Secure payments</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center">
                <Clock className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">14-day free trial</p>
                <p className="text-xs text-muted-foreground">No credit card required</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">Cancel anytime</p>
                <p className="text-xs text-muted-foreground">No questions asked</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h3 className="text-3xl font-bold text-center mb-12">Common questions</h3>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 50}>
                <div
                  className={cn(
                    "rounded-2xl overflow-hidden transition-all duration-500",
                    expandedFaq === index ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white",
                  )}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="font-semibold text-lg pr-8">{faq.q}</span>
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center shrink-0 transition-all duration-500",
                        expandedFaq === index && "bg-foreground text-background rotate-45",
                      )}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-500",
                      expandedFaq === index ? "max-h-40 pb-6" : "max-h-0",
                    )}
                  >
                    <p className="px-6 text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={500}>
          <div className="mt-24 text-center">
            <p className="text-muted-foreground mb-4">Need a custom solution for your enterprise?</p>
            <MagneticButton
              strength={0.15}
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:shadow-xl transition-all duration-500 group"
            >
              Talk to Sales
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
