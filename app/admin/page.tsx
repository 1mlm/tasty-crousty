"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertCircleIcon,
  EyeIcon,
  Hamburger01Icon,
  LockIcon,
  User02Icon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@/shadcn/cpns/Icon"

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        router.push("/admin/dashboard?welcome=1")
      } else {
        setError("Invalid credentials. Try again.")
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-[#FF8C42] shadow-lg shadow-[#FF8C42]/30">
            <Icon icon={Hamburger01Icon} className="size-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Tasty Crousty</h1>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Icon icon={LockIcon} className="size-3.5" />
            Staff access only
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#FF8C42]/20 bg-card px-8 py-8 shadow-xl shadow-black/5"
        >
          <h2 className="mb-6 text-lg font-semibold text-foreground">Sign in to Admin Panel</h2>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-1.5 block text-sm font-medium text-foreground/70"
            >
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                <Icon icon={User02Icon} className="size-4" />
              </span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                className="w-full rounded-xl border border-[#FF8C42]/20 bg-muted py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#FF8C42]/60 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-foreground/70"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                <Icon icon={LockIcon} className="size-4" />
              </span>
              <input
                id="password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-[#FF8C42]/20 bg-muted py-2.5 pl-9 pr-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#FF8C42]/60 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/20"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground"
              >
                <Icon icon={showPass ? ViewOffIcon : EyeIcon} className="size-4" />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-600">
              <Icon icon={AlertCircleIcon} className="size-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full rounded-xl bg-[#FF8C42] py-2.5 text-sm font-semibold text-white shadow-md shadow-[#FF8C42]/30 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Back link */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <a href="/" className="hover:text-[#FF8C42] hover:underline">
            ← Back to Tasty Crousty
          </a>
        </p>
      </div>
    </div>
  )
}
