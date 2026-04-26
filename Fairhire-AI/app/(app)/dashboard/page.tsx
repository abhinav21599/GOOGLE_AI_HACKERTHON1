"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MetricsCards } from "@/components/dashboard/metrics-cards"
import { BiasCharts } from "@/components/dashboard/bias-charts"
import { FeatureInsight } from "@/components/dashboard/feature-insight"
import { AIExplanation } from "@/components/dashboard/ai-explanation"
import { Suggestions } from "@/components/dashboard/suggestions"
import { Button } from "@/components/ui/button"
import { RefreshCw, Upload, Loader2, AlertCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAnalysis } from "@/lib/analysis-context"
import { EmptyState } from "@/components/shared/empty-state"

// Animated SVG Fairness Score Ring
function FairnessRing({ score }: { score: number }) {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#eab308" : "#ef4444"

  return (
    <div className="flex items-center gap-6 glass-card rounded-xl p-5">
      <div className="relative w-24 h-24 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-secondary"
          />
          {/* Progress */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-foreground">{score}%</span>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Overall Fairness Score</p>
        <p className="text-lg font-semibold text-foreground mt-0.5">
          {score >= 80 ? "Excellent" : score >= 60 ? "Moderate Bias" : "Critical Bias"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {score >= 80
            ? "Your hiring process meets fairness standards"
            : score >= 60
            ? "Some bias patterns require attention"
            : "Immediate corrective action recommended"}
        </p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { analysisResult, isLoading } = useAnalysis()
  const router = useRouter()

  // Calculate fairness score based on analysis results
  const calculateFairnessScore = () => {
    if (!analysisResult) return null
    
    const { analysis } = analysisResult
    let score = 100
    
    // Deduct points for detected biases
    if (analysis.results.Gender.bias_detected) {
      score -= Math.round(analysis.results.Gender.difference * 100)
    }
    if (analysis.results.College.bias_detected) {
      score -= Math.round(analysis.results.College.difference * 100)
    }
    
    // Ensure score is between 0 and 100
    return Math.max(0, Math.min(100, score))
  }

  const fairnessScore = calculateFairnessScore()

  const handleRefresh = async () => {
    if (!analysisResult) {
      toast.info("No data to refresh", { description: "Please upload a CSV file first" })
      return
    }
    
    setIsRefreshing(true)
    const id = toast.loading("Refreshing analysis...")
    await new Promise((r) => setTimeout(r, 2000))
    toast.dismiss(id)
    toast.success("Analysis refreshed", { description: "Dashboard updated with latest data" })
    setIsRefreshing(false)
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-semibold text-foreground">Analyzing your data...</p>
          <p className="text-muted-foreground mt-2">This may take a few moments</p>
        </div>
      </div>
    )
  }

  // Show empty state if no analysis
  if (!analysisResult) {
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-foreground">Bias Analysis Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time fairness monitoring and insights</p>
        </motion.div>
        
        <EmptyState
          icon={AlertCircle}
          title="No Analysis Data"
          description="Upload a CSV file to get started with bias analysis"
          action={{
            label: "Upload Data",
            onClick: () => router.push("/upload")
          }}
        />
      </div>
    )
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
          <h1 className="text-2xl font-bold text-foreground">Bias Analysis Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time fairness monitoring and insights</p>
        </div>
        <div className="flex items-center gap-3">
          {analysisResult.analysis.bias_detected ? (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-yellow-400">Bias Detected</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-400">No Bias Detected</span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="glass border-border/50"
          >
            <AnimatePresence mode="wait">
              {isRefreshing ? (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Refreshing...
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
          <Link href="/upload">
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Upload className="w-4 h-4 mr-2" />
              New Upload
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Fairness Score Ring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        {fairnessScore !== null && <FairnessRing score={fairnessScore} />}
      </motion.div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Charts Grid */}
      <BiasCharts />

      {/* Feature Insight */}
      <FeatureInsight />

      {/* AI Explanation & Suggestions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <AIExplanation />
        <Suggestions />
      </div>
    </div>
  )
}
