"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  X,
  BarChart2,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts"

interface Report {
  id: number
  name: string
  date: string
  status: string
  fairnessScore: number
  change: number
  trend: "up" | "down" | "neutral"
  attributes: string[]
}

interface AttributeItem {
  attribute: string
  biasScore: number
  selectionRate: Record<string, number>
  severity: "Critical" | "High" | "Medium" | "Low"
}

const reports: Report[] = [
  {
    id: 1,
    name: "Q4 2024 Bias Analysis",
    date: "Dec 15, 2024",
    status: "completed",
    fairnessScore: 78,
    change: 5,
    trend: "up",
    attributes: ["Gender", "College", "CGPA", "Experience", "Skills"],
  },
  {
    id: 2,
    name: "Q3 2024 Bias Analysis",
    date: "Sep 30, 2024",
    status: "completed",
    fairnessScore: 73,
    change: -2,
    trend: "down",
    attributes: ["Gender", "College", "CGPA", "Experience"],
  },
  {
    id: 3,
    name: "Q2 2024 Bias Analysis",
    date: "Jun 28, 2024",
    status: "completed",
    fairnessScore: 75,
    change: 8,
    trend: "up",
    attributes: ["Gender", "College", "CGPA"],
  },
  {
    id: 4,
    name: "Engineering Dept Audit",
    date: "Nov 20, 2024",
    status: "completed",
    fairnessScore: 82,
    change: 0,
    trend: "neutral",
    attributes: ["Gender", "Skills", "Experience"],
  },
  {
    id: 5,
    name: "Sales Hiring Review",
    date: "Oct 15, 2024",
    status: "completed",
    fairnessScore: 68,
    change: -5,
    trend: "down",
    attributes: ["Gender", "College", "Experience"],
  },
]

const attributeData: AttributeItem[] = [
  { attribute: "Gender", biasScore: 32, selectionRate: { male: 68, female: 52 }, severity: "High" },
  { attribute: "College Tier", biasScore: 45, selectionRate: { tier1: 78, tier2: 55 }, severity: "Critical" },
  { attribute: "CGPA", biasScore: 58, selectionRate: { high: 88, low: 25 }, severity: "Critical" },
  { attribute: "Experience", biasScore: 15, selectionRate: { senior: 72, junior: 65 }, severity: "Low" },
  { attribute: "Skills", biasScore: 22, selectionRate: { technical: 70, soft: 58 }, severity: "Medium" },
]

const severityColors = {
  Critical: "bg-red-500/20 text-red-400",
  High: "bg-orange-500/20 text-orange-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  Low: "bg-green-500/20 text-green-400",
}

function ReportModal({ report, onClose }: { report: Report; onClose: () => void }) {
  const [downloading, setDownloading] = useState(false)

  const chartData = report.attributes.map((attr) => ({
    name: attr,
    score: Math.floor(Math.random() * 60) + 20,
  }))

  const handleDownload = async () => {
    setDownloading(true)
    await new Promise((r) => setTimeout(r, 1500))
    toast.success("Report downloaded!", {
      description: `${report.name}.pdf saved to your downloads.`,
    })
    setDownloading(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        className="glass-card rounded-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between p-6 border-b border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{report.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{report.date}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Fairness score */}
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Fairness Score</p>
              <p
                className={cn(
                  "text-3xl font-bold",
                  report.fairnessScore >= 75
                    ? "text-green-400"
                    : report.fairnessScore >= 60
                    ? "text-yellow-400"
                    : "text-red-400"
                )}
              >
                {report.fairnessScore}%
              </p>
            </div>
            <div className={cn("flex items-center gap-1.5", report.change > 0 ? "text-green-400" : report.change < 0 ? "text-red-400" : "text-muted-foreground")}>
              {report.trend === "up" && <TrendingUp className="w-5 h-5" />}
              {report.trend === "down" && <TrendingDown className="w-5 h-5" />}
              <span className="font-medium text-sm">
                {report.change > 0 ? "+" : ""}{report.change}% from previous
              </span>
            </div>
          </div>

          {/* Mini chart */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Bias Scores by Attribute</p>
            </div>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "oklch(0.16 0.018 265)",
                      border: "1px solid oklch(0.25 0.02 265)",
                      borderRadius: "8px",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="score" name="Bias Score" fill="oklch(0.65 0.25 265)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Attributes */}
          <div className="flex flex-wrap gap-1.5">
            {report.attributes.map((attr) => (
              <span key={attr} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                {attr}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 p-6 border-t border-border">
          <Button variant="outline" className="flex-1 glass border-border/50" onClick={onClose}>
            Close
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleExportAll = async () => {
    setIsExporting(true)
    const id = toast.loading("Preparing export...")
    await new Promise((r) => setTimeout(r, 2000))
    toast.dismiss(id)
    toast.success("Export ready!", { description: "All reports packaged as fairhire-reports.zip" })
    setIsExporting(false)
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    await new Promise((r) => setTimeout(r, 1500))
    toast.success("Attribute breakdown downloaded!", { description: "attribute-breakdown.pdf" })
    setIsDownloading(false)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">View detailed bias analysis reports</p>
          </div>
          <Button
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            onClick={handleExportAll}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export All
              </>
            )}
          </Button>
        </motion.div>

        {/* Reports Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Report History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-xl overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Report History</h2>
              <p className="text-xs text-muted-foreground mt-1">Click any report to view details</p>
            </div>
            <div className="divide-y divide-border">
              {reports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  onClick={() => setSelectedReport(report)}
                  className="p-4 hover:bg-secondary/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {report.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{report.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <span
                          className={cn(
                            "text-lg font-bold",
                            report.fairnessScore >= 75
                              ? "text-green-400"
                              : report.fairnessScore >= 60
                              ? "text-yellow-400"
                              : "text-red-400"
                          )}
                        >
                          {report.fairnessScore}%
                        </span>
                        {report.trend === "up" && <TrendingUp className="w-4 h-4 text-green-400" />}
                        {report.trend === "down" && <TrendingDown className="w-4 h-4 text-red-400" />}
                      </div>
                      <span
                        className={cn(
                          "text-xs",
                          report.change > 0
                            ? "text-green-400"
                            : report.change < 0
                            ? "text-red-400"
                            : "text-muted-foreground"
                        )}
                      >
                        {report.change > 0 ? "+" : ""}
                        {report.change}% from previous
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {report.attributes.map((attr) => (
                      <span key={attr} className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                        {attr}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="glass-card rounded-xl overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Attribute Breakdown</h2>
              <p className="text-xs text-muted-foreground mt-1">Bias analysis by attribute</p>
            </div>
            <div className="p-4 space-y-4">
              {attributeData.map((item, index) => (
                <motion.div
                  key={item.attribute}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{item.attribute}</p>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", severityColors[item.severity])}>
                        {item.severity}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Bias Score: <span className="text-foreground font-medium">{item.biasScore}</span>
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.biasScore}%` }}
                      transition={{ duration: 0.7, delay: 0.4 + index * 0.05, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full",
                        item.biasScore >= 40 ? "bg-red-500" : item.biasScore >= 25 ? "bg-yellow-500" : "bg-green-500"
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span>Lower is better</span>
                    <span>{item.biasScore}% disparity detected</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full glass border-border/50 hover:bg-secondary/50"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    Download PDF Report
                    <Download className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Report Detail Modal */}
      <AnimatePresence>
        {selectedReport && (
          <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
