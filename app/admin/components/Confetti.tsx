"use client"

import { useMemo, useState, useEffect } from "react"

const COLORS = ["#FF8C42", "#FFD166", "#06D6A0", "#118AB2", "#EF476F", "#A855F7", "#FBBF24"]
const PIECE_COUNT = 90

interface Piece {
  id: number
  x: number
  delay: number
  duration: number
  color: string
  size: number
  rotate: number
  isCircle: boolean
}

export function Confetti() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: PIECE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 2.5 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 7 + Math.random() * 9,
        rotate: Math.random() * 360,
        isCircle: i % 4 === 0,
      })),
    []
  )

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-20px]"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: p.isCircle ? "50%" : "2px",
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
            transform: `rotate(${p.rotate}deg)`,
            opacity: 1,
          }}
        />
      ))}
    </div>
  )
}
