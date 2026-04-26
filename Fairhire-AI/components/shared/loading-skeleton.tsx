"use client"

import { cn } from "@/lib/utils"

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-secondary/60",
        className
      )}
    />
  )
}

export function MetricCardSkeleton() {
  return (
    <div className="glass-card rounded-xl p-5 space-y-3">
      <div className="flex items-start justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-14 h-4 rounded-full" />
      </div>
      <Skeleton className="w-24 h-3 mt-2" />
      <Skeleton className="w-16 h-7" />
    </div>
  )
}

export function MetricsGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <MetricCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="glass-card rounded-xl p-6 space-y-4">
      <div className="space-y-1">
        <Skeleton className="w-40 h-5" />
        <Skeleton className="w-56 h-3" />
      </div>
      <Skeleton className="w-full h-64 rounded-lg" />
    </div>
  )
}

export function ChartsGridSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <ChartSkeleton key={i} />
      ))}
    </div>
  )
}

export function ListItemSkeleton() {
  return (
    <div className="flex items-start gap-4 p-4">
      <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-2/3 h-3" />
      </div>
      <Skeleton className="w-20 h-6 rounded-full shrink-0" />
    </div>
  )
}

export function ListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="glass-card rounded-xl overflow-hidden divide-y divide-border">
      {Array.from({ length: count }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </div>
  )
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-48 h-8" />
      <Skeleton className="w-72 h-4" />
    </div>
  )
}
