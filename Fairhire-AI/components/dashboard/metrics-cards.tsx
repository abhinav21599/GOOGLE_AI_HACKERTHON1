"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, AlertTriangle, Shield, BarChart3, Target } from "lucide-react"

const metrics = [
  {
    label: "Fairness Score",
    value: "78%",
    change: "+5%",
    trend: "up",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Bias Severity",
    value: "Medium",
    change: "Improved",
    trend: "up",
    icon: AlertTriangle,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
  {
    label: "Attributes Analyzed",
    value: "6",
    change: "Gender, College, Skills, Experience, CGPA, Achievements",
    trend: "neutral",
    icon: BarChart3,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    label: "Risk Level",
    value: "Moderate",
    change: "-2 points",
    trend: "down",
    icon: Target,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
]

export function MetricsCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.98 }}
          className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all duration-300 cursor-default"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
            {metric.trend === "up" && (
              <div className="flex items-center gap-1 text-green-400 text-xs">
                <TrendingUp className="w-3 h-3" />
                <span>{metric.change}</span>
              </div>
            )}
            {metric.trend === "down" && (
              <div className="flex items-center gap-1 text-red-400 text-xs">
                <TrendingDown className="w-3 h-3" />
                <span>{metric.change}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
          <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
          {metric.trend === "neutral" && (
            <p className="text-xs text-muted-foreground mt-2 truncate">{metric.change}</p>
          )}
        </motion.div>
      ))}
    </div>
  )
}
