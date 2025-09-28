"use client"

import { cn } from "@/lib/utils"

type Props = {
  children: string
  className?: string
  // how strong the glitch should be in px
  intensity?: number
  // speed multiplier (1 = default)
  speed?: number
}

export default function GlitchText({ children, className, intensity = 2, speed = 1 }: Props) {
  return (
    <span
      className={cn("relative inline-block text-(--color-foreground) select-none", className)}
      data-intensity={intensity}
      data-speed={speed}
      aria-label={children}
    >
      {/* Base layer */}
      <span className="relative z-10">{children}</span>
      {/* Layer A */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-(--color-primary) mix-blend-screen"
        style={{ transform: "translate(0,0)" }}
      >
        {children}
      </span>
      {/* Layer B */}
      <span aria-hidden="true" className="absolute inset-0 text-(--color-accent-foreground) mix-blend-screen">
        {children}
      </span>

      <style jsx>{`
        span[data-intensity] > span:nth-child(2) {
          animation: glitch-a calc(2s / var(--spd)) steps(20, end) infinite;
          --int: var(--intensity);
          --spd: var(--speed);
        }
        span[data-intensity] > span:nth-child(3) {
          animation: glitch-b calc(2.6s / var(--spd)) steps(22, end) infinite;
          --int: var(--intensity);
          --spd: var(--speed);
        }
        span[data-intensity] {
          --intensity: attr(data-intensity number, 2);
          --speed: attr(data-speed number, 1);
        }
        @keyframes glitch-a {
          0% {
            clip-path: inset(0 0 80% 0);
            transform: translate(0, 0);
          }
          10% {
            clip-path: inset(20% 0 60% 0);
            transform: translate(calc(var(--int) * -1px), calc(var(--int) * 1px));
          }
          20% {
            clip-path: inset(40% 0 40% 0);
            transform: translate(calc(var(--int) * 1px), calc(var(--int) * -1px));
          }
          30% {
            clip-path: inset(10% 0 60% 0);
            transform: translate(calc(var(--int) * -1px), 0);
          }
          40% {
            clip-path: inset(60% 0 10% 0);
            transform: translate(0, calc(var(--int) * 1px));
          }
          50%,
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0, 0);
          }
        }
        @keyframes glitch-b {
          0% {
            clip-path: inset(60% 0 0 0);
            transform: translate(0, 0);
          }
          15% {
            clip-path: inset(0 0 70% 0);
            transform: translate(calc(var(--int) * 1px), 0);
          }
          30% {
            clip-path: inset(50% 0 10% 0);
            transform: translate(0, calc(var(--int) * -1px));
          }
          45% {
            clip-path: inset(0 0 0 0);
            transform: translate(calc(var(--int) * -1px), calc(var(--int) * 1px));
          }
          60%,
          100% {
            clip-path: inset(0 0 0 0);
            transform: translate(0, 0);
          }
        }
      `}</style>
    </span>
  )
}
