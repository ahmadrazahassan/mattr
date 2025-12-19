"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Product", "Engineering", "Design", "Company", "Tutorials"]

const posts = [
  {
    id: 1,
    title: "Introducing MATTR 3.0: The Future of AI Image Generation",
    excerpt:
      "We're excited to announce the biggest update to MATTR yet, featuring breakthrough improvements in quality, speed, and creative control.",
    category: "Product",
    author: "Alexandra Chen",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "How We Scaled to 10 Million Images Per Day",
    excerpt:
      "A deep dive into the infrastructure challenges we faced and how we built a system that handles massive scale.",
    category: "Engineering",
    author: "Marcus Williams",
    date: "Dec 10, 2024",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "The Design Philosophy Behind MATTR",
    excerpt: "Why we believe simplicity is the ultimate sophistication in AI tools.",
    category: "Design",
    author: "David Mueller",
    date: "Dec 5, 2024",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Building Ethical AI: Our Approach",
    excerpt: "How we're ensuring responsible AI development while pushing the boundaries of creativity.",
    category: "Company",
    author: "Priya Patel",
    date: "Nov 28, 2024",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Mastering Style Transfer with MATTR",
    excerpt: "A comprehensive guide to creating stunning art by combining different artistic styles.",
    category: "Tutorials",
    author: "Sarah Kim",
    date: "Nov 20, 2024",
    readTime: "10 min read",
  },
  {
    id: 6,
    title: "Our Series B: What's Next for MATTR",
    excerpt: "Announcing our $50M Series B and our vision for the future of creative AI.",
    category: "Company",
    author: "Alexandra Chen",
    date: "Nov 15, 2024",
    readTime: "4 min read",
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = posts.filter((post) => activeCategory === "All" || post.category === activeCategory)

  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-6">
                <span className="w-8 h-px bg-accent" />
                Blog
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                Insights &
                <br />
                <span className="text-muted-foreground">updates.</span>
              </h1>
              <p className="mt-8 text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Stories from the team building the future of AI-powered creativity.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-12 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category
                      ? "bg-foreground text-background"
                      : "bg-foreground/5 text-foreground hover:bg-foreground/10",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && activeCategory === "All" && (
        <section className="pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <Link href={`/blog/${featuredPost.id}`}>
                <div className="group grid lg:grid-cols-2 gap-8 p-8 bg-foreground text-background rounded-3xl hover-lift cursor-pointer">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                    <Image
                      src="/ai-technology-futuristic-abstract-visualization.jpg"
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-background/40 mb-4">
                      Featured
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-background/60 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-background/40">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {featuredPost.author}
                      </span>
                      <span>{featuredPost.date}</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="pb-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 75}>
                <Link href={`/blog/${post.id}`}>
                  <article className="group bg-white rounded-2xl overflow-hidden hover-lift cursor-pointer h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={`/.jpg?height=300&width=480&query=${encodeURIComponent(post.title + " abstract minimal")}`}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-16 text-center">
              <button className="px-8 py-4 bg-foreground/5 text-foreground rounded-full font-semibold hover:bg-foreground/10 transition-colors duration-300">
                Load More Posts
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
