"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
  iconClassName?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  iconClassName,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4",
          iconClassName
        )}
      >
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">{description}</p>
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          {action.label}
        </Button>
      )}
    </motion.div>
  )
}
