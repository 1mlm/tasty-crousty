import { readDB } from "@/app/admin/lib/db"
import { AdminDashboard } from "@/app/admin/components/AdminDashboard"

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  const db = readDB()
  const params = await searchParams
  return <AdminDashboard data={db} showConfetti={params.welcome === "1"} />
}
