"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import {
  ArrowRight,
  Copy,
  Check,
  Terminal,
  Zap,
  Shield,
  Globe,
  BookOpen,
  Play,
  ChevronRight,
  ExternalLink,
  Cpu,
  Clock,
  Key,
  Webhook,
  Database,
  Lock,
  Braces,
} from "lucide-react"
import { cn } from "@/lib/utils"

const codeExamples = {
  curl: `curl -X POST https://api.mattr.ai/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "A serene mountain landscape at sunset",
    "style": "photorealistic",
    "width": 1024,
    "height": 1024,
    "num_images": 4
  }'`,
  javascript: `import { MattrAI } from '@mattr/sdk';

const mattr = new MattrAI('YOUR_API_KEY');

const images = await mattr.generate({
  prompt: 'A serene mountain landscape at sunset',
  style: 'photorealistic',
  width: 1024,
  height: 1024,
  numImages: 4
});

console.log(images);`,
  python: `from mattr import MattrAI

client = MattrAI(api_key="YOUR_API_KEY")

images = client.generate(
    prompt="A serene mountain landscape at sunset",
    style="photorealistic",
    width=1024,
    height=1024,
    num_images=4
)

print(images)`,
}

const endpoints = [
  { method: "POST", path: "/v1/generate", description: "Generate images from text", badge: "Popular" },
  { method: "POST", path: "/v1/img2img", description: "Transform existing images", badge: null },
  { method: "POST", path: "/v1/inpaint", description: "Edit specific areas", badge: null },
  { method: "POST", path: "/v1/upscale", description: "Upscale to 4x resolution", badge: "New" },
  { method: "GET", path: "/v1/styles", description: "List available art styles", badge: null },
  { method: "GET", path: "/v1/models", description: "List models and versions", badge: null },
]

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Under 3s response time", stat: "2.8s" },
  { icon: Shield, title: "Enterprise Security", description: "SOC 2 Type II compliant", stat: "99.99%" },
  { icon: Globe, title: "Global CDN", description: "45 edge locations", stat: "45+" },
  { icon: Cpu, title: "Scalable", description: "Auto-scaling infrastructure", stat: "10M+" },
]

const sdks = [
  { name: "JavaScript", version: "v2.4.0", color: "#F7DF1E", bgColor: "#F7DF1E20" },
  { name: "Python", version: "v2.4.0", color: "#3776AB", bgColor: "#3776AB20" },
  { name: "Ruby", version: "v2.3.0", color: "#CC342D", bgColor: "#CC342D20" },
  { name: "Go", version: "v2.2.0", color: "#00ADD8", bgColor: "#00ADD820" },
  { name: "PHP", version: "v2.1.0", color: "#777BB4", bgColor: "#777BB420" },
  { name: "Swift", version: "v1.9.0", color: "#FA7343", bgColor: "#FA734320" },
]

const quickLinks = [
  { icon: Key, title: "Authentication", description: "API keys & OAuth" },
  { icon: Webhook, title: "Webhooks", description: "Real-time callbacks" },
  { icon: Database, title: "Rate Limits", description: "Usage & quotas" },
  { icon: Lock, title: "Security", description: "Best practices" },
]

