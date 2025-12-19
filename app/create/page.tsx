"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import {
  Wand2,
  ImageIcon,
  Download,
  Share2,
  RefreshCw,
  ChevronDown,
  Heart,
  Copy,
  Check,
  History,
  Grid3X3,
  Layers,
  Plus,
  Minus,
  Camera,
  Aperture,
  Paintbrush,
  Mountain,
  Palette,
  Pencil,
  Building,
  Square,
  RectangleHorizontal,
  RectangleVertical,
  Monitor,
  Smartphone,
  Settings,
  Save,
  FolderOpen,
  Lightbulb,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stylePresets = [
  { id: "photorealistic", label: "Photo", icon: Camera },
  { id: "digital-art", label: "Digital", icon: Palette },
  { id: "oil-painting", label: "Oil Paint", icon: Paintbrush },
  { id: "watercolor", label: "Watercolor", icon: Aperture },
  { id: "3d-render", label: "3D", icon: Building },
  { id: "pencil-sketch", label: "Sketch", icon: Pencil },
  { id: "landscape", label: "Landscape", icon: Mountain },
]

const aspectRatios = [
  { id: "1:1", label: "1:1", icon: Square },
  { id: "16:9", label: "16:9", icon: RectangleHorizontal },
  { id: "9:16", label: "9:16", icon: RectangleVertical },
  { id: "4:3", label: "4:3", icon: Monitor },
  { id: "3:4", label: "3:4", icon: Smartphone },
]

const quickPrompts = [
  "Majestic dragon over ancient mountains",
  "Cyberpunk street with neon lights",
  "Portrait of a warrior in golden armor",
  "Serene Japanese garden with cherry blossoms",
]

const generatedImages = [
  { id: 1, prompt: "Ethereal forest spirit", style: "Digital Art" },
  { id: 2, prompt: "Futuristic cityscape", style: "Cyberpunk" },
  { id: 3, prompt: "Mountain lake reflection", style: "Photorealistic" },
  { id: 4, prompt: "Ancient temple ruins", style: "Oil Painting" },
]

