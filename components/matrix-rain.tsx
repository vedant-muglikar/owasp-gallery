"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  density?: number;
  speed?: number;
  fontSize?: number;
};

export default function MatrixRain({
  className,
  density = 1,
  speed = 1,
  fontSize = 14,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const chars = "01ABCDEF⟂#@$%&*";
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(width / fontSize);
      drops = Array(columns)
        .fill(0)
        .map(() => Math.random() * -20);
      ctx.font = `${fontSize}px monospace`;
    }

    function draw() {
      // translucent black background → fade effect
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, width, height);

      for (let col = 0; col < columns; col++) {
        const x = col * fontSize;
        const y = drops[col] * fontSize;

        // green letters with trail fade
        ctx.fillStyle = "rgba(0,255,153,0.35)";
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[col] = 0;
        } else {
          drops[col] += 0.9 * speed;
        }
      }

      frame.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    frame.current = requestAnimationFrame(draw);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      ro.disconnect();
    };
  }, [density, speed, fontSize]);

  return (
    <canvas
      ref={ref}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none opacity-40",
        "overflow-hidden", // ✅ prevent scrollbars
        className
      )}
      aria-hidden="true"
    />
  );
}
