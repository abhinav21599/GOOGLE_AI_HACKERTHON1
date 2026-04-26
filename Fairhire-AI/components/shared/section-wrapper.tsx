"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  title?: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
  delay?: number
}

export function SectionWrapper({
  title,
  description,
  actions,
  children,
  className,
  delay = 0,
}: SectionWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("space-y-4", className)}
    >
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {(title || description) && (
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
              )}
            </div>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </motion.section>
  )
}
