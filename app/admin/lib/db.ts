import fs from "fs"
import path from "path"

export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled"
export type UserRole = "admin" | "staff" | "customer"

export interface Order {
  id: string
  customer: string
  items: string[]
  status: OrderStatus
  total: number
  time: string
  isPaid: boolean
}

export interface FeedbackEntry {
  id: string
  username: string
  rating: number
  message: string
  satisfied: boolean
  date: string
}

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  joinedAt: string
  isActive: boolean
}

export interface DB {
  orders: Order[]
  feedback: FeedbackEntry[]
  users: User[]
}

const DB_PATH = path.join(process.cwd(), "app/admin/data/db.json")

export function readDB(): DB {
  const raw = fs.readFileSync(DB_PATH, "utf8")
  return JSON.parse(raw) as DB
}

export function writeDB(data: DB): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}
