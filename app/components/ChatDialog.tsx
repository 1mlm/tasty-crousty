"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { config } from "@/app/data/config"
import { menuItems } from "@/app/data/menu"
import { icons } from "@/app/data/ui"
import { Icon } from "@/shadcn/cpns/Icon"
import { cn } from "@/shadcn/lib/utils"

type Message =
  | { id: number; from: "user" | "bot"; type: "text"; text: string }
  | { id: number; from: "bot"; type: "rating-prompt" }
  | { id: number; from: "user"; type: "rating-submitted"; stars: number }

function randomPopularItem() {
  const popular = menuItems.filter((i) => i.popular)
  return popular[Math.floor(Math.random() * popular.length)]
}

function getBotReply(input: string): string | "RATING_PROMPT" {
  const msg = input.toLowerCase()

  if (/\b(hi|hello|hey|salut|bonjour)\b/.test(msg)) {
    return "Hey there! 👋 Welcome to Tasty Crousty. What can I help you with today?"
  }
  if (/hour|open|close|time|when/.test(msg)) {
    return `We're open Mon-Fri ${config.hours.weekdays} and Sat-Sun ${config.hours.weekends}. See you soon! ⏰`
  }
  if (/address|location|where|find|map|directions/.test(msg)) {
    return `We're at ${config.address}. Drop by anytime — we'd love to see you! 📍`
  }
  if (/phone|call|number|contact/.test(msg)) {
    return `You can reach us at ${config.phone} or email us at ${config.email}. 📞`
  }
  if (/recommend|suggest|what.*good|what.*try|best|popular/.test(msg)) {
    const item = randomPopularItem()
    return `Try our [menu:${item.name}] — ${item.description}. Check the [link:full menu] for more! 🍔`
  }
  if (/price|cost|how much|cheap|expensive|menu/.test(msg)) {
    return `Our menu starts from $1.99! Check the [link:full menu] — something for every appetite. 🍔`
  }
  if (/order|delivery|pickup|takeaway|take.away/.test(msg)) {
    return `We offer dine-in and takeaway. Call us at [tel:${config.phone}] to place an order ahead of time! 🛍️`
  }
  if (/vegan|vegetarian|veggie|plant/.test(msg)) {
    return "We have a delicious Veggie Burger on the menu — plant-based patty, avocado, chipotle mayo. 🌿 Check the [link:full menu]!"
  }
  if (/allergen|allergy|gluten|nut|dairy/.test(msg)) {
    return `For detailed allergen info, call us at [tel:${config.phone}] so our team can help you safely.`
  }
  if (/rate|review|feedback|evaluate|rating|opinion|experience/.test(msg)) {
    return "RATING_PROMPT"
  }
  if (/thank|thanks|merci|thx/.test(msg)) {
    return "You're welcome! 😊 Is there anything else I can help with?"
  }
  return `Thanks for your message! For urgent queries, call us at [tel:${config.phone}]. 🙌`
}

// Parses [tel:+212…], [link:text], [menu:Name] tokens into React nodes
function RichText({ text }: { text: string }) {
  const tokenRegex = /\[(tel|link|menu):([^\]]+)\]/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  // biome-ignore lint/suspicious/noAssignInExpressions: standard regex loop pattern
  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const [, type, value] = match
    if (type === "tel") {
      parts.push(
        <a
          key={match.index}
          href={`tel:${value.replace(/\s/g, "")}`}
          className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
        >
          {value}
        </a>
      )
    } else if (type === "link") {
      parts.push(
        <Link
          key={match.index}
          href="/menu"
          className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
        >
          {value}
        </Link>
      )
    } else if (type === "menu") {
      parts.push(
        <Link
          key={match.index}
          href="/menu"
          className="font-semibold text-primary underline underline-offset-2 hover:opacity-80"
        >
          {value}
        </Link>
      )
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <>{parts}</>
}

function StarRatingPrompt({ onRate }: { onRate: (stars: number) => void }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
      <p className="mb-2 text-sm text-foreground">
        How would you rate your experience with us?
      </p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="text-2xl transition-transform hover:scale-110 active:scale-95"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            {star <= hovered ? "⭐" : "☆"}
          </button>
        ))}
      </div>
    </div>
  )
}

const ratingLabels: Record<number, string> = {
  1: "We're sorry to hear that. We'll do better. 🙏",
  2: "Thanks for the feedback — we're always improving. 💪",
  3: "Appreciated! We'll keep working on it. 😊",
  4: "Great to hear! Thanks for visiting. 🎉",
  5: "You made our day! See you next time. 🍔❤️",
}

export function ChatDialog() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "bot",
      type: "text",
      text: "Hi! 👋 I'm the Tasty Crousty assistant. Ask about our hours, menu, location, or type 'feedback' to leave a rating!",
    },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [open])

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function send() {
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: Date.now(), from: "user", type: "text", text }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTyping(true)

    setTimeout(() => {
      const reply = getBotReply(text)
      if (reply === "RATING_PROMPT") {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: "bot", type: "rating-prompt" },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: "bot", type: "text", text: reply },
        ])
      }
      setTyping(false)
    }, 700 + Math.random() * 400)
  }

  function submitRating(stars: number) {
    const ratingMsg: Message = { id: Date.now(), from: "user", type: "rating-submitted", stars }
    setMessages((prev) => [...prev, ratingMsg])
    setTimeout(() => {
      const reply = ratingLabels[stars] ?? "Thanks for your rating! 🙏"
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", type: "text", text: reply },
      ])
    }, 500)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-2xl shadow-lg shadow-primary/40 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/50 active:scale-95",
          open && "pointer-events-none opacity-0 scale-75"
        )}
      >
        💬
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-5 right-5 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-card shadow-2xl shadow-foreground/10 ring-1 ring-foreground/8 transition-all duration-300",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ maxHeight: "min(520px, calc(100vh - 3rem))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🍔</span>
            <div>
              <p className="text-sm font-semibold text-primary-foreground">Tasty Crousty</p>
              <p className="text-xs text-primary-foreground/70">Usually replies instantly</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="flex size-7 items-center justify-center rounded-full text-primary-foreground/80 hover:bg-primary-foreground/15 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
          {messages.map((msg) => {
            if (msg.type === "rating-prompt") {
              return (
                <div key={msg.id} className="flex justify-start">
                  <StarRatingPrompt onRate={submitRating} />
                </div>
              )
            }
            if (msg.type === "rating-submitted") {
              return (
                <div key={msg.id} className="flex justify-end">
                  <div className="rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                    {"⭐".repeat(msg.stars)}{" "}
                    <span className="text-xs opacity-80">({msg.stars}/5)</span>
                  </div>
                </div>
              )
            }
            return (
              <div
                key={msg.id}
                className={cn("flex", msg.from === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                    msg.from === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground"
                  )}
                >
                  <RichText text={msg.text} />
                </div>
              </div>
            )
          })}

          {typing && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block size-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border/60 p-3 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask something..."
            className="flex-1 rounded-xl bg-muted px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
          />
          <button
            type="button"
            onClick={send}
            disabled={!input.trim()}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity active:scale-95"
          >
            <Icon icon={icons.send} className="size-4" />
          </button>
        </div>
      </div>
    </>
  )
}
