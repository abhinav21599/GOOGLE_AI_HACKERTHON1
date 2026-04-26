"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
  /** Delay between each child animation (seconds) */
  staggerDelay?: number
  /** Initial animation delay (seconds) */
  initialDelay?: number
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: (stagger: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger,
    },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export function AnimatedContainer({
  children,
  className,
  staggerDelay = 0.08,
  initialDelay = 0,
}: AnimatedContainerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      custom={staggerDelay}
      initial="hidden"
      animate="show"
      transition={{ delayChildren: initialDelay }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
