"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import {
  ArrowRight,
  Search,
  ExternalLink,
  Code,
  Puzzle,
  Zap,
  Globe,
  Plug,
  Box,
  MessageSquare,
  ShoppingBag,
  FileCode,
  Layout,
  Mail,
  Workflow,
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Design", "Development", "Productivity", "E-commerce", "Social"]

const integrations = [
  {
    id: 1,
    name: "Figma",
    description: "Generate images directly in your designs",
    category: "Design",
    status: "Available",
    popular: true,
    icon: Layout,
  },
  {
    id: 2,
    name: "Adobe Suite",
    description: "Seamless integration with Photoshop & more",
    category: "Design",
    status: "Available",
    popular: true,
    icon: Box,
  },
  {
    id: 3,
    name: "Notion",
    description: "Embed AI images in your workspace",
    category: "Productivity",
    status: "Available",
    popular: false,
    icon: FileCode,
  },
  {
    id: 4,
    name: "Slack",
    description: "Generate images with slash commands",
    category: "Productivity",
    status: "Available",
    popular: true,
    icon: MessageSquare,
  },
  {
    id: 5,
    name: "Shopify",
    description: "Auto-generate product images",
    category: "E-commerce",
    status: "Available",
    popular: true,
    icon: ShoppingBag,
  },
  {
    id: 6,
    name: "WordPress",
    description: "AI image generation plugin",
    category: "Development",
    status: "Available",
    popular: false,
    icon: Globe,
  },
  {
    id: 7,
    name: "Zapier",
    description: "Connect to 5000+ apps",
    category: "Productivity",
    status: "Available",
    popular: true,
    icon: Workflow,
  },
  {
    id: 8,
    name: "Discord",
    description: "Generate images in your server",
    category: "Social",
    status: "Available",
    popular: true,
    icon: MessageSquare,
  },
  {
    id: 9,
    name: "VS Code",
    description: "Generate images while coding",
    category: "Development",
    status: "Beta",
    popular: false,
    icon: Code,
  },
  {
    id: 10,
    name: "Webflow",
    description: "AI images for your projects",
    category: "Design",
    status: "Available",
    popular: false,
    icon: Layout,
  },
  {
    id: 11,
    name: "Canva",
    description: "Add AI elements to designs",
    category: "Design",
    status: "Coming Soon",
    popular: false,
    icon: Box,
  },
  {
    id: 12,
    name: "Mailchimp",
    description: "AI images for email campaigns",
    category: "Productivity",
    status: "Coming Soon",
    popular: false,
    icon: Mail,
  },
]

const features = [
  { icon: Puzzle, title: "Easy Setup", description: "Connect in minutes with guided installation" },
  { icon: Zap, title: "Real-time Sync", description: "Changes sync instantly across platforms" },
  { icon: Code, title: "Custom Webhooks", description: "Build your own with our webhook system" },
  { icon: Globe, title: "Full API Access", description: "Complete API for custom integrations" },
]

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesCategory = activeCategory === "All" || integration.category === activeCategory
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[15vw] font-black text-foreground/[0.015] tracking-tighter">CONNECT</span>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-bold flex items-center gap-2">
                  <Plug className="w-4 h-4" />
                  Ecosystem
                </span>
                <span className="text-sm text-muted-foreground">40+ integrations</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6">
                Integrations<span className="text-accent">.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                Connect MATTR with your favorite tools. Generate AI images wherever you work.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/api-docs">
                  <MagneticButton
                    strength={0.15}
                    className="h-14 px-8 bg-foreground text-background rounded-full font-bold inline-flex items-center justify-center gap-2 group"
                  >
                    Build Integration
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </MagneticButton>
                </Link>
                <MagneticButton
                  strength={0.15}
                  className="h-14 px-8 rounded-full font-bold inline-flex items-center justify-center gap-2 border-2 border-foreground/10"
                >
                  Request Integration
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="text-center md:text-left">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-black mb-1">{feature.title}</h3>
                  <p className="text-background/60 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integrations Grid */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search integrations..."
                  className="w-full h-12 pl-12 pr-4 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:border-foreground/30 transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-sm font-bold transition-colors",
                      activeCategory === category
                        ? "bg-foreground text-background"
                        : "bg-foreground/5 hover:bg-foreground/10",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Grid */}
          <ScrollReveal delay={100}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration) => (
                <Link
                  key={integration.id}
                  href="#"
                  className={cn(
                    "group p-6 bg-white rounded-2xl border border-foreground/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                    integration.status === "Coming Soon" && "opacity-60",
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                      <integration.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      {integration.popular && (
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">
                          Popular
                        </span>
                      )}
                      <span
                        className={cn(
                          "px-2 py-1 text-xs font-bold rounded-full",
                          integration.status === "Available"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : integration.status === "Beta"
                              ? "bg-blue-500/10 text-blue-600"
                              : "bg-foreground/10 text-muted-foreground",
                        )}
                      >
                        {integration.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-black mb-2">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    {integration.status === "Available" ? "Connect" : "Learn more"}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Build Your Own */}
      <section className="py-20 px-6 lg:px-8 bg-foreground/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Build your own</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Use our API and SDK to build custom integrations for your specific workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/api-docs">
                <MagneticButton
                  strength={0.15}
                  className="h-14 px-8 bg-foreground text-background rounded-full font-bold inline-flex items-center justify-center gap-2 group"
                >
                  View API Docs
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              </Link>
              <Link href="/docs">
                <MagneticButton
                  strength={0.15}
                  className="h-14 px-8 rounded-full font-bold inline-flex items-center justify-center gap-2 border-2 border-foreground/10"
                >
                  Developer Guide
                  <ExternalLink className="w-4 h-4" />
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