export default function APIDocsPage() {
  const [activeTab, setActiveTab] = useState<"curl" | "javascript" | "python">("javascript")
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLPreElement>(null)

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <div className="inline-flex items-center gap-3 mb-8">
                  <span className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-bold flex items-center gap-2">
                    <Terminal className="w-4 h-4" />
                    API v2.4
                  </span>
                  <span className="text-sm text-muted-foreground">REST & GraphQL</span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-8">
                  Build with
                  <br />
                  <span className="text-muted-foreground/30">the API.</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed mb-10">
                  World-class AI image generation. Simple endpoints, comprehensive SDKs, enterprise reliability.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/auth?mode=signup">
                    <MagneticButton
                      strength={0.15}
                      className="h-14 px-8 bg-foreground text-background rounded-full font-bold inline-flex items-center justify-center gap-2 group"
                    >
                      Get API Key
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </MagneticButton>
                  </Link>
                  <MagneticButton
                    strength={0.15}
                    className="h-14 px-8 rounded-full font-bold inline-flex items-center justify-center gap-2 border-2 border-foreground/10"
                  >
                    <BookOpen className="w-4 h-4" />
                    Full Docs
                  </MagneticButton>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick Links Grid */}
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {quickLinks.map((link, i) => (
                  <Link
                    key={link.title}
                    href="#"
                    className="group p-6 bg-white rounded-2xl border border-foreground/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold mb-1">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </Link>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <feature.icon className="w-5 h-5 text-accent" />
                    <span className="text-2xl font-black">{feature.stat}</span>
                  </div>
                  <p className="text-sm text-background/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Code Example - Enhanced */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Start in minutes</h2>
              <p className="text-lg text-muted-foreground">Copy, paste, generate. It's that simple.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-[#0d0d0d] rounded-3xl overflow-hidden shadow-2xl">
              {/* Window Controls */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex gap-1">
                  {(["javascript", "python", "curl"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
                        activeTab === tab ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70",
                      )}
                    >
                      {tab === "curl" ? "cURL" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              {/* Code */}
              <div className="p-6 overflow-x-auto">
                <pre ref={codeRef} className="text-sm text-white/80 font-mono leading-relaxed">
                  <code>{codeExamples[activeTab]}</code>
                </pre>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4 text-sm text-white/40">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    200 OK
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    ~2.8s
                  </span>
                </div>
                <button className="text-sm text-accent hover:underline flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  Run in playground
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-20 px-6 lg:px-8 bg-foreground/[0.02]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">Endpoints</h2>
                <p className="text-muted-foreground">Everything you need to generate, transform, and manage images</p>
              </div>
              <Link href="#" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
                Full reference
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="bg-white rounded-2xl border border-foreground/5 overflow-hidden divide-y divide-foreground/5">
              {endpoints.map((endpoint) => (
                <Link
                  key={endpoint.path}
                  href="#"
                  className="flex items-center justify-between p-5 hover:bg-foreground/[0.01] transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold font-mono",
                        endpoint.method === "POST"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-blue-500/10 text-blue-600",
                      )}
                    >
                      {endpoint.method}
                    </span>
                    <div>
                      <p className="font-mono text-sm font-bold">{endpoint.path}</p>
                      <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {endpoint.badge && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-bold rounded-full">
                        {endpoint.badge}
                      </span>
                    )}
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">Official SDKs</h2>
                <p className="text-muted-foreground">Type-safe SDKs maintained by the MATTR team</p>
              </div>
              <Link href="#" className="text-sm font-medium text-accent hover:underline flex items-center gap-1">
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sdks.map((sdk) => (
                <Link
                  key={sdk.name}
                  href="#"
                  className="group p-6 bg-white rounded-2xl border border-foreground/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: sdk.bgColor }}
                  >
                    <Braces className="w-6 h-6" style={{ color: sdk.color }} />
                  </div>
                  <p className="font-bold mb-0.5">{sdk.name}</p>
                  <p className="text-xs text-muted-foreground">{sdk.version}</p>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Ready to build?</h2>
            <p className="text-lg text-background/60 mb-10 max-w-xl mx-auto">
              Get your API key in seconds. Start with 1,000 free credits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?mode=signup">
                <MagneticButton
                  strength={0.15}
                  className="h-14 px-10 bg-background text-foreground rounded-full font-bold inline-flex items-center justify-center gap-2 group"
                >
                  Get Started Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
              </Link>
              <Link href="/contact">
                <MagneticButton
                  strength={0.15}
                  className="h-14 px-10 rounded-full font-bold inline-flex items-center justify-center gap-2 border-2 border-background/20"
                >
                  Contact Sales
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
