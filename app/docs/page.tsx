"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Search, Book, Code, Palette, Settings, ArrowRight, ChevronRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  {
    icon: Book,
    title: "Getting Started",
    description: "Learn the basics and create your first image",
    articles: ["Quick Start Guide", "Your First Generation", "Understanding Prompts", "Best Practices"],
  },
  {
    icon: Code,
    title: "API Reference",
    description: "Integrate MATTR into your applications",
    articles: ["Authentication", "Generate Images", "List Models", "Webhooks", "Rate Limits"],
  },
  {
    icon: Palette,
    title: "Styles & Models",
    description: "Explore different artistic styles",
    articles: ["Available Models", "Style Transfer", "Custom Training", "Model Comparison"],
  },
  {
    icon: Settings,
    title: "Advanced",
    description: "Fine-tune your generations",
    articles: ["Parameters Guide", "Batch Processing", "Image-to-Image", "Inpainting", "Upscaling"],
  },
]

const popularArticles = [
  { title: "How to Write Better Prompts", category: "Getting Started", time: "5 min" },
  { title: "API Authentication Guide", category: "API Reference", time: "3 min" },
  { title: "Understanding CFG Scale", category: "Advanced", time: "7 min" },
  { title: "Style Mixing Tutorial", category: "Styles & Models", time: "10 min" },
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6 justify-center">
                <span className="w-8 h-px bg-accent" />
                Documentation
                <span className="w-8 h-px bg-accent" />
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                How can we help?
              </h1>

              {/* Search */}
              <div
                className={cn("mt-12 max-w-2xl mx-auto transition-all duration-300", isSearchFocused && "scale-[1.02]")}
              >
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search documentation..."
                    className="w-full h-16 pl-14 pr-6 bg-white border border-foreground/10 rounded-2xl text-lg focus:outline-none focus:border-foreground/30 focus:shadow-lg transition-all duration-300"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground/5 rounded text-xs text-muted-foreground">
                    ⌘K
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <ScrollReveal key={section.title} delay={index * 100}>
                <div className="group p-8 bg-white rounded-2xl hover-lift cursor-pointer h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <section.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{section.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{section.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {section.articles.map((article) => (
                      <li key={article}>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronRight className="w-3 h-3" />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-24 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
              <div>
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-background/40 mb-6 block">
                  Popular
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Most read articles</h2>
              </div>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-background/60 hover:text-background transition-colors"
              >
                View all articles
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <ScrollReveal key={article.title} delay={index * 75}>
                <a href="#">
                  <div className="group p-6 bg-background/5 rounded-2xl hover:bg-background/10 transition-colors cursor-pointer">
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-2 block">
                      {article.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <span className="text-sm text-background/40">{article.time} read</span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* API Quick Start */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="bg-foreground/[0.02] rounded-3xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
                    <span className="w-8 h-px bg-accent" />
                    API
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Start building in minutes</h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Our REST API makes it easy to integrate AI image generation into your applications. Get started with
                    just a few lines of code.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="px-6 py-3 bg-foreground text-background rounded-xl font-semibold hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
                    >
                      API Reference
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="px-6 py-3 bg-foreground/5 rounded-xl font-semibold hover:bg-foreground/10 transition-colors inline-flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Playground
                    </a>
                  </div>
                </div>

                <div className="bg-foreground text-background rounded-2xl p-6 font-mono text-sm overflow-x-auto">
                  <div className="flex gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500/50" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <span className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <pre className="text-background/70">
                    {`curl -X POST https://api.mattr.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A serene mountain landscape",
    "model": "mattr-v3",
    "size": "1024x1024"
  }'`}
                  </pre>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
