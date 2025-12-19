"use client"

import type React from "react"
import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: "button" | "a"
  href?: string
  onClick?: () => void
}

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  as: Component = "button",
  href,
  onClick,
}: MagneticButtonProps) {
  const props = {
    className: cn(className),
    onClick,
    ...(Component === "a" ? { href } : {}),
  }

  return <Component {...props}>{children}</Component>
}
