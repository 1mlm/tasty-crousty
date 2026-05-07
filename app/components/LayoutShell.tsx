"use client"

import { usePathname } from "next/navigation"
import { ChatDialog } from "@/app/components/ChatDialog"
import { Footer } from "@/app/components/Footer"
import { Navbar } from "@/app/components/Navbar"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatDialog />
    </>
  )
}
