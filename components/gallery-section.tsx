"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Heart, Download, X, Play, Pause, ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

const galleryItems = [
  {
    id: 1,
    query: "ethereal portrait woman with flowing hair soft golden light dreamy atmosphere professional photography",
    title: "Golden Hour",
    author: "Sarah Chen",
    authorHandle: "@sarahchen",
    likes: 12400,
    category: "Portrait",
    src: "/images/gallery-golden-hour.jpg",
  },
  {
    id: 2,
    query: "futuristic tokyo street night neon lights rain reflections cyberpunk cinematic 4k",
    title: "Neo Tokyo",
    author: "Alex Kim",
    authorHandle: "@alexkim",
    likes: 8900,
    category: "Urban",
    src: "/images/gallery-neo-tokyo.jpg",
  },
  {
    id: 3,
    query: "ancient temple ruins overgrown with moss mystical forest morning fog sunrays through trees",
    title: "Lost Temple",
    author: "Yuki Tanaka",
    authorHandle: "@yukitanaka",
    likes: 15600,
    category: "Fantasy",
    src: "/images/gallery-lost-temple.jpg",
  },
  {
    id: 4,
    query: "abstract liquid chrome metallic organic flowing shapes reflective surface studio lighting",
    title: "Liquid Chrome",
    author: "Chris Wong",
    authorHandle: "@chriswong",
    likes: 21000,
    category: "Abstract",
    src: "/images/gallery-liquid-chrome.jpg",
  },
  {
    id: 5,
    query: "cozy scandinavian living room interior warm lighting minimal furniture indoor plants large windows",
    title: "Nordic Living",
    author: "Emma Davis",
    authorHandle: "@emmadavis",
    likes: 9800,
    category: "Interior",
    src: "/images/gallery-nordic-living.jpg",
  },
  {
    id: 6,
    query: "dramatic mountain landscape stormy sky lightning epic scale cinematic wide angle",
    title: "Storm Peak",
    author: "Marco Rivera",
    authorHandle: "@marcorivera",
    likes: 11200,
    category: "Landscape",
    src: "/images/gallery-storm-peak.jpg",
  },
  {
    id: 7,
    query: "surreal floating islands waterfalls clouds fantasy world magical ethereal dreamscape",
    title: "Sky Islands",
    author: "Luna Park",
    authorHandle: "@lunapark",
    likes: 18300,
    category: "Fantasy",
    src: "/images/gallery-sky-islands.jpg",
  },
  {
    id: 8,
    query: "vintage red classic car convertible desert highway sunset golden hour americana",
    title: "Desert Cruise",
    author: "Jake Wilson",
    authorHandle: "@jakewilson",
    likes: 7600,
    category: "Automotive",
    src: "/images/gallery-desert-cruise.jpg",
  },
]

const categories = ["All", "Portrait", "Urban", "Fantasy", "Abstract", "Interior", "Landscape", "Automotive"]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryItems)[0] | null>(null)
  const [likedImages, setLikedImages] = useState<number[]>([])
  const [activeCategory, setActiveCategory] = useState("All")
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentHighlight, setCurrentHighlight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredItems =
    activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedImages((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const formatLikes = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % galleryItems.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#FAF8F5] bg-noise">
      {/* Hero header */}
      <div className="py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[2px] bg-accent" />
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Gallery</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
                  Made with
                  <br />
                  <span className="text-muted-foreground">MATTR</span>
                </h2>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={200}>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Explore thousands of creations from our community. Every image tells a story of imagination brought to
                life.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Category filter & controls */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <ScrollReveal delay={300}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === cat
                      ? "bg-foreground text-background"
                      : "bg-foreground/5 text-foreground hover:bg-foreground/10",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors text-sm"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isAutoPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-8 mb-16">
        <ScrollReveal delay={400}>
          <div
            className="relative aspect-[21/9] rounded-3xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedImage(galleryItems[currentHighlight])}
          >
            <img
              src={galleryItems[currentHighlight].src}
              alt={galleryItems[currentHighlight].title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <div className="flex items-end justify-between">
                <div>
                  <div className="inline-block px-3 py-1 bg-white/90 rounded-full text-sm font-medium mb-4">
                    {galleryItems[currentHighlight].category}
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {galleryItems[currentHighlight].title}
                  </h3>
                  <p className="text-white/80 text-lg">by {galleryItems[currentHighlight].author}</p>
                </div>
                <div className="hidden lg:flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <span className="font-semibold">{formatLikes(galleryItems[currentHighlight].likes)}</span>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryItems.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentHighlight(i)
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    currentHighlight === i ? "w-8 bg-white" : "w-1.5 bg-white/40",
                  )}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-8 pb-32">
        <ScrollReveal delay={500}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredItems.map((item, i) => (
              <div
                key={item.id}
                className={cn("group cursor-pointer", i === 0 && "md:col-span-2 md:row-span-2")}
                onClick={() => setSelectedImage(item)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-2xl bg-foreground/5",
                    i === 0 ? "aspect-square" : "aspect-[4/5]",
                  )}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all duration-500 flex flex-col justify-between p-5">
                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <button
                        onClick={(e) => toggleLike(item.id, e)}
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                          likedImages.includes(item.id)
                            ? "bg-red-500 text-white"
                            : "bg-white/90 text-foreground hover:bg-white",
                        )}
                      >
                        <Heart className={cn("w-5 h-5", likedImages.includes(item.id) && "fill-current")} />
                      </button>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-white/70 text-sm">{item.authorHandle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={600}>
          <div className="text-center mt-16">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-semibold text-lg hover:shadow-xl transition-all group">
              Explore All Creations
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
        </ScrollReveal>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-foreground/5 hover:bg-foreground/10 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-3 bg-foreground/5">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full aspect-square lg:aspect-auto lg:h-[80vh] object-cover"
                />
              </div>
              <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col">
                <div className="mb-8">
                  <span className="inline-block px-3 py-1 bg-foreground/5 rounded-full text-sm font-medium mb-4">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">{selectedImage.title}</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center font-bold text-lg">
                      {selectedImage.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{selectedImage.author}</p>
                      <p className="text-sm text-muted-foreground">{selectedImage.authorHandle}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Prompt</h4>
                  <p className="text-foreground/80 leading-relaxed text-lg">{selectedImage.query}</p>
                </div>

                <div className="pt-8 border-t border-foreground/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      <span className="font-semibold">{formatLikes(selectedImage.likes)} likes</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 h-14 bg-foreground text-background rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all text-lg">
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                    <button
                      onClick={(e) => toggleLike(selectedImage.id, e)}
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center transition-all",
                        likedImages.includes(selectedImage.id)
                          ? "bg-red-500 text-white"
                          : "bg-foreground/5 hover:bg-foreground/10",
                      )}
                    >
                      <Heart className={cn("w-6 h-6", likedImages.includes(selectedImage.id) && "fill-current")} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