export default function CreatePage() {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("photorealistic")
  const [selectedRatio, setSelectedRatio] = useState("1:1")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [generationCount, setGenerationCount] = useState(4)
  const [cfgScale, setCfgScale] = useState(7)
  const [steps, setSteps] = useState(30)
  const [seed, setSeed] = useState("")
  const [copied, setCopied] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setSelectedImage(0)
    }, 3000)
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [prompt])

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <Navigation />

      <div className="pt-24 pb-12">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-8">
          {/* Header */}
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">
                  Studio<span className="text-[#b45309]">.</span>
                </h1>
                <p className="text-muted-foreground">AI-powered image generation workspace</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="h-10 px-4 rounded-xl bg-white border border-foreground/10 text-sm font-medium flex items-center gap-2 hover:bg-foreground/5 transition-colors">
                  <FolderOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Projects</span>
                </button>
                <button className="h-10 px-4 rounded-xl bg-white border border-foreground/10 text-sm font-medium flex items-center gap-2 hover:bg-foreground/5 transition-colors">
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">History</span>
                </button>
                <button className="h-10 px-4 rounded-xl bg-[#b45309] text-white text-sm font-medium flex items-center gap-2 hover:bg-[#92400e] transition-colors">
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-[380px,1fr] gap-6">
            {/* Left Panel - Controls */}
            <ScrollReveal delay={100}>
              <div className="space-y-4">
                {/* Prompt Card */}
                <div className="bg-white rounded-2xl border border-foreground/10 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-foreground/10 flex items-center justify-between">
                    <span className="text-sm font-semibold">Prompt</span>
                    <button
                      onClick={handleCopyPrompt}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="p-5">
                    <textarea
                      ref={textareaRef}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe what you want to create..."
                      className="w-full min-h-[120px] resize-none bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
                    />
                  </div>
                  {/* Quick prompts */}
                  <div className="px-5 pb-5 border-t border-foreground/5 pt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-3">Quick start</p>
                    <div className="flex flex-wrap gap-2">
                      {quickPrompts.map((p, i) => (
                        <button
                          key={i}
                          onClick={() => setPrompt(p)}
                          className="px-3 py-1.5 text-xs bg-foreground/5 rounded-lg hover:bg-foreground/10 transition-colors"
                        >
                          {p.slice(0, 30)}...
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Style Selection */}
                <div className="bg-white rounded-2xl border border-foreground/10 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-foreground/10">
                    <span className="text-sm font-semibold">Style</span>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-3 gap-2">
                      {stylePresets.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300",
                            selectedStyle === style.id
                              ? "bg-[#b45309] text-white shadow-lg shadow-[#b45309]/20"
                              : "bg-foreground/5 hover:bg-foreground/10",
                          )}
                        >
                          <style.icon className="w-5 h-5" />
                          <span className="text-[10px] font-medium text-center leading-tight">{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Aspect Ratio */}
                <div className="bg-white rounded-2xl border border-foreground/10 overflow-hidden shadow-sm">
                  <div className="p-5 border-b border-foreground/10">
                    <span className="text-sm font-semibold">Aspect Ratio</span>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-5 gap-2">
                      {aspectRatios.map((ratio) => (
                        <button
                          key={ratio.id}
                          onClick={() => setSelectedRatio(ratio.id)}
                          className={cn(
                            "flex flex-col items-center gap-2 py-3 rounded-xl transition-all duration-300",
                            selectedRatio === ratio.id
                              ? "bg-[#b45309] text-white"
                              : "bg-foreground/5 hover:bg-foreground/10",
                          )}
                        >
                          <ratio.icon className="w-4 h-4" />
                          <span className="text-[10px] font-medium">{ratio.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="bg-white rounded-2xl border border-foreground/10 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full p-5 flex items-center justify-between hover:bg-foreground/[0.01] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-semibold">Advanced Settings</span>
                    </div>
                    <ChevronDown
                      className={cn("w-4 h-4 transition-transform duration-300", showAdvanced && "rotate-180")}
                    />
                  </button>

                  {showAdvanced && (
                    <div className="px-5 pb-5 space-y-5 border-t border-foreground/10 pt-5">
                      {/* Image Count */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-xs font-medium">Number of images</label>
                          <span className="text-xs font-bold bg-[#b45309]/10 text-[#b45309] px-2.5 py-1 rounded-lg">
                            {generationCount}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setGenerationCount(Math.max(1, generationCount - 1))}
                            className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="range"
                            min="1"
                            max="8"
                            value={generationCount}
                            onChange={(e) => setGenerationCount(Number(e.target.value))}
                            className="flex-1 h-2 bg-foreground/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#b45309]"
                          />
                          <button
                            onClick={() => setGenerationCount(Math.min(8, generationCount + 1))}
                            className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* CFG Scale */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-xs font-medium">Guidance scale</label>
                          <span className="text-xs font-bold bg-foreground/5 px-2.5 py-1 rounded-lg">{cfgScale}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          value={cfgScale}
                          onChange={(e) => setCfgScale(Number(e.target.value))}
                          className="w-full h-2 bg-foreground/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#b45309]"
                        />
                      </div>

                      {/* Steps */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="text-xs font-medium">Steps</label>
                          <span className="text-xs font-bold bg-foreground/5 px-2.5 py-1 rounded-lg">{steps}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          value={steps}
                          onChange={(e) => setSteps(Number(e.target.value))}
                          className="w-full h-2 bg-foreground/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#b45309]"
                        />
                      </div>

                      {/* Seed */}
                      <div>
                        <label className="text-xs font-medium mb-2 block">Seed (optional)</label>
                        <input
                          type="text"
                          value={seed}
                          onChange={(e) => setSeed(e.target.value)}
                          placeholder="Random"
                          className="w-full h-10 px-4 bg-foreground/5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b45309]/20"
                        />
                      </div>

                      {/* Negative Prompt */}
                      <div>
                        <label className="text-xs font-medium mb-2 block">Negative prompt</label>
                        <textarea
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                          placeholder="What to avoid..."
                          className="w-full h-20 p-4 bg-foreground/5 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#b45309]/20"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className={cn(
                    "w-full h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-lg",
                    prompt.trim() && !isGenerating
                      ? "bg-[#b45309] text-white hover:bg-[#92400e] shadow-[#b45309]/20"
                      : "bg-foreground/10 text-muted-foreground cursor-not-allowed shadow-none",
                  )}
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Images
                    </>
                  )}
                </button>

                {/* Tip Card */}
                <div className="bg-[#b45309]/5 rounded-2xl p-4 border border-[#b45309]/10">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#b45309]/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-[#b45309]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-1">Pro Tip</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Be specific about lighting, mood, and composition for better results.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>


            {/* Right Panel - Canvas */}
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-2xl border border-foreground/10 overflow-hidden shadow-sm min-h-[800px] flex flex-col">
                {/* Canvas Header */}
                <div className="p-5 border-b border-foreground/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">Canvas</span>
                    {!isGenerating && generatedImages.length > 0 && (
                      <span className="text-xs text-muted-foreground px-3 py-1 bg-foreground/5 rounded-full font-medium">
                        {generationCount} results
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="w-9 h-9 rounded-lg hover:bg-foreground/5 flex items-center justify-center transition-colors">
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 relative bg-foreground/[0.02] p-6">
                  {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full border-4 border-foreground/5 border-t-[#b45309] animate-spin" />
                        <Wand2 className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#b45309]" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold mb-2">Creating your masterpiece</p>
                        <p className="text-sm text-muted-foreground">This usually takes 3-8 seconds</p>
                      </div>
                      <div className="w-64 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-[#b45309] rounded-full animate-pulse" />
                      </div>
                    </div>
                  ) : generatedImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 h-full">
                      {generatedImages.map((img, index) => (
                        <div
                          key={img.id}
                          onClick={() => setSelectedImage(index)}
                          className={cn(
                            "relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 aspect-square",
                            selectedImage === index
                              ? "ring-4 ring-[#b45309] ring-offset-4"
                              : "hover:ring-2 hover:ring-foreground/20 hover:ring-offset-2",
                          )}
                        >
                          <Image
                            src={`/.jpg?height=512&width=512&query=${encodeURIComponent(img.prompt + " " + img.style + " artistic high quality")}`}
                            alt={img.prompt}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex gap-2">
                                <button className="flex-1 h-10 bg-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                                  <Download className="w-4 h-4" />
                                  Download
                                </button>
                                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors">
                                  <Heart className="w-5 h-5 text-white" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {selectedImage === index && (
                            <div className="absolute top-3 right-3">
                              <div className="w-7 h-7 rounded-full bg-[#b45309] flex items-center justify-center shadow-lg">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                      <div className="w-28 h-28 rounded-3xl bg-foreground/5 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground/50" />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold mb-2">Your canvas awaits</p>
                        <p className="text-sm text-muted-foreground max-w-sm">
                          Enter a prompt and click generate to start creating stunning visuals
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Canvas Actions */}
                {selectedImage !== null && !isGenerating && (
                  <div className="p-5 border-t border-foreground/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button className="h-10 px-5 rounded-xl bg-[#b45309] text-white text-sm font-medium flex items-center gap-2 hover:bg-[#92400e] transition-colors">
                        <Download className="w-4 h-4" />
                        Download HD
                      </button>
                      <button className="h-10 px-5 rounded-xl bg-foreground/5 text-sm font-medium flex items-center gap-2 hover:bg-foreground/10 transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="h-10 px-5 rounded-xl bg-foreground/5 text-sm font-medium flex items-center gap-2 hover:bg-foreground/10 transition-colors">
                        <Layers className="w-4 h-4" />
                        Upscale
                      </button>
                      <button className="h-10 px-5 rounded-xl bg-foreground/5 text-sm font-medium flex items-center gap-2 hover:bg-foreground/10 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                        Variations
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
