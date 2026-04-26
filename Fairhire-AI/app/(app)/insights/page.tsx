"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Filter,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"

type InsightType = "critical" | "warning" | "info" | "success"
type FilterType = "all" | InsightType

interface Insight {
  id: number
  type: InsightType
  title: string
  description: string
  impact: string
  recommendation: string
  icon: React.ElementType
}

const insights: Insight[] = [
  {
    id: 1,
    type: "critical",
    title: "CGPA Over-Weighting Detected",
    description:
      "The model assigns 42% weight to CGPA, significantly above the recommended 15-20%. This creates unfair advantages for academic performers.",
    impact: "Affects 340 candidates",
    recommendation: "Reduce CGPA weight to 18% and increase skills assessment weight to 35%",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "warning",
    title: "Gender Selection Disparity",
    description:
      "Male candidates have a 16% higher selection rate compared to female candidates with equivalent qualifications.",
    impact: "Affects 180 candidates",
    recommendation: "Implement blind screening for initial application review",
    icon: AlertTriangle,
  },
  {
    id: 3,
    type: "info",
    title: "College Tier Bias",
    description:
      "Tier 1 college graduates are 2.4x more likely to be selected, regardless of actual skill levels.",
    impact: "Affects 420 candidates",
    recommendation: "Add skills-based assessments to normalize college tier advantage",
    icon: Lightbulb,
  },
  {
    id: 4,
    type: "success",
    title: "Experience Evaluation Fair",
    description: "Experience-based decisions show minimal bias with only 7% variance across groups.",
    impact: "Positive pattern detected",
    recommendation: "Maintain current experience evaluation methodology",
    icon: CheckCircle2,
  },
  {
    id: 5,
    type: "info",
    title: "Skills Assessment Improvement",
    description:
      "Recent updates to skills assessment have improved fairness by 12% over the last quarter.",
    impact: "Positive trend",
    recommendation: "Continue expanding skill-based evaluation criteria",
    icon: TrendingUp,
  },
]

const trendData = [
  { month: "Jul", score: 65 },
  { month: "Aug", score: 68 },
  { month: "Sep", score: 73 },
  { month: "Oct", score: 70 },
  { month: "Nov", score: 74 },
  { month: "Dec", score: 78 },
]

const filterOptions: { value: FilterType; label: string; count: number }[] = [
  { value: "all", label: "All", count: insights.length },
  { value: "critical", label: "Critical", count: insights.filter((i) => i.type === "critical").length },
  { value: "warning", label: "Warning", count: insights.filter((i) => i.type === "warning").length },
  { value: "info", label: "Info", count: insights.filter((i) => i.type === "info").length },
  { value: "success", label: "Positive", count: insights.filter((i) => i.type === "success").length },
]

const insightAnimations: Record<InsightType, { animate: object; transition?: object }> = {
  critical: {
    animate: { boxShadow: ["0 0 0 0 rgba(239,68,68,0)", "0 0 0 6px rgba(239,68,68,0.08)", "0 0 0 0 rgba(239,68,68,0)"] },
    transition: { duration: 2, repeat: Infinity },
  },
  warning: {
    animate: { opacity: [1, 0.85, 1] },
    transition: { duration: 2, repeat: Infinity },
  },
  info: { animate: {} },
  success: { animate: {} },
}

const typeColors: Record<InsightType, { border: string; icon: string; badge: string }> = {
  critical: {
    border: "border-l-4 border-l-red-500",
    icon: "bg-red-500/10",
    badge: "bg-red-500/20 text-red-400",
  },
  warning: {
    border: "border-l-4 border-l-yellow-500",
    icon: "bg-yellow-500/10",
    badge: "bg-yellow-500/20 text-yellow-400",
  },
  info: {
    border: "border-l-4 border-l-primary",
    icon: "bg-primary/10",
    badge: "bg-primary/20 text-primary",
  },
  success: {
    border: "border-l-4 border-l-green-500",
    icon: "bg-green-500/10",
    badge: "bg-green-500/20 text-green-400",
  },
}

const iconColors: Record<InsightType, string> = {
  critical: "text-red-400",
  warning: "text-yellow-400",
  info: "text-primary",
  success: "text-green-400",
}

export default function InsightsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [isGenerating, setIsGenerating] = useState(false)

  const filtered =
    activeFilter === "all" ? insights : insights.filter((i) => i.type === activeFilter)

  const handleGeneratePlan = async () => {
    setIsGenerating(true)
    const id = toast.loading("Generating your action plan...")
    await new Promise((r) => setTimeout(r, 2000))
    toast.dismiss(id)
    toast.success("Action plan ready!", {
      description: "5 prioritised steps have been added to your recommendations.",
    })
    setIsGenerating(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Insights</h1>
          <p className="text-muted-foreground mt-1">AI-powered analysis and recommendations</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Showing {filtered.length} insight{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </motion.div>

      {/* Fairness Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Fairness Trend</h2>
            <p className="text-sm text-muted-foreground">6-month overview</p>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">+13% improvement</span>
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 h-32">
          {trendData.map((item, index) => (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.score}%` }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg relative group cursor-pointer"
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity glass rounded-md px-2 py-1 text-xs font-medium text-foreground whitespace-nowrap">
                  {item.score}%
                </div>
              </motion.div>
              <span className="text-xs text-muted-foreground">{item.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex items-center gap-2 flex-wrap"
      >
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActiveFilter(opt.value)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeFilter === opt.value
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "glass text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            {opt.label}
            <span
              className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                activeFilter === opt.value ? "bg-white/20" : "bg-secondary"
              )}
            >
              {opt.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Insights Grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card rounded-xl p-12 text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">No insights in this category</p>
            <p className="text-sm text-muted-foreground mt-1">Try selecting a different filter</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((insight, index) => {
              const colors = typeColors[insight.type]
              const anim = insightAnimations[insight.type]
              return (
                <motion.div
                  key={insight.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, ...anim.animate }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: index * 0.06, ...(anim.transition ?? {}) }}
                  className={cn("glass-card rounded-xl p-6 relative overflow-hidden", colors.border)}
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", colors.icon)}>
                      <insight.icon className={cn("w-6 h-6", iconColors[insight.type])} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                        </div>
                        <span className={cn("px-3 py-1 rounded-full text-xs font-medium shrink-0", colors.badge)}>
                          {insight.impact}
                        </span>
                      </div>

                      <div className="glass rounded-lg p-3 flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">AI Recommendation</p>
                          <p className="text-sm text-foreground">{insight.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Action CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="glass-card rounded-xl p-6 text-center"
      >
        <h3 className="text-lg font-semibold text-foreground mb-2">Ready to improve?</h3>
        <p className="text-muted-foreground mb-4">
          Implement our recommendations to achieve a fairness score above 90%
        </p>
        <Button
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          onClick={handleGeneratePlan}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              Generate Action Plan
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  )
}
