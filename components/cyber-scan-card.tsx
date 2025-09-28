"use client"

import { cn } from "@/lib/utils"
import type { PropsWithChildren } from "react"

/**
 * CyberScanCard
 * - Neon border using currentColor
 * - Subtle grid overlay
 * - Animated scanline appears on hover
 * - Maintains fixed card size for children
 */
type Props = PropsWithChildren<{
  className?: string
}>

export default function CyberScanCard({ className, children }: Props) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-(--color-border) bg-(--color-card) shadow-[0_0_0_1px_var(--color-border)]",
        "transition-transform duration-300 ease-out will-change-transform",
        className,
      )}
      style={{ color: "var(--color-primary)" }}
      aria-label="Cyber scan card"
    >
      {/* Neon border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          boxShadow:
            "0 0 0 1px var(--color-border), 0 0 24px 2px color-mix(in oklab, currentColor 35%, transparent)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, color-mix(in oklab, var(--color-foreground) 10%, transparent) 0 1px, transparent 1px 16px), repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-foreground) 10%, transparent) 0 1px, transparent 1px 16px)",
          maskImage: "radial-gradient(120% 120% at 50% 50%, black 50%, transparent 100%)",
        }}
      />

      {/* Scanline (appears on hover) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[-40%] h-[40%] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, currentColor 15%, transparent), transparent)",
          animation: "cyber-scan 2.4s linear infinite",
        }}
      />

      {/* Content: image goes here, fixed size */}
      <div className="relative z-10 w-full h-full">{children}</div>

      <style jsx>{`
        @keyframes cyber-scan {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(300%);
          }
        }
      `}</style>
    </div>
  )
}
