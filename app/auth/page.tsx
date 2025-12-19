"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react"
import { cn } from "@/lib/utils"

function MattrLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-10 h-10", className)}>
      <rect width="40" height="40" rx="10" fill="currentColor" />
      <path
        d="M10 28V16L15 24L20 16V28"
        stroke="#FAF8F5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 28V16L29 24L34 16" stroke="#FAF8F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const socialProviders = [
  {
    name: "Google",
    icon: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
  },
  {
    name: "GitHub",
    icon: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  },
  {
    name: "Apple",
    icon: "M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z",
  },
]

const benefits = [
  "50 free generations per month",
  "Access to 5 base art styles",
  "Standard 720p quality",
  "Community support",
]

const stats = [
  { value: "150K+", label: "Creators" },
  { value: "10M+", label: "Images" },
  { value: "4.9", label: "Rating" },
]

const testimonials = [
  {
    quote: "MATTR has completely transformed our creative workflow. What used to take hours now takes seconds.",
    author: "Sarah Chen",
    role: "Creative Director",
    company: "Spotify",
  },
  {
    quote: "The quality is unmatched. We've tried every AI tool out there, and MATTR is simply the best.",
    author: "Marcus Johnson",
    role: "Head of Design",
    company: "Airbnb",
  },
  {
    quote: "Finally, an AI tool that understands artistic intent. It's like having a creative partner.",
    author: "Elena Rodriguez",
    role: "Art Director",
    company: "Netflix",
  },
]

