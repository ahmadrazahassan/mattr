"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const releases = [
  {
    version: "3.2.0",
    date: "December 15, 2024",
    title: "Enhanced Style Controls",
    type: "feature",
    changes: [
      "New style mixing interface for combining multiple artistic styles",
      "Advanced color palette controls",
      "Improved prompt suggestions based on selected styles",
      "20% faster generation times for complex prompts",
    ],
  },
  {
    version: "3.1.5",
    date: "December 8, 2024",
    title: "Performance Improvements",
    type: "improvement",
    changes: [
      "Reduced API latency by 35%",
      "Better error handling and retry logic",
      "Improved image quality at lower resolutions",
      "Fixed memory leak in batch processing",
    ],
  },
  {
    version: "3.1.0",
    date: "November 28, 2024",
    title: "New Models & API Updates",
    type: "feature",
    changes: [
      "Introduced MATTR-Artistic model optimized for fine art styles",
      "New /v1/models endpoint for listing available models",
      "Webhook support for async generation callbacks",
      "Extended rate limits for Pro users",
    ],
  },
  {
    version: "3.0.0",
    date: "November 15, 2024",
    title: "MATTR 3.0 - Major Release",
    type: "major",
    changes: [
      "Complete rewrite of core generation engine",
      "2x improvement in image quality",
      "New web interface with real-time preview",
      "Team collaboration features",
      "Enterprise SSO support",
      "99.9% uptime SLA",
    ],
  },
]

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
              <span className="w-8 h-px bg-accent" />
              Changelog
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">What's new.</h1>
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
              All the latest updates, improvements, and fixes to MATTR.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Releases */}
      <section className="pb-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[7px] top-0 bottom-0 w-px bg-foreground/10 hidden sm:block" />

            <div className="space-y-16">
              {releases.map((release, index) => (
                <ScrollReveal key={release.version} delay={index * 100}>
                  <div className="relative sm:pl-12">
                    {/* Timeline dot */}
                    <div
                      className={cn(
                        "absolute left-0 w-4 h-4 rounded-full border-4 border-[#FAF8F5] hidden sm:block",
                        release.type === "major" ? "bg-accent" : "bg-foreground/20",
                      )}
                    />

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold",
                          release.type === "major"
                            ? "bg-accent text-white"
                            : release.type === "feature"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-foreground/5 text-foreground",
                        )}
                      >
                        v{release.version}
                      </span>
                      <span className="text-sm text-muted-foreground">{release.date}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">{release.title}</h2>

                    <ul className="space-y-3">
                      {release.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                          <span className="text-muted-foreground">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal>
            <div className="mt-20 pt-12 border-t border-foreground/10 text-center">
              <p className="text-muted-foreground mb-6">Want to see what we're working on next?</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-semibold hover:bg-foreground/90 transition-colors"
              >
                View Roadmap
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
