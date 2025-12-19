"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Check, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  { name: "API", status: "operational", uptime: "99.99%" },
  { name: "Web Application", status: "operational", uptime: "99.98%" },
  { name: "Image Generation", status: "operational", uptime: "99.97%" },
  { name: "Authentication", status: "operational", uptime: "100%" },
  { name: "Dashboard", status: "operational", uptime: "99.99%" },
  { name: "Webhooks", status: "operational", uptime: "99.95%" },
]

const incidents = [
  {
    date: "December 10, 2024",
    title: "Elevated API Latency",
    status: "resolved",
    duration: "23 minutes",
    description: "Some users experienced increased response times. Issue was identified and resolved.",
  },
  {
    date: "November 28, 2024",
    title: "Scheduled Maintenance",
    status: "completed",
    duration: "2 hours",
    description: "Planned maintenance for database upgrades. All services were restored successfully.",
  },
]

const uptimeData = Array.from({ length: 90 }, (_, i) => ({
  day: i,
  status: Math.random() > 0.02 ? "up" : "partial",
}))

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const allOperational = services.every((s) => s.status === "operational")

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
              <span className="w-8 h-px bg-accent" />
              System Status
            </span>

            <div className={cn("p-8 rounded-2xl mb-8", allOperational ? "bg-green-50" : "bg-yellow-50")}>
              <div className="flex items-center gap-4">
                {allOperational ? (
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {allOperational ? "All Systems Operational" : "Partial System Outage"}
                  </h1>
                  <p className="text-muted-foreground mt-1">Last updated: {currentTime.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 90-Day Uptime */}
      <section className="pb-16 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-lg font-bold mb-4">90-Day Uptime</h2>
            <div className="flex gap-0.5">
              {uptimeData.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-10 rounded-sm transition-colors",
                    day.status === "up" ? "bg-green-500" : "bg-yellow-400",
                  )}
                  title={`Day ${90 - i}: ${day.status === "up" ? "100% uptime" : "Partial outage"}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>90 days ago</span>
              <span>Today</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-lg font-bold mb-6">Services</h2>
            <div className="bg-white rounded-2xl overflow-hidden">
              {services.map((service, index) => (
                <div
                  key={service.name}
                  className={cn(
                    "flex items-center justify-between p-5",
                    index !== services.length - 1 && "border-b border-foreground/5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        service.status === "operational" ? "bg-green-500" : "bg-yellow-500",
                      )}
                    />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{service.uptime} uptime</span>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium capitalize",
                        service.status === "operational"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700",
                      )}
                    >
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Incidents */}
      <section className="pb-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-lg font-bold mb-6">Past Incidents</h2>
            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <div key={index} className="p-6 bg-white rounded-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium capitalize",
                        incident.status === "resolved" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700",
                      )}
                    >
                      {incident.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{incident.date}</span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      {incident.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{incident.title}</h3>
                  <p className="text-muted-foreground text-sm">{incident.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
