"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type ImpactLevel = "Critical" | "High" | "Medium"

interface SuggestionItem {
  id: number
  title: string
  description: string
  impact: ImpactLevel
  completed: boolean
}

const initialSuggestions: SuggestionItem[] = [
  {
    id: 1,
    title: "Balance the dataset",
    description: "Ensure equal representation across gender and college tiers in training data",
    impact: "High",
    completed: true,
  },
  {
    id: 2,
    title: "Reduce CGPA weight",
    description: "Lower CGPA influence from 42% to 15-20% in the decision model",
    impact: "Critical",
    completed: false,
  },
  {
    id: 3,
    title: "Include skill-based scoring",
    description: "Add practical assessments and project evaluations to the criteria",
    impact: "High",
    completed: false,
  },
  {
    id: 4,
    title: "Implement blind screening",
    description: "Remove identifying information during initial screening phases",
    impact: "Medium",
    completed: false,
  },
  {
    id: 5,
    title: "Regular bias audits",
    description: "Schedule monthly fairness assessments to track improvements",
    impact: "Medium",
    completed: false,
  },
]

const impactColors: Record<ImpactLevel, string> = {
  Critical: "bg-red-500/20 text-red-400",
  High: "bg-yellow-500/20 text-yellow-400",
  Medium: "bg-blue-500/20 text-blue-400",
}

export function Suggestions() {
  const router = useRouter()
  const [items, setItems] = useState<SuggestionItem[]>(initialSuggestions)
  const [isGenerating, setIsGenerating] = useState(false)

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const newCompleted = !item.completed
        if (newCompleted) {
          toast.success("Recommendation marked complete", {
            description: prev.find((i) => i.id === id)?.title,
          })
        }
        return { ...item, completed: newCompleted }
      })
    )
  }

  const resetAll = () => {
    setItems(initialSuggestions.map((i) => ({ ...i, completed: false })))
    toast.info("Progress reset")
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    const id = toast.loading("Generating report...")
    await new Promise((r) => setTimeout(r, 1800))
    toast.dismiss(id)
    toast.success("Report generated!", {
      description: "Navigating to your reports...",
    })
    router.push("/reports")
  }

  const completedCount = items.filter((item) => item.completed).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Recommendations</h3>
          <p className="text-xs text-muted-foreground">Action items to improve fairness</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {completedCount}/{items.length} done
          </span>
          {completedCount > 0 && (
            <button
              onClick={resetAll}
              className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
              title="Reset progress"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-secondary">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / items.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <div className="p-4 space-y-3 max-h-72 overflow-y-auto">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
            onClick={() => toggleItem(item.id)}
            className={cn(
              "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
              item.completed ? "bg-green-500/5" : "hover:bg-secondary/50"
            )}
          >
            <button className="mt-0.5 shrink-0" onClick={(e) => { e.stopPropagation(); toggleItem(item.id) }}>
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    item.completed ? "text-muted-foreground line-through" : "text-foreground"
                  )}
                >
                  {item.title}
                </p>
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium shrink-0", impactColors[item.impact])}>
                  {item.impact}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-border">
        <Button
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          onClick={handleGenerateReport}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>Generating...</>
          ) : (
            <>
              Generate Report
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
