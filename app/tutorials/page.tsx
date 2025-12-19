"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import {
  Play,
  Clock,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Search,
  Users,
  Palette,
  Code,
  FileText,
  Layers,
  Video,
  GraduationCap,
  Lightbulb,
  Rocket,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Getting Started", "Advanced", "API", "Workflows", "Tips & Tricks"]

const featuredTutorial = {
  title: "Master AI Image Generation",
  description: "Everything you need to create stunning visuals. From basic prompts to advanced techniques.",
  duration: "32 min",
  level: "Beginner",
  author: "MATTR Team",
  views: "45.2K",
}

const tutorials = [
  {
    id: 1,
    title: "Crafting the Perfect Prompt",
    description: "Learn the art of prompt engineering for better results",
    category: "Getting Started",
    duration: "12 min",
    type: "video",
    level: "Beginner",
    views: "28.4K",
  },
  {
    id: 2,
    title: "Style Transfer Deep Dive",
    description: "Transform images with any artistic style",
    category: "Advanced",
    duration: "18 min",
    type: "video",
    level: "Intermediate",
    views: "15.7K",
  },
  {
    id: 3,
    title: "API Integration Guide",
    description: "Build AI-powered features into your app",
    category: "API",
    duration: "25 min",
    type: "article",
    level: "Advanced",
    views: "12.3K",
  },
  {
    id: 4,
    title: "Batch Processing Workflows",
    description: "Generate hundreds of images efficiently",
    category: "Workflows",
    duration: "15 min",
    type: "video",
    level: "Intermediate",
    views: "9.8K",
  },
  {
    id: 5,
    title: "Consistency in Character Design",
    description: "Create consistent characters across images",
    category: "Advanced",
    duration: "22 min",
    type: "video",
    level: "Advanced",
    views: "21.5K",
  },
  {
    id: 6,
    title: "Negative Prompts Explained",
    description: "What to avoid and how to use negative prompts",
    category: "Tips & Tricks",
    duration: "8 min",
    type: "article",
    level: "Beginner",
    views: "34.1K",
  },
  {
    id: 7,
    title: "Inpainting Mastery",
    description: "Edit specific areas of your images seamlessly",
    category: "Advanced",
    duration: "20 min",
    type: "video",
    level: "Intermediate",
    views: "18.9K",
  },
  {
    id: 8,
    title: "Setting Up Webhooks",
    description: "Get notified when generations complete",
    category: "API",
    duration: "10 min",
    type: "article",
    level: "Advanced",
    views: "6.2K",
  },
]

const learningPaths = [
  {
    title: "Creative Fundamentals",
    description: "Master the basics of AI generation",
    icon: Palette,
    lessons: 8,
    duration: "2 hours",
    color: "#f59e0b",
  },
  {
    title: "Developer Track",
    description: "Build apps with the MATTR API",
    icon: Code,
    lessons: 12,
    duration: "4 hours",
    color: "#3b82f6",
  },
  {
    title: "Advanced Techniques",
    description: "Take your creations to the next level",
    icon: Layers,
    lessons: 10,
    duration: "3 hours",
    color: "#8b5cf6",
  },
]

export default function TutorialsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesCategory = activeCategory === "All" || tutorial.category === activeCategory
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-bold flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Learn
                </span>
                <span className="text-sm text-muted-foreground">50+ tutorials</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-6">
                Tutorials<span className="text-accent">.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                From beginner guides to advanced techniques. Everything you need to master AI image generation.
              </p>
            </div>
          </ScrollReveal>

          {/* Featured Tutorial */}
          <ScrollReveal delay={100}>
            <Link href="#" className="block group">
              <div className="relative rounded-3xl overflow-hidden bg-foreground">
                <div className="absolute inset-0">
                  <Image
                    src="/ai-image-generation-tutorial-dark-modern-interface.jpg"
                    alt="Featured tutorial"
                    fill
                    className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[400px] flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold flex items-center gap-1.5">
                      <Lightbulb className="w-3 h-3" />
                      Featured
                    </span>
                    <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold flex items-center gap-1.5">
                      <Video className="w-3 h-3" />
                      {featuredTutorial.duration}
                    </span>
                    <span className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                      {featuredTutorial.level}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 max-w-2xl">
                    {featuredTutorial.title}
                  </h2>
                  <p className="text-white/70 text-lg mb-6 max-w-xl">{featuredTutorial.description}</p>
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 text-white/60 text-sm">
                      <Eye className="w-4 h-4" />
                      {featuredTutorial.views} views
                    </span>
                    <span className="flex items-center gap-2 text-white font-bold group-hover:gap-3 transition-all">
                      Watch Now
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                {/* Play button overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black mb-2">Learning Paths</h2>
                <p className="text-muted-foreground">Structured courses to master specific skills</p>
              </div>
              <Link href="#" className="text-sm font-bold text-accent hover:underline flex items-center gap-1">
                View all
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid md:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <Link
                  key={path.title}
                  href="#"
                  className="group p-8 bg-white rounded-2xl border border-foreground/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center"
                    style={{ backgroundColor: `${path.color}15` }}
                  >
                    <path.icon className="w-6 h-6" style={{ color: path.color }} />
                  </div>
                  <h3 className="text-xl font-black mb-2">{path.title}</h3>
                  <p className="text-muted-foreground mb-6">{path.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      {path.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {path.duration}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* All Tutorials */}
      <section className="py-16 px-6 lg:px-8 bg-foreground/[0.02]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-black mb-8">All Tutorials</h2>
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tutorials..."
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
                        : "bg-white border border-foreground/10 hover:bg-foreground/5",
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tutorial Grid */}
          <ScrollReveal delay={200}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTutorials.map((tutorial) => (
                <Link
                  key={tutorial.id}
                  href="#"
                  className="group bg-white rounded-2xl border border-foreground/5 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-video relative bg-foreground/5">
                    <Image
                      src={`/.jpg?key=zos3f&height=200&width=350&query=${encodeURIComponent(tutorial.title + " tutorial dark modern")}`}
                      alt={tutorial.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                        {tutorial.type === "video" ? (
                          <Play className="w-5 h-5 text-foreground ml-0.5" />
                        ) : (
                          <FileText className="w-5 h-5 text-foreground" />
                        )}
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold">
                        {tutorial.level}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 bg-foreground/80 backdrop-blur-sm rounded-lg text-xs font-bold text-white flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tutorial.duration}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-accent mb-2 block">{tutorial.category}</span>
                    <h3 className="font-black mb-2 line-clamp-2">{tutorial.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{tutorial.description}</p>
                    <div className="mt-4 pt-4 border-t border-foreground/5 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {tutorial.views}
                      </span>
                      <span className="flex items-center gap-1 text-accent font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        {tutorial.type === "video" ? "Watch" : "Read"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-black mb-4">Can't find what you need?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Request a tutorial topic or join our community for help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                strength={0.15}
                className="h-14 px-8 bg-foreground text-background rounded-full font-bold inline-flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                Request Tutorial
              </MagneticButton>
              <MagneticButton
                strength={0.15}
                className="h-14 px-8 rounded-full font-bold inline-flex items-center justify-center gap-2 border-2 border-foreground/10"
              >
                <Users className="w-4 h-4" />
                Join Community
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
