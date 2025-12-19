"use client"

import { useState, useRef, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Send, ImageIcon, Loader2, RotateCcw, Download, Bookmark, Maximize2 } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { cn } from "@/lib/utils"

const styles = [
  { id: "photo", label: "Photo", preview: "Photorealistic" },
  { id: "cinematic", label: "Cinematic", preview: "Film-like" },
  { id: "anime", label: "Anime", preview: "Japanese art" },
  { id: "3d", label: "3D Render", preview: "CGI quality" },
  { id: "oil", label: "Oil Paint", preview: "Classical art" },
  { id: "watercolor", label: "Watercolor", preview: "Soft strokes" },
]

const quickPrompts = [
  "A serene Japanese garden at golden hour",
  "Futuristic cityscape with neon lights",
  "Mystical forest with bioluminescent plants",
  "Abstract geometric patterns in motion",
]

export function GeneratorSection() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("photo")
  const [quality, setQuality] = useState([85])
  const [hdUpscale, setHdUpscale] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px"
    }
  }, [prompt])

  const handleGenerate = () => {
    if (!prompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedImages([
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " variation 1 high quality detailed")}?width=512&height=512&nologo=true`,
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " variation 2 artistic style")}?width=512&height=512&nologo=true`,
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " variation 3 cinematic lighting")}?width=512&height=512&nologo=true`,
        `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt + " variation 4 professional photography")}?width=512&height=512&nologo=true`,
      ])
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <section id="create" className="py-32 relative overflow-hidden bg-[#FAF8F5] bg-noise">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <ScrollReveal>
            <p className="text-sm font-medium text-accent uppercase tracking-[0.2em] mb-4">AI Studio</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl">
              Describe anything.
              <br />
              <span className="text-muted-foreground">We'll create it.</span>
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left column - Controls */}
          <div className="lg:col-span-2 space-y-6">
            <ScrollReveal delay={200}>
              {/* Prompt input card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 block">
                  Your Prompt
                </label>
                <textarea
                  ref={textareaRef}
                  placeholder="Describe the image you want to create..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full min-h-[100px] max-h-[200px] text-base resize-none bg-transparent focus:outline-none placeholder:text-muted-foreground/40 leading-relaxed"
                />
                <div className="flex items-center justify-between pt-4 border-t border-foreground/5 mt-4">
                  <span className="text-xs text-muted-foreground">{prompt.length}/1000</span>
                  <div className="flex gap-2">
                    {quickPrompts.slice(0, 2).map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(p)}
                        className="text-xs px-3 py-1.5 bg-foreground/[0.03] hover:bg-foreground/[0.06] rounded-full transition-colors"
                      >
                        Try this
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              {/* Style selector */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 block">
                  Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 text-center",
                        style === s.id
                          ? "bg-foreground text-background shadow-lg"
                          : "bg-foreground/[0.03] hover:bg-foreground/[0.06] text-foreground/70",
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              {/* Settings */}
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Quality
                    </label>
                    <span className="text-sm font-bold text-accent">{quality[0]}%</span>
                  </div>
                  <Slider value={quality} onValueChange={setQuality} min={50} max={100} step={5} />
                </div>
                <div className="flex items-center justify-between py-4 border-t border-foreground/5">
                  <div>
                    <div className="text-sm font-medium">4K Upscale</div>
                    <div className="text-xs text-muted-foreground">4096 x 4096 pixels</div>
                  </div>
                  <Switch checked={hdUpscale} onCheckedChange={setHdUpscale} />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <MagneticButton
                strength={0.15}
                onClick={handleGenerate}
                className={cn(
                  "w-full h-14 text-base font-semibold rounded-xl transition-all duration-500 inline-flex items-center justify-center gap-3",
                  "bg-foreground text-background hover:shadow-xl",
                  isGenerating && "pointer-events-none opacity-80",
                )}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Generate
                  </>
                )}
              </MagneticButton>
            </ScrollReveal>
          </div>

          {/* Right column - Preview */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={300} direction="right">
              <div className="bg-white rounded-2xl p-6 shadow-sm min-h-[600px] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Output</h3>
                  {generatedImages.length > 0 && (
                    <button
                      onClick={() => setGeneratedImages([])}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Clear
                    </button>
                  )}
                </div>

                {generatedImages.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    {generatedImages.map((img, i) => (
                      <div
                        key={i}
                        className={cn(
                          "relative group rounded-xl overflow-hidden bg-foreground/[0.02] cursor-pointer transition-all duration-300",
                          selectedImage === i && "ring-2 ring-accent ring-offset-2",
                        )}
                        onClick={() => setSelectedImage(selectedImage === i ? null : i)}
                      >
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Generated ${i + 1}`}
                          className="w-full h-full object-cover aspect-square"
                        />
                        <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2">
                          <button className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                            <Download className="w-4 h-4 text-foreground" />
                          </button>
                          <button className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                            <Maximize2 className="w-4 h-4 text-foreground" />
                          </button>
                          <button className="w-9 h-9 bg-white rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                            <Bookmark className="w-4 h-4 text-foreground" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : isGenerating ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-6">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 border-2 border-foreground/10 rounded-full" />
                      <div className="absolute inset-0 border-2 border-transparent border-t-accent rounded-full animate-spin" />
                      <div
                        className="absolute inset-2 border-2 border-transparent border-t-accent/50 rounded-full animate-spin"
                        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-medium mb-1">Creating your vision</p>
                      <p className="text-sm text-muted-foreground">Usually takes 3-5 seconds</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
                    <div className="w-16 h-16 bg-foreground/[0.02] rounded-2xl flex items-center justify-center">
                      <ImageIcon className="w-7 h-7 text-muted-foreground/30" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground/80 mb-1">Your creations appear here</p>
                      <p className="text-sm text-muted-foreground">Enter a prompt and hit generate</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
