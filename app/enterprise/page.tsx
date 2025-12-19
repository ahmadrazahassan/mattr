"use client"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowRight, Shield, Users, Headphones, Server, Lock, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with SSO, SAML, and advanced access controls.",
  },
  {
    icon: Server,
    title: "Dedicated Infrastructure",
    description: "Private cloud deployment options with guaranteed uptime SLAs.",
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Centralized billing, usage analytics, and granular permissions.",
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "Your data stays yours. We never train on enterprise generations.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Detailed insights into usage patterns, costs, and performance.",
  },
  {
    icon: Headphones,
    title: "Priority Support",
    description: "Dedicated account manager and 24/7 technical support.",
  },
]

const logos = ["Spotify", "Airbnb", "Netflix", "Stripe", "Notion", "Figma", "Slack", "Adobe"]

const testimonials = [
  {
    quote: "MATTR has transformed how our design team works. We've cut asset creation time by 80%.",
    author: "Sarah Chen",
    role: "VP of Design",
    company: "Notion",
  },
  {
    quote: "The enterprise features and security controls made MATTR an easy choice for our organization.",
    author: "Michael Ross",
    role: "CTO",
    company: "Scale AI",
  },
]

export default function EnterprisePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
                <span className="w-8 h-px bg-accent" />
                Enterprise
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                AI image generation
                <br />
                <span className="text-muted-foreground">at scale.</span>
              </h1>
              <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Empower your entire organization with secure, scalable AI image generation. Built for teams that demand
                the best.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/contact">
                  <button className="px-8 py-4 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-colors duration-300 flex items-center gap-2">
                    Contact Sales
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/docs">
                  <button className="px-8 py-4 bg-foreground/5 text-foreground rounded-full font-semibold hover:bg-foreground/10 transition-colors duration-300">
                    View Documentation
                  </button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Logos */}
      <section className="py-16 px-6 lg:px-8 border-y border-foreground/5">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-center text-sm text-muted-foreground mb-8">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {logos.map((logo) => (
                <span key={logo} className="text-2xl font-bold text-foreground/20">
                  {logo}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
                <span className="w-8 h-px bg-accent" />
                Features
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Built for enterprise.</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 75}>
                <div className="p-8 bg-white rounded-2xl h-full">
                  <feature.icon className="w-10 h-10 text-accent mb-6" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-8 bg-background/5 rounded-2xl">
                  <blockquote className="text-xl font-medium mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-background/10" />
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-background/60">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Talk to our sales team to learn how MATTR can power your organization's creative workflows.
            </p>
            <Link href="/contact">
              <button className="px-10 py-5 bg-foreground text-background rounded-full font-semibold text-lg hover:bg-foreground/90 transition-colors duration-300 flex items-center gap-3 mx-auto">
                Contact Sales
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
