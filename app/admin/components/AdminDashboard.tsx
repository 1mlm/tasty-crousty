"use client"

import { useState, useTransition, useMemo } from "react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowReloadHorizontalIcon,
  GlobeIcon,
  BarChartIcon,
  Cancel01Icon,
  Chat01Icon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  Delete01Icon,
  DollarCircleIcon,
  FireIcon,
  Hamburger01Icon,
  ShoppingCart01Icon,
  StarIcon,
  User02Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@/shadcn/cpns/Icon"
import { cn } from "@/shadcn/lib/utils"
import type { DB, Order, FeedbackEntry, User, OrderStatus } from "@/app/admin/lib/db"
import {
  updateOrderStatus,
  deleteOrder,
  deleteFeedback,
  deleteUser,
  toggleUserActive,
} from "@/app/admin/actions"
import { Confetti } from "./Confetti"

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "overview" | "orders" | "feedback" | "users"

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_META: Record<
  OrderStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-400",
  },
  preparing: {
    label: "Preparing",
    bg: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-400",
  },
  ready: {
    label: "Ready",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
  },
  delivered: {
    label: "Delivered",
    bg: "bg-gray-100",
    text: "text-gray-500",
    dot: "bg-gray-400",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-100",
    text: "text-red-600",
    dot: "bg-red-400",
  },
}

const ROLE_META: Record<string, { label: string; bg: string; text: string }> = {
  admin: { label: "Admin", bg: "bg-purple-100", text: "text-purple-700" },
  staff: { label: "Staff", bg: "bg-[#FF8C42]/15", text: "text-[#FF8C42]" },
  customer: { label: "Customer", bg: "bg-gray-100", text: "text-gray-600" },
}

const SIDEBAR_TABS: { id: Tab; label: string; icon: IconSvgElement }[] =
  [
    { id: "overview", label: "Overview", icon: BarChartIcon },
    { id: "orders", label: "Orders", icon: ShoppingCart01Icon },
    { id: "feedback", label: "Feedback", icon: Chat01Icon },
    { id: "users", label: "Users", icon: UserGroupIcon },
  ]

// ─── Donut Chart ──────────────────────────────────────────────────────────────

const CIRCUMFERENCE = 2 * Math.PI * 38

interface DonutSegment {
  label: string
  value: number
  color: string
}

