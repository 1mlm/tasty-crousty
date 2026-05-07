"use client"

import { useState } from "react"
import { Icon } from "@/shadcn/cpns/Icon"
import { icons } from "@/app/data/ui"

const categories = ["Food Quality", "Service", "Atmosphere", "Website", "Other"]

const confettiColors = [
  "bg-primary",
  "bg-amber-400",
  "bg-orange-300",
  "bg-yellow-400",
  "bg-red-400",
  "bg-pink-400",
]

const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  color: confettiColors[i % confettiColors.length],
  left: `${(i * 37) % 100}%`,
  delay: `${(i * 0.12) % 1.4}s`,
  duration: `${0.8 + (i * 0.07) % 0.8}s`,
  size: i % 3 === 0 ? "size-3" : "size-2",
  rotate: `${(i * 47) % 360}deg`,
}))

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {confettiPieces.map((p) => (
        <span
          key={p.id}
          className={`absolute top-0 ${p.color} ${p.size} rounded-sm opacity-0`}
          style={{
            left: p.left,
            transform: `rotate(${p.rotate})`,
            animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(320px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

function CheckmarkCircle() {
  return (
    <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-primary/15">
      <svg
        viewBox="0 0 52 52"
        className="size-12 text-primary"
        aria-hidden
      >
        <circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeDasharray="150"
          strokeDashoffset="150"
          strokeLinecap="round"
          style={{ animation: "drawCircle 0.5s ease forwards" }}
        />
        <polyline
          points="14,27 22,35 38,18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="36"
          strokeDashoffset="36"
          style={{ animation: "drawCheck 0.4s 0.45s ease forwards" }}
        />
        <style>{`
          @keyframes drawCircle {
            to { stroke-dashoffset: 0; }
          }
          @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    </div>
  )
}

export default function FeedbackPage() {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 1400)
  }

  function reset() {
    setRating(0)
    setCategory("")
    setName("")
    setEmail("")
    setMessage("")
    setSubmitted(false)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/15 to-background px-4 py-14 text-center">
        <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
          Share Your Feedback
        </h1>
        <p className="mt-3 text-muted-foreground">
          Help us get better — every message is read by our team.
        </p>
      </div>

      <div className="mx-auto max-w-xl px-4 py-12">
        {submitted ? (
          <div
            className="relative overflow-hidden rounded-3xl bg-card p-10 text-center ring-1 ring-foreground/8"
            style={{ animation: "successIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}
          >
            <Confetti />
            <CheckmarkCircle />
            <h2 className="mb-2 text-2xl font-bold text-foreground">Thank you! 🎉</h2>
            <p className="mb-6 text-muted-foreground">
              Your feedback has been received. We really appreciate you taking the time.
            </p>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
            >
              <Icon icon={icons.nav["/feedback"]} className="size-4" />
              Send another
            </button>
            <style>{`
              @keyframes successIn {
                from { opacity: 0; transform: scale(0.85); }
                to   { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl bg-card p-8 ring-1 ring-foreground/8"
          >
            {/* Name + Email */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground ring-1 ring-border outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-xl bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground ring-1 ring-border outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Category
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat === category ? "" : cat)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      category === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground ring-1 ring-border hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Star rating */}
            <div className="space-y-1.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Overall Rating
              </p>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    className="text-3xl transition-all hover:scale-110 active:scale-95"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    <span
                      className={`transition-colors duration-150 ${
                        star <= (hovered || rating)
                          ? "text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      ★
                    </span>
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 self-center text-sm text-muted-foreground">
                    {["", "Poor", "Fair", "Good", "Great", "Amazing!"][rating]}
                  </span>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={4}
                required
                className="w-full resize-none rounded-xl bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground ring-1 ring-border outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending || !message.trim()}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="block size-1.5 rounded-full bg-primary-foreground animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </span>
                  Sending…
                </>
              ) : (
                <>
                  <Icon icon={icons.send} className="size-4" />
                  Send Feedback
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
