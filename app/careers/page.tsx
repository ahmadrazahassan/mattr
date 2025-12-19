"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowRight, MapPin, Clock, Building, Laptop, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const benefits = [
  { icon: Laptop, title: "Remote First", description: "Work from anywhere in the world" },
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health coverage" },
  { icon: Building, title: "Equity", description: "Ownership in what you build" },
]

const departments = ["All", "Engineering", "Design", "Product", "Marketing", "Operations"]

const openings = [
  { title: "Senior Frontend Engineer", department: "Engineering", location: "Remote", type: "Full-time" },
  { title: "ML Research Engineer", department: "Engineering", location: "San Francisco", type: "Full-time" },
  { title: "Senior Product Designer", department: "Design", location: "Remote", type: "Full-time" },
  { title: "Product Manager, AI", department: "Product", location: "New York", type: "Full-time" },
  { title: "Growth Marketing Lead", department: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Backend Engineer", department: "Engineering", location: "London", type: "Full-time" },
  { title: "Design Systems Engineer", department: "Design", location: "Remote", type: "Full-time" },
  { title: "Technical Writer", department: "Product", location: "Remote", type: "Contract" },
]

export default function CareersPage() {
  const [activeDepartment, setActiveDepartment] = useState("All")

  const filteredOpenings = openings.filter((job) => activeDepartment === "All" || job.department === activeDepartment)

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
                Careers
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                Build the future
                <br />
                <span className="text-muted-foreground">of creativity.</span>
              </h1>
              <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Join a team of world-class engineers, designers, and researchers pushing the boundaries of AI-powered
                creation.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-16 grid sm:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="p-6 bg-white rounded-2xl">
                  <benefit.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Culture */}
      <section className="py-24 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-background/40 mb-6 block">
                Our Culture
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-8">
                Where ambition meets impact.
              </h2>
              <p className="text-lg text-background/60 leading-relaxed mb-8">
                We're a diverse team of builders, dreamers, and doers united by a shared mission: making creative
                expression accessible to everyone. We move fast, think big, and always put our users first.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Remote-first", "Async communication", "Unlimited PTO", "Learning budget"].map((perk) => (
                  <span key={perk} className="px-4 py-2 bg-background/10 rounded-full text-sm">
                    {perk}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <Image src="/modern-office-workspace-creative-minimal.jpg" alt="Office" fill className="object-cover" />
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-8">
                  <Image src="/team-collaboration-meeting-diverse-tech.jpg" alt="Team" fill className="object-cover" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
                  <span className="w-8 h-px bg-accent" />
                  Open Positions
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Join the team.</h2>
              </div>
              <p className="text-muted-foreground">
                {filteredOpenings.length} open position{filteredOpenings.length !== 1 ? "s" : ""}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-wrap gap-2 mb-12">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDepartment(dept)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    activeDepartment === dept
                      ? "bg-foreground text-background"
                      : "bg-foreground/5 text-foreground hover:bg-foreground/10",
                  )}
                >
                  {dept}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {filteredOpenings.map((job, index) => (
              <ScrollReveal key={job.title} delay={index * 50}>
                <Link href="/contact">
                  <div className="group p-6 bg-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-lift cursor-pointer">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-accent transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="w-3.5 h-3.5" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {filteredOpenings.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No open positions in this department right now.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