function DonutChart({
  segments,
  title,
}: {
  segments: DonutSegment[]
  title: string
}) {
  const total = segments.reduce((s, seg) => s + seg.value, 0)
  let cumulative = 0

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-semibold text-[#3D2B1F]">{title}</p>
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100" aria-label={title} role="img">
          {total === 0 ? (
            <circle
              cx={50}
              cy={50}
              r={38}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={16}
            />
          ) : (
            segments
              .filter((s) => s.value > 0)
              .map((seg) => {
                const fraction = seg.value / total
                const length = fraction * CIRCUMFERENCE
                const offset = cumulative
                cumulative += length
                return (
                  <circle
                    key={seg.label}
                    cx={50}
                    cy={50}
                    r={38}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={16}
                    strokeDasharray={`${length} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-offset}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "50px 50px",
                    }}
                  />
                )
              })
          )}
          <text
            x="50"
            y="54"
            textAnchor="middle"
            style={{ fontSize: 14, fontWeight: 700, fill: "#3D2B1F" }}
          >
            {total}
          </text>
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs">
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ background: seg.color }}
            />
            <span className="text-[#3D2B1F]/60">{seg.label}</span>
            <span className="ml-auto pl-4 font-semibold text-[#3D2B1F]">
              {seg.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: IconComp,
  label,
  value,
  sub,
  iconBg,
}: {
  icon: IconSvgElement
  label: string
  value: string
  sub: string
  iconBg: string
}) {
  return (
    <div className="rounded-2xl border border-[#FF8C42]/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className={cn("flex size-10 items-center justify-center rounded-xl", iconBg)}>
          <Icon icon={IconComp} className="size-5 text-white" />
        </div>
        <span className="text-sm text-[#3D2B1F]/50">{label}</span>
      </div>
      <p className="text-2xl font-bold text-[#3D2B1F]">{value}</p>
      <p className="mt-0.5 text-xs text-[#3D2B1F]/40">{sub}</p>
    </div>
  )
}

// ─── Bool Icon ────────────────────────────────────────────────────────────────

function BoolIcon({ value }: { value: boolean }) {
  return value ? (
    <Icon icon={CheckmarkCircle01Icon} className="size-5 text-emerald-500" />
  ) : (
    <Icon icon={Cancel01Icon} className="size-5 text-red-400" />
  )
}

// ─── Stars ────────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          icon={StarIcon}
          className={cn("size-3.5", n <= rating ? "text-[#FF8C42]" : "text-gray-200")}
        />
      ))}
    </div>
  )
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const meta = STATUS_META[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        meta.bg,
        meta.text
      )}
    >
      <span className={cn("size-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  )
}

// ─── Role Badge ───────────────────────────────────────────────────────────────

function RoleBadge({ userRole }: { userRole: string }) {
  const meta = ROLE_META[userRole] ?? { label: userRole, bg: "bg-gray-100", text: "text-gray-600" }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        meta.bg,
        meta.text
      )}
    >
      {meta.label}
    </span>
  )
}

// ─── Orders Table ─────────────────────────────────────────────────────────────

function OrdersTable({ orders }: { orders: Order[] }) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="overflow-hidden rounded-2xl border border-[#FF8C42]/10 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#FF8C42]/10 px-6 py-4">
        <Icon icon={ShoppingCart01Icon} className="size-5 text-[#FF8C42]" />
        <h3 className="font-semibold text-[#3D2B1F]">Orders</h3>
        <span className="ml-auto rounded-full bg-[#FF8C42]/10 px-2.5 py-0.5 text-xs font-semibold text-[#FF8C42]">
          {orders.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs font-semibold uppercase tracking-wide text-[#3D2B1F]/40">
              <th className="px-6 py-3">ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={order.id}
                className={cn(
                  "border-b border-gray-50 transition-colors hover:bg-[#FFFBF0]/60",
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                )}
              >
                <td className="px-6 py-3 font-mono text-xs text-[#3D2B1F]/40">{order.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#FF8C42]/10">
                      <Icon icon={User02Icon} className="size-3.5 text-[#FF8C42]" />
                    </div>
                    <span className="font-medium text-[#3D2B1F]">{order.customer}</span>
                  </div>
                </td>
                <td className="max-w-[180px] px-4 py-3">
                  <p className="truncate text-xs text-[#3D2B1F]/60">
                    {order.items.join(", ")}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 font-semibold text-[#3D2B1F]">{order.total} MAD</td>
                <td className="px-4 py-3">
                  <BoolIcon value={order.isPaid} />
                </td>
                <td className="px-4 py-3 text-xs text-[#3D2B1F]/40">
                  {new Date(order.time).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {order.status !== "delivered" && order.status !== "cancelled" && (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() =>
                          startTransition(() => updateOrderStatus(order.id, "delivered"))
                        }
                        title="Mark delivered"
                        className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600 transition-colors hover:bg-emerald-100 disabled:opacity-50"
                      >
                        <Icon icon={CheckmarkCircle01Icon} className="size-3.5" />
                        Done
                      </button>
                    )}
                    {order.status === "pending" && (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() =>
                          startTransition(() => updateOrderStatus(order.id, "preparing"))
                        }
                        title="Start preparing"
                        className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100 disabled:opacity-50"
                      >
                        <Icon icon={FireIcon} className="size-3.5" />
                        Cook
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => startTransition(() => deleteOrder(order.id))}
                      title="Delete order"
                      className="flex size-7 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-100 disabled:opacity-50"
                    >
                      <Icon icon={Delete01Icon} className="size-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-[#3D2B1F]/30">
            <Icon icon={ShoppingCart01Icon} className="size-8" />
            <p className="text-sm">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Feedback Table ───────────────────────────────────────────────────────────

function FeedbackTable({ feedback }: { feedback: FeedbackEntry[] }) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="overflow-hidden rounded-2xl border border-[#FF8C42]/10 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#FF8C42]/10 px-6 py-4">
        <Icon icon={Chat01Icon} className="size-5 text-[#FF8C42]" />
        <h3 className="font-semibold text-[#3D2B1F]">Customer Feedback</h3>
        <span className="ml-auto rounded-full bg-[#FF8C42]/10 px-2.5 py-0.5 text-xs font-semibold text-[#FF8C42]">
          {feedback.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs font-semibold uppercase tracking-wide text-[#3D2B1F]/40">
              <th className="px-6 py-3">User</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Satisfied</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((fb, i) => (
              <tr
                key={fb.id}
                className={cn(
                  "border-b border-gray-50 transition-colors hover:bg-[#FFFBF0]/60",
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                )}
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#FF8C42]/10">
                      <Icon icon={User02Icon} className="size-3.5 text-[#FF8C42]" />
                    </div>
                    <span className="font-medium text-[#3D2B1F]">@{fb.username}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Stars rating={fb.rating} />
                </td>
                <td className="max-w-[260px] px-4 py-3">
                  <p className="line-clamp-2 text-xs text-[#3D2B1F]/60">{fb.message}</p>
                </td>
                <td className="px-4 py-3">
                  <BoolIcon value={fb.satisfied} />
                </td>
                <td className="px-4 py-3 text-xs text-[#3D2B1F]/40">{fb.date}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => startTransition(() => deleteFeedback(fb.id))}
                    title="Delete feedback"
                    className="flex size-7 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-100 disabled:opacity-50"
                  >
                    <Icon icon={Delete01Icon} className="size-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {feedback.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-[#3D2B1F]/30">
            <Icon icon={Chat01Icon} className="size-8" />
            <p className="text-sm">No feedback yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Users Table ──────────────────────────────────────────────────────────────

function UsersTable({ users }: { users: User[] }) {
  const [pending, startTransition] = useTransition()

  return (
    <div className="overflow-hidden rounded-2xl border border-[#FF8C42]/10 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#FF8C42]/10 px-6 py-4">
        <Icon icon={UserGroupIcon} className="size-5 text-[#FF8C42]" />
        <h3 className="font-semibold text-[#3D2B1F]">Users</h3>
        <span className="ml-auto rounded-full bg-[#FF8C42]/10 px-2.5 py-0.5 text-xs font-semibold text-[#FF8C42]">
          {users.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs font-semibold uppercase tracking-wide text-[#3D2B1F]/40">
              <th className="px-6 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                className={cn(
                  "border-b border-gray-50 transition-colors hover:bg-[#FFFBF0]/60",
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/20"
                )}
              >
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FF8C42]/10 ring-2 ring-[#FF8C42]/20">
                      <Icon icon={User02Icon} className="size-4 text-[#FF8C42]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#3D2B1F]">{user.username}</p>
                      <p className="text-xs text-[#3D2B1F]/40 font-mono">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-[#3D2B1F]/60">{user.email}</td>
                <td className="px-4 py-3">
                  <RoleBadge userRole={user.role} />
                </td>
                <td className="px-4 py-3">
                  <BoolIcon value={user.isActive} />
                </td>
                <td className="px-4 py-3 text-xs text-[#3D2B1F]/40">{user.joinedAt}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => startTransition(() => toggleUserActive(user.id))}
                      title={user.isActive ? "Deactivate" : "Activate"}
                      className="flex items-center gap-1 rounded-lg bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Icon icon={ArrowReloadHorizontalIcon} className="size-3.5" />
                      Toggle
                    </button>
                    {user.role !== "admin" && (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => startTransition(() => deleteUser(user.id))}
                        title="Delete user"
                        className="flex size-7 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-100 disabled:opacity-50"
                      >
                        <Icon icon={Delete01Icon} className="size-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({ data }: { data: DB }) {
  const stats = useMemo(() => {
    const totalRevenue = data.orders
      .filter((o) => o.isPaid)
      .reduce((s, o) => s + o.total, 0)
    const avgRating =
      data.feedback.length > 0
        ? (
            data.feedback.reduce((s, f) => s + f.rating, 0) / data.feedback.length
          ).toFixed(1)
        : "—"
    const activeUsers = data.users.filter((u) => u.isActive).length

    return { totalRevenue, avgRating, activeUsers }
  }, [data])

  const orderStatusSegments = useMemo(() => {
    const counts = data.orders.reduce(
      (acc, o) => {
        acc[o.status] = (acc[o.status] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
    return [
      { label: "Pending", value: counts.pending ?? 0, color: "#FBBF24" },
      { label: "Preparing", value: counts.preparing ?? 0, color: "#3B82F6" },
      { label: "Ready", value: counts.ready ?? 0, color: "#10B981" },
      { label: "Delivered", value: counts.delivered ?? 0, color: "#9CA3AF" },
      { label: "Cancelled", value: counts.cancelled ?? 0, color: "#EF4444" },
    ]
  }, [data.orders])

  const categorySegments = [
    { label: "Burgers", value: 45, color: "#FF8C42" },
    { label: "Sides", value: 25, color: "#FFD166" },
    { label: "Drinks", value: 20, color: "#118AB2" },
    { label: "Desserts", value: 10, color: "#EF476F" },
  ]

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={ShoppingCart01Icon}
          label="Total Orders"
          value={String(data.orders.length)}
          sub="all time"
          iconBg="bg-[#FF8C42]"
        />
        <StatCard
          icon={DollarCircleIcon}
          label="Revenue"
          value={`${stats.totalRevenue} MAD`}
          sub="from paid orders"
          iconBg="bg-emerald-500"
        />
        <StatCard
          icon={StarIcon}
          label="Avg Rating"
          value={`${stats.avgRating} ⭐`}
          sub={`${data.feedback.length} reviews`}
          iconBg="bg-yellow-400"
        />
        <StatCard
          icon={UserGroupIcon}
          label="Active Users"
          value={String(stats.activeUsers)}
          sub={`of ${data.users.length} total`}
          iconBg="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#FF8C42]/10 bg-white p-6 shadow-sm">
          <DonutChart segments={orderStatusSegments} title="Orders by Status" />
        </div>
        <div className="rounded-2xl border border-[#FF8C42]/10 bg-white p-6 shadow-sm">
          <DonutChart segments={categorySegments} title="Sales by Category" />
        </div>
      </div>

      {/* Recent orders preview */}
      <div className="rounded-2xl border border-[#FF8C42]/10 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#FF8C42]/10 px-6 py-4">
          <Icon icon={Clock01Icon} className="size-4 text-[#FF8C42]" />
          <h3 className="text-sm font-semibold text-[#3D2B1F]">Recent Orders</h3>
        </div>
        <div className="divide-y divide-gray-50">
          {data.orders.slice(0, 5).map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-3 px-6 py-3 hover:bg-[#FFFBF0]/60"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FF8C42]/10">
                <Icon icon={User02Icon} className="size-3.5 text-[#FF8C42]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#3D2B1F]">{order.customer}</p>
                <p className="truncate text-xs text-[#3D2B1F]/40">
                  {order.items.slice(0, 2).join(", ")}
                  {order.items.length > 2 ? ` +${order.items.length - 2}` : ""}
                </p>
              </div>
              <StatusBadge status={order.status} />
              <span className="shrink-0 text-sm font-semibold text-[#3D2B1F]">
                {order.total} MAD
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

interface AdminDashboardProps {
  data: DB
  showConfetti: boolean
}

export function AdminDashboard({ data, showConfetti }: AdminDashboardProps) {
  const [tab, setTab] = useState<Tab>("overview")

  return (
    <div className="flex h-screen overflow-hidden bg-[#FFFBF0]">
      {showConfetti && <Confetti />}

      {/* Sidebar */}
      <aside className="flex w-56 shrink-0 flex-col bg-[#1C1917] text-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-white/10 px-5 py-5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-[#FF8C42]">
            <Icon icon={Hamburger01Icon} className="size-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-tight">Tasty Crousty</p>
            <p className="text-[10px] text-white/40">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {SIDEBAR_TABS.map(({ id, label, icon: TabIcon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                tab === id
                  ? "bg-[#FF8C42] text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon icon={TabIcon} className="size-4 shrink-0" />
              {label}
              {id === "orders" && (
                <span className="ml-auto rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
                  {data.orders.length}
                </span>
              )}
              {id === "feedback" && (
                <span className="ml-auto rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold">
                  {data.feedback.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 px-3 py-4 space-y-0.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Icon icon={GlobeIcon} className="size-4 shrink-0" />
            View Site
          </a>
          <a
            href="/"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Icon icon={ArrowLeft01Icon} className="size-4 shrink-0" />
            Back to Site
          </a>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex shrink-0 items-center justify-between border-b border-[#FF8C42]/10 bg-white/80 px-6 py-3 backdrop-blur-sm">
          <div>
            <h1 className="text-base font-bold text-[#3D2B1F] capitalize">{tab}</h1>
            <p className="text-xs text-[#3D2B1F]/40">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 rounded-xl bg-[#FFFBF0] px-3 py-2">
              <div className="flex size-6 items-center justify-center rounded-full bg-[#FF8C42]">
                <Icon icon={User02Icon} className="size-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-[#3D2B1F]">admin</span>
              <RoleBadge userRole="admin" />
            </div>
          </div>
        </header>

        {/* Tab content */}
        <main className="flex-1 overflow-y-auto p-6">
          {tab === "overview" && <OverviewTab data={data} />}
          {tab === "orders" && <OrdersTable orders={data.orders} />}
          {tab === "feedback" && <FeedbackTable feedback={data.feedback} />}
          {tab === "users" && <UsersTable users={data.users} />}
        </main>
      </div>
    </div>
  )
}
