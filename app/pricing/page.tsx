"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Check,
  Minus,
  ArrowRight,
  ChevronDown,
  Building2,
  ArrowUpRight,
  MousePointer,
  Users,
  Headphones,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "For individuals getting started with AI image generation.",
    price: { monthly: 0, yearly: 0 },
    unit: "Free forever",
    features: [
      { name: "50 generations/month", included: true },
      { name: "720p resolution", included: true },
      { name: "5 base styles", included: true },
      { name: "Community support", included: true },
      { name: "Basic exports", included: true },
      { name: "API access", included: false },
      { name: "Commercial license", included: false },
      { name: "Priority queue", included: false },
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professional creators who need unlimited power.",
    price: { monthly: 29, yearly: 19 },
    unit: "/month",
    features: [
      { name: "Unlimited generations", included: true },
      { name: "4K Ultra HD", included: true },
      { name: "50+ premium styles", included: true },
      { name: "Priority support", included: true },
      { name: "All export formats", included: true },
      { name: "API (10K req/mo)", included: true },
      { name: "Commercial license", included: true },
      { name: "Priority queue", included: true },
    ],
    cta: "Start 14-Day Trial",
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    description: "For teams and agencies scaling their creative output.",
    price: { monthly: 79, yearly: 59 },
    unit: "/seat/month",
    features: [
      { name: "Everything in Pro", included: true },
      { name: "Up to 10 seats", included: true },
      { name: "Shared workspace", included: true },
      { name: "Admin dashboard", included: true },
      { name: "SSO authentication", included: true },
      { name: "API (100K req/mo)", included: true },
      { name: "Account manager", included: true },
      { name: "Custom training", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Absolutely. Upgrade instantly, downgrade at period end. No penalties, ever.",
  },
  {
    q: "What payment methods do you accept?",
    a: "All major cards, PayPal, and wire transfers for enterprise. Processed securely through Stripe.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes. Pro includes a 14-day trial with full features. No credit card required.",
  },
  {
    q: "Do you offer refunds?",
    a: "Full refund within 30 days, no questions asked. Annual plans get prorated refunds within 60 days.",
  },
  {
    q: "What happens at my generation limit?",
    a: "On free plan, purchase additional packs or upgrade to Pro for unlimited generations.",
  },
  {
    q: "Can I use images commercially?",
    a: "Commercial rights included with Pro and Team. Starter is personal use only.",
  },
]

const enterprises = ["Spotify", "Airbnb", "Netflix", "Stripe", "Notion", "Figma"]

function PriceDisplay({
  monthly,
  yearly,
  isYearly,
  isPopular,
}: { monthly: number; yearly: number; isYearly: boolean; isPopular: boolean }) {
  const [displayPrice, setDisplayPrice] = useState(isYearly ? yearly : monthly)
  const targetPrice = isYearly ? yearly : monthly

  useEffect(() => {
    const duration = 500
    const steps = 20
    const startPrice = displayPrice
    const diff = targetPrice - startPrice
    let step = 0

    const interval = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayPrice(Math.round(startPrice + diff * eased))

      if (step >= steps) {
        clearInterval(interval)
        setDisplayPrice(targetPrice)
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [targetPrice])

  return <span className={cn("tabular-nums", isPopular ? "text-background" : "text-foreground")}>${displayPrice}</span>
}

export default function PricingPage() {
  const [yearly, setYearly] = useState(true)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center relative overflow-hidden pt-24 pb-12">
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[25vw] font-black text-foreground/[0.015] tracking-tighter whitespace-nowrap">
            PRICING
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-full text-sm font-semibold mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Simple pricing, no surprises
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] mb-8">
              One price.
              <br />
              <span className="text-muted-foreground/40">Unlimited.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Start free, scale when ready. No hidden fees, no usage limits on paid plans.
            </p>
          </ScrollReveal>

          {/* Billing toggle */}
          <ScrollReveal delay={300}>
            <div className="inline-flex items-center p-1.5 bg-foreground/5 rounded-full mb-4">
              <button
                onClick={() => setYearly(false)}
                className={cn(
                  "relative px-8 py-3 rounded-full text-sm font-bold transition-all duration-300",
                  !yearly ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={cn(
                  "relative px-8 py-3 rounded-full text-sm font-bold transition-all duration-300",
                  yearly ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Yearly
              </button>
            </div>
            {yearly && <p className="text-sm text-emerald-600 font-semibold">Save 35% with annual billing</p>}
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 relative">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-4">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.id} delay={index * 100}>
                <div
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  className={cn(
                    "relative h-full rounded-3xl p-8 lg:p-10 transition-all duration-500",
                    plan.popular ? "bg-foreground text-background lg:scale-105 z-10" : "bg-white",
                    hoveredPlan && hoveredPlan !== plan.id && "lg:opacity-60 lg:scale-[0.98]",
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                    <p className={cn("text-sm", plan.popular ? "text-background/60" : "text-muted-foreground")}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-6xl font-black">
                        {plan.price.monthly === 0 ? (
                          "$0"
                        ) : (
                          <PriceDisplay
                            monthly={plan.price.monthly}
                            yearly={plan.price.yearly}
                            isYearly={yearly}
                            isPopular={plan.popular}
                          />
                        )}
                      </span>
                      {plan.price.monthly > 0 && (
                        <span className={cn("text-lg", plan.popular ? "text-background/60" : "text-muted-foreground")}>
                          {plan.unit}
                        </span>
                      )}
                    </div>
                    {plan.price.monthly === 0 && (
                      <p className={cn("text-sm mt-1", plan.popular ? "text-background/60" : "text-muted-foreground")}>
                        {plan.unit}
                      </p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                            feature.included
                              ? plan.popular
                                ? "bg-emerald-500/20"
                                : "bg-emerald-500/10"
                              : plan.popular
                                ? "bg-background/10"
                                : "bg-foreground/5",
                          )}
                        >
                          {feature.included ? (
                            <Check className={cn("w-3 h-3", plan.popular ? "text-emerald-400" : "text-emerald-600")} />
                          ) : (
                            <Minus
                              className={cn("w-3 h-3", plan.popular ? "text-background/30" : "text-foreground/30")}
                            />
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-sm",
                            feature.included
                              ? plan.popular
                                ? "text-background/90"
                                : "text-foreground"
                              : plan.popular
                                ? "text-background/40"
                                : "text-foreground/40",
                          )}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.id === "team" ? "#enterprise" : "/auth?mode=signup"}>
                    <MagneticButton
                      strength={0.1}
                      className={cn(
                        "w-full h-14 rounded-2xl font-bold inline-flex items-center justify-center gap-2 transition-all duration-300 group",
                        plan.popular
                          ? "bg-background text-foreground hover:shadow-xl"
                          : "bg-foreground text-background hover:shadow-xl",
                      )}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </MagneticButton>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="enterprise" className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <ScrollReveal>
                <p className="text-sm font-bold uppercase tracking-widest text-background/50 mb-4">Enterprise</p>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-8">
                  Built for
                  <br />
                  scale.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <p className="text-xl text-background/60 mb-12 max-w-lg">
                  Custom solutions for organizations with specific security, compliance, and infrastructure
                  requirements.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="grid grid-cols-2 gap-6 mb-12">
                  {[
                    { icon: Building2, label: "Dedicated infrastructure" },
                    { icon: Users, label: "Unlimited seats" },
                    { icon: MousePointer, label: "Custom integrations" },
                    { icon: Headphones, label: "24/7 support" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-background/80">{item.label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <MagneticButton
                  strength={0.15}
                  className="h-14 px-8 bg-background text-foreground rounded-full font-bold inline-flex items-center justify-center gap-3 group"
                >
                  Talk to Sales
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {enterprises.map((company) => (
                  <div
                    key={company}
                    className="p-8 rounded-2xl bg-background/5 hover:bg-background/10 transition-colors flex items-center justify-center"
                  >
                    <span className="text-xl font-bold">{company}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Questions? Answers.</h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="bg-white rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-foreground/[0.02] transition-colors"
                  >
                    <span className="font-bold">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-300",
                        expandedFaq === i && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      expandedFaq === i ? "max-h-40" : "max-h-0",
                    )}
                  >
                    <p className="px-6 pb-6 text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[30vw] font-black text-foreground/[0.02] tracking-tighter">START</span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8">Still thinking?</h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
              Start free. No credit card. Cancel anytime. What's there to lose?
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
              <Link href="/features">
                <MagneticButton
                  strength={0.15}
                  className="h-16 px-12 rounded-full font-bold text-lg inline-flex items-center justify-center gap-3 border-2 border-foreground/10 hover:border-foreground/20 transition-colors"
                >
                  Explore Features
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
