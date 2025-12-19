"use client"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Download, ArrowUpRight, Mail } from "lucide-react"

const pressReleases = [
  {
    date: "December 15, 2024",
    title: "MATTR Launches 3.0 with Revolutionary AI Image Quality",
    source: "Company Announcement",
  },
  {
    date: "November 15, 2024",
    title: "MATTR Raises $50M Series B Led by Sequoia Capital",
    source: "TechCrunch",
  },
  {
    date: "October 1, 2024",
    title: "MATTR Partners with Adobe for Creative Cloud Integration",
    source: "The Verge",
  },
  {
    date: "August 20, 2024",
    title: "MATTR Reaches 10 Million Users Milestone",
    source: "Company Announcement",
  },
]

const coverage = [
  { outlet: "TechCrunch", logo: "TC" },
  { outlet: "The Verge", logo: "V" },
  { outlet: "Wired", logo: "W" },
  { outlet: "Forbes", logo: "F" },
  { outlet: "Bloomberg", logo: "B" },
  { outlet: "Fast Company", logo: "FC" },
]

const assets = [
  { name: "Logo Pack", format: "ZIP", size: "2.4 MB" },
  { name: "Brand Guidelines", format: "PDF", size: "8.1 MB" },
  { name: "Product Screenshots", format: "ZIP", size: "15.2 MB" },
  { name: "Executive Photos", format: "ZIP", size: "12.8 MB" },
]

export default function PressPage() {
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
                Press Kit
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                MATTR in
                <br />
                <span className="text-muted-foreground">the news.</span>
              </h1>
              <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Download brand assets, read press releases, and get in touch with our communications team.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Press Contact */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="p-8 bg-foreground text-background rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Press Inquiries</h2>
                <p className="text-background/60">For media inquiries, interviews, or speaking requests.</p>
              </div>
              <a
                href="mailto:press@mattr.ai"
                className="px-6 py-3 bg-background text-foreground rounded-xl font-semibold hover:bg-background/90 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                press@mattr.ai
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Coverage */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-8">Featured In</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
              {coverage.map((item) => (
                <div key={item.outlet} className="aspect-square bg-white rounded-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground/30">{item.logo}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-24 px-6 lg:px-8 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-8">Press Releases</h2>
          </ScrollReveal>

          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <ScrollReveal key={index} delay={index * 75}>
                <a href="#">
                  <div className="group p-6 bg-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover-lift cursor-pointer">
                    <div>
                      <span className="text-sm text-muted-foreground">
                        {release.date} · {release.source}
                      </span>
                      <h3 className="text-lg font-bold mt-1 group-hover:text-accent transition-colors">
                        {release.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-8">Brand Assets</h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {assets.map((asset, index) => (
              <ScrollReveal key={asset.name} delay={index * 75}>
                <div className="group p-6 bg-white rounded-2xl hover-lift cursor-pointer">
                  <div className="w-full aspect-[4/3] bg-foreground/5 rounded-xl mb-4 flex items-center justify-center">
                    <Download className="w-8 h-8 text-foreground/20" />
                  </div>
                  <h3 className="font-bold group-hover:text-accent transition-colors">{asset.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {asset.format} · {asset.size}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-24 px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">About MATTR</h2>
                <p className="text-background/60 leading-relaxed mb-6">
                  MATTR is the leading AI image generation platform, empowering millions of creators and enterprises to
                  bring their ideas to life. Founded in 2021, MATTR has raised over $50 million from top-tier investors
                  and serves customers in over 150 countries.
                </p>
                <p className="text-background/60 leading-relaxed">
                  Our mission is to democratize creativity through artificial intelligence, making professional-quality
                  visual creation accessible to everyone.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-4xl font-bold">2021</span>
                  <p className="text-background/40 mt-1">Founded</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">150+</span>
                  <p className="text-background/40 mt-1">Team Members</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">$50M</span>
                  <p className="text-background/40 mt-1">Total Raised</p>
                </div>
                <div>
                  <span className="text-4xl font-bold">10M+</span>
                  <p className="text-background/40 mt-1">Users</p>
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
