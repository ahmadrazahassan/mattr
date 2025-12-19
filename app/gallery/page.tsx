"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { X, Heart, Download, Share2, ArrowUpRight, Search, SlidersHorizontal, TrendingUp, Clock, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Portraits", "Landscapes", "Abstract", "Fantasy", "Sci-Fi", "Architecture", "Nature"]

const sortOptions = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "popular", label: "Most Liked", icon: Heart },
]

const galleryItems = [
  { id: 1, title: "Ethereal Dreams", author: "Sarah Chen", category: "Abstract", likes: 2847, views: 12400, featured: true },
  { id: 2, title: "Neon Tokyo", author: "Marcus Kim", category: "Sci-Fi", likes: 1923, views: 8900 },
  { id: 3, title: "Mountain Serenity", author: "Elena Voss", category: "Landscapes", likes: 3201, views: 15200 },
  { id: 4, title: "Digital Goddess", author: "Alex Rivera", category: "Portraits", likes: 4502, views: 18700 },
  { id: 5, title: "Floating Islands", author: "James Liu", category: "Fantasy", likes: 2156, views: 9800 },
  { id: 6, title: "Brutalist Dawn", author: "Nina Petrov", category: "Architecture", likes: 1847, views: 7600 },
  { id: 7, title: "Bioluminescent Forest", author: "Tom Wilson", category: "Nature", likes: 2934, views: 11300 },
  { id: 8, title: "Cosmic Dancer", author: "Maya Singh", category: "Abstract", likes: 3567, views: 14200 },
  { id: 9, title: "Cyberpunk Alley", author: "Ryan Park", category: "Sci-Fi", likes: 2089, views: 9100 },
  { id: 10, title: "Ancient Temple", author: "Lisa Chang", category: "Fantasy", likes: 2678, views: 10500 },
  { id: 11, title: "Arctic Aurora", author: "Erik Larsson", category: "Landscapes", likes: 3892, views: 16800 },
  { id: 12, title: "Glass Cathedral", author: "Anna Weber", category: "Architecture", likes: 1567, views: 6900 },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeSortOption, setActiveSortOption] = useState("trending")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedImages((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <ScrollReveal>
            <div className="max-w-4xl mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-[#b45309]" />
                <span className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
                  Community Gallery
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                Discover
                <br />
                <span className="text-muted-foreground/30">incredible art.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Explore millions of AI-generated masterpieces from creators worldwide.
              </p>
            </div>
          </ScrollReveal>

          {/* Search & Sort */}
          <ScrollReveal delay={100}>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artworks, artists..."
                  className="w-full h-14 pl-14 pr-5 bg-white border border-foreground/10 rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#b45309] focus:ring-2 focus:ring-[#b45309]/10 transition-all duration-300"
                />
              </div>
              
              <div className="flex items-center gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveSortOption(option.id)}
                    className={cn(
                      "h-14 px-5 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center gap-2",
                      activeSortOption === option.id
                        ? "bg-[#b45309] text-white shadow-lg shadow-[#b45309]/20"
                        : "bg-white border border-foreground/10 hover:bg-foreground/5",
                    )}
                  >
                    <option.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{option.label}</span>
                  </button>
                ))}
                <button className="h-14 px-5 bg-white border border-foreground/10 rounded-2xl flex items-center gap-2 text-sm font-medium hover:bg-foreground/5 transition-colors duration-300">
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Categories */}
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category
                      ? "bg-foreground text-background"
                      : "bg-white border border-foreground/10 text-foreground hover:bg-foreground/5",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-32 px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 30}>
                <div
                  onClick={() => setSelectedImage(item)}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-2xl bg-white border border-foreground/10 shadow-sm hover:shadow-xl transition-all duration-500",
                    item.featured && "sm:col-span-2 sm:row-span-2",
                  )}
                >
                  <div className={cn("relative w-full", item.featured ? "aspect-square" : "aspect-[3/4]")}>
                    <Image
                      src={`/generic-placeholder-icon.png?height=${item.featured ? 800 : 600}&width=${item.featured ? 800 : 450}&query=${encodeURIComponent(item.title + " " + item.category + " digital art masterpiece")}`}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Quick actions on hover */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        className={cn(
                          "w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-300",
                          likedImages.has(item.id)
                            ? "bg-[#b45309] text-white"
                            : "bg-white/20 text-white hover:bg-white/30",
                        )}
                      >
                        <Heart className={cn("w-4 h-4", likedImages.has(item.id) && "fill-current")} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors text-white"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className={cn("font-semibold mb-1 line-clamp-1", item.featured ? "text-lg" : "text-base")}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">by {item.author}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5" />
                          {item.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {(item.views / 1000).toFixed(1)}k
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-foreground/5 rounded-lg text-[10px] font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Load More */}
          <ScrollReveal>
            <div className="mt-16 text-center">
              <button className="px-8 py-4 bg-[#b45309] text-white rounded-full font-semibold hover:bg-[#92400e] transition-colors duration-300 shadow-lg shadow-[#b45309]/20">
                Load More Artworks
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div
            className="max-w-6xl w-full grid lg:grid-cols-[1fr,420px] gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-foreground/20">
              <Image
                src={`/.jpg?height=1000&width=1000&query=${encodeURIComponent(selectedImage.title + " " + selectedImage.category + " digital art masterpiece high detail")}`}
                alt={selectedImage.title}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Details */}
            <div className="text-white flex flex-col bg-white/5 backdrop-blur-md rounded-3xl p-8">
              <span className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">{selectedImage.category}</span>
              <h2 className="text-3xl font-bold mb-2">{selectedImage.title}</h2>
              <p className="text-white/60 mb-6">by {selectedImage.author}</p>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-white/60" />
                  <span className="font-semibold">{selectedImage.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-white/60" />
                  <span className="font-semibold">{(selectedImage.views / 1000).toFixed(1)}k</span>
                </div>
              </div>

              <div className="flex gap-3 mb-8">
                <button className="flex-1 h-12 bg-[#b45309] text-white rounded-xl font-semibold hover:bg-[#92400e] transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button
                  onClick={(e) => toggleLike(selectedImage.id, e)}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                    likedImages.has(selectedImage.id)
                      ? "bg-[#b45309] text-white"
                      : "bg-white/10 hover:bg-white/20",
                  )}
                >
                  <Heart className={cn("w-5 h-5", likedImages.has(selectedImage.id) && "fill-current")} />
                </button>
                <button className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-sm text-white/40 mb-4">Created with MATTR AI</p>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#b45309] hover:text-[#92400e] transition-colors"
                >
                  Create similar artwork
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
