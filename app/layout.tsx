import type { Metadata } from "next"
import { Geist, Geist_Mono, Outfit } from "next/font/google"
import { LayoutShell } from "@/app/components/LayoutShell"
import "../styles/globals.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Tasty Crousty: Burgers worth the detour",
  description:
    "Fast, fresh, and full of flavour; Tasty Crousty serves handcrafted burgers and comfort food made to order in Ifrane, Morocco.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
