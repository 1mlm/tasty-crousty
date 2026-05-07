"use server"

import { revalidatePath } from "next/cache"
import { readDB, writeDB, type OrderStatus } from "@/app/admin/lib/db"

export async function updateOrderStatus(id: string, status: OrderStatus) {
  const db = readDB()
  const order = db.orders.find((o) => o.id === id)
  if (order) {
    order.status = status
    writeDB(db)
  }
  revalidatePath("/admin/dashboard")
}

export async function deleteOrder(id: string) {
  const db = readDB()
  db.orders = db.orders.filter((o) => o.id !== id)
  writeDB(db)
  revalidatePath("/admin/dashboard")
}

export async function deleteFeedback(id: string) {
  const db = readDB()
  db.feedback = db.feedback.filter((f) => f.id !== id)
  writeDB(db)
  revalidatePath("/admin/dashboard")
}

export async function deleteUser(id: string) {
  const db = readDB()
  db.users = db.users.filter((u) => u.id !== id)
  writeDB(db)
  revalidatePath("/admin/dashboard")
}

export async function toggleUserActive(id: string) {
  const db = readDB()
  const user = db.users.find((u) => u.id === id)
  if (user) {
    user.isActive = !user.isActive
    writeDB(db)
  }
  revalidatePath("/admin/dashboard")
}