export default function AuthPage() {
  const searchParams = useSearchParams()
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin"

  const [mode, setMode] = useState<"signin" | "signup">(initialMode)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const formRef = useRef<HTMLFormElement>(null)

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Reset form when switching modes
  useEffect(() => {
    setName("")
    setEmail("")
    setPassword("")
    setAgreeTerms(false)
    setShowPassword(false)
  }, [mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === "signup" && !agreeTerms) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const passwordStrength = () => {
    if (password.length === 0) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-emerald-500"]
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"]

  return (
    <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-[1400px] flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Side - Form */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-6 md:px-12 py-12 bg-white rounded-3xl shadow-sm">
          <div className="max-w-[420px] mx-auto w-full">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
              <div className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <MattrLogo className="text-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-none">MATTR</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                  AI Studio
                </span>
              </div>
            </Link>

            {/* Tab Switcher */}
            <div className="relative mb-10">
              <div className="flex items-center p-1 bg-foreground/5 rounded-2xl">
                <button
                  onClick={() => setMode("signin")}
                  className={cn(
                    "flex-1 py-3.5 text-sm font-semibold rounded-xl transition-all duration-500 relative z-10",
                    mode === "signin" ? "text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode("signup")}
                  className={cn(
                    "flex-1 py-3.5 text-sm font-semibold rounded-xl transition-all duration-500 relative z-10",
                    mode === "signup" ? "text-background" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Create Account
                </button>
                {/* Sliding background */}
                <div
                  className={cn(
                    "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-foreground rounded-xl transition-all duration-500 ease-out",
                    mode === "signin" ? "left-1" : "left-[calc(50%+2px)]",
                  )}
                />
              </div>
            </div>

            {/* Header */}
            <div className="mb-8 overflow-hidden">
              <div
                className={cn(
                  "transition-all duration-500",
                  mode === "signin" ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 absolute",
                )}
              >
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Welcome back</h1>
                <p className="text-muted-foreground">Enter your credentials to continue</p>
              </div>
              <div
                className={cn(
                  "transition-all duration-500",
                  mode === "signup" ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 absolute",
                )}
              >
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Create account</h1>
                <p className="text-muted-foreground">Start creating in seconds</p>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex gap-3 mb-6">
              {socialProviders.map((provider) => (
                <button
                  key={provider.name}
                  className="flex-1 h-12 rounded-xl border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/[0.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d={provider.icon} />
                  </svg>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-foreground/10" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">or with email</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {/* Name field - only for signup */}
              <div
                className={cn(
                  "space-y-2 overflow-hidden transition-all duration-500",
                  mode === "signup" ? "max-h-24 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <label htmlFor="name" className="text-sm font-medium">
                  Full name
                </label>
                <div className="relative">
                  <div
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                      focusedField === "name" ? "text-[#b45309]" : "text-muted-foreground",
                    )}
                  >
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="John Doe"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-foreground/[0.02] border border-foreground/10 focus:border-[#b45309] focus:ring-0 outline-none transition-all duration-300 text-sm"
                    required={mode === "signup"}
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <div className="relative">
                  <div
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                      focusedField === "email" ? "text-[#b45309]" : "text-muted-foreground",
                    )}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-foreground/[0.02] border border-foreground/10 focus:border-[#b45309] focus:ring-0 outline-none transition-all duration-300 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  {mode === "signin" && (
                    <Link
                      href="/forgot-password"
                      className="text-xs text-muted-foreground hover:text-[#b45309] transition-colors"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <div
                    className={cn(
                      "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300",
                      focusedField === "password" ? "text-[#b45309]" : "text-muted-foreground",
                    )}
                  >
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder={mode === "signup" ? "Create a strong password" : "Enter your password"}
                    className="w-full h-12 pl-11 pr-12 rounded-xl bg-foreground/[0.02] border border-foreground/10 focus:border-[#b45309] focus:ring-0 outline-none transition-all duration-300 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password strength - only for signup */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500",
                    mode === "signup" && password.length > 0 ? "max-h-16 opacity-100 mt-3" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          i < passwordStrength() ? strengthColors[passwordStrength() - 1] : "bg-foreground/10",
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Password strength:{" "}
                    <span className={cn("font-medium", passwordStrength() >= 3 ? "text-emerald-600" : "")}>
                      {strengthLabels[passwordStrength() - 1] || "Too weak"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Terms checkbox - only for signup */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-500",
                  mode === "signup" ? "max-h-16 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="flex items-start gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    className={cn(
                      "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300",
                      agreeTerms
                        ? "bg-[#b45309] border-[#b45309]"
                        : "border-foreground/20 hover:border-foreground/40",
                    )}
                  >
                    {agreeTerms && <Check className="w-3 h-3 text-white" />}
                  </button>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="underline hover:text-foreground transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-foreground transition-colors">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading || (mode === "signup" && !agreeTerms)}
                className={cn(
                  "w-full h-12 rounded-xl bg-[#b45309] text-white font-semibold text-sm inline-flex items-center justify-center gap-2 transition-all duration-300 group mt-4 hover:bg-[#92400e]",
                  (isLoading || (mode === "signup" && !agreeTerms)) && "opacity-50 cursor-not-allowed",
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === "signin" ? "Sign in" : "Create account"}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            {/* Footer text */}
            <p className="text-xs text-muted-foreground text-center mt-6">
              {mode === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => setMode("signup")} className="text-[#b45309] font-semibold hover:underline">
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setMode("signin")} className="text-[#b45309] font-semibold hover:underline">
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right Side - Visual with rounded rectangle */}
        <div className="hidden lg:flex w-full lg:w-[55%] bg-foreground rounded-3xl p-12 xl:p-16 relative overflow-hidden shadow-lg">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 text-background w-full flex flex-col justify-between">
            {/* Top content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#b45309] rounded-full mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-semibold text-white tracking-wide">150,000+ CREATORS</span>
              </div>

              <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
                Create stunning
                <br />
                visuals in
                <br />
                <span className="text-background/30">seconds.</span>
              </h2>

              <p className="text-background/60 text-lg leading-relaxed max-w-md mb-12">
                Join thousands of creators using AI to bring their ideas to life. No design skills required.
              </p>

              {/* Benefits grid */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                {benefits.map((benefit, i) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 p-4 rounded-xl bg-background/5 hover:bg-background/10 transition-all duration-300 group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#b45309] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm text-background/80 leading-snug group-hover:text-background transition-colors">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom content */}
            <div>
              {/* Testimonial */}
              <div className="relative overflow-hidden rounded-2xl bg-background/5 backdrop-blur-sm p-6 mb-8 border border-background/10">
                <div className="relative h-28">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={cn(
                        "absolute inset-0 transition-all duration-700",
                        index === currentTestimonial
                          ? "opacity-100 translate-y-0"
                          : index < currentTestimonial
                            ? "opacity-0 -translate-y-full"
                            : "opacity-0 translate-y-full",
                      )}
                    >
                      <p className="text-background/90 mb-4 leading-relaxed text-sm">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#b45309]/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-[#b45309]">
                            {testimonial.author.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-background">{testimonial.author}</p>
                          <p className="text-xs text-background/50">
                            {testimonial.role} · {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dots indicator */}
                <div className="flex gap-1.5 mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300",
                        index === currentTestimonial
                          ? "w-8 bg-[#b45309]"
                          : "w-1.5 bg-background/20 hover:bg-background/30",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-6 border-t border-background/10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-background mb-1">{stat.value}</div>
                    <div className="text-xs text-background/40 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#b45309]/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      </div>
    </main>
  )
}
