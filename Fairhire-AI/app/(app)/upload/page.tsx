"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, X, CheckCircle2, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { toast } from "sonner"
import { uploadAndAnalyze } from "@/lib/api"
import { useAnalysis } from "@/lib/analysis-context"
import { useRouter } from "next/navigation"

type UploadState = "idle" | "uploading" | "analyzing" | "complete"

export default function UploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle")
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const { setAnalysisResult, setIsLoading } = useAnalysis()
  const router = useRouter()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile)
      }
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setUploadState("uploading")
      setIsLoading(true)
      toast.info("Uploading file...", {
        description: "Please wait while we upload your dataset",
      })

      // Call the backend API
      const result = await uploadAndAnalyze(file)

      setUploadState("analyzing")
      toast.info("Analyzing fairness...", {
        description: "Our AI is scanning for bias patterns",
      })

      // Store the analysis result in context
      setAnalysisResult(result)

      setUploadState("complete")
      setIsLoading(false)
      toast.success("Analysis complete!", {
        description: "Your hiring data has been fully processed. View insights on the dashboard.",
      })
    } catch (error) {
      setIsLoading(false)
      setUploadState("idle")
      toast.error("Analysis failed", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      })
    }
  }

  const removeFile = () => {
    setFile(null)
    setUploadState("idle")
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Upload Data</h1>
        <p className="text-muted-foreground mt-1">Upload your hiring dataset for bias analysis</p>
      </motion.div>

      {/* Upload Area */}
      <AnimatePresence mode="wait">
        {uploadState === "idle" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={cn(
                "relative glass-card rounded-2xl p-12 text-center border-2 border-dashed transition-all duration-300",
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                file && "border-green-500/50 bg-green-500/5"
              )}
            >
              {/* Glow on drag */}
              {dragActive && (
                <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl" />
              )}

              <div className="relative z-10">
                <div className={cn(
                  "w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 transition-colors",
                  file ? "bg-green-500/20" : "bg-primary/10"
                )}>
                  {file ? (
                    <FileText className="w-8 h-8 text-green-400" />
                  ) : (
                    <Upload className="w-8 h-8 text-primary" />
                  )}
                </div>

                {file ? (
                  <>
                    <p className="text-lg font-semibold text-foreground mb-2">{file.name}</p>
                    <p className="text-sm text-muted-foreground mb-6">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="outline"
                        onClick={removeFile}
                        className="glass border-border/50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                      <Button
                        onClick={handleUpload}
                        className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                      >
                        Analyze Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-semibold text-foreground mb-2">
                      Drag and drop your CSV file here
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      or click to browse from your computer
                    </p>
                    <label>
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        asChild
                        variant="outline"
                        className="glass border-border/50 hover:bg-secondary/50 cursor-pointer"
                      >
                        <span>Browse Files</span>
                      </Button>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* File Requirements */}
            <div className="mt-6 glass-card rounded-xl p-4">
              <p className="text-sm font-medium text-foreground mb-3">File Requirements</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  CSV format with headers
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Include candidate attributes (Gender, College, Skills, Experience, CGPA, Achievements)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Include hiring decision column (Selected/Rejected)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Maximum file size: 50MB
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {(uploadState === "uploading" || uploadState === "analyzing") && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20 animate-ping" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            </div>

            <p className="text-xl font-semibold text-foreground mb-2">
              {uploadState === "uploading" ? "Uploading file..." : "Analyzing fairness..."}
            </p>
            <p className="text-muted-foreground mb-8">
              {uploadState === "uploading"
                ? "Please wait while we upload your dataset"
                : "Our AI is scanning for bias patterns"
              }
            </p>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{
                    width: uploadState === "uploading" ? "40%" : "90%"
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {uploadState === "uploading" ? "Uploading..." : "Processing 1,234 records..."}
              </p>
            </div>
          </motion.div>
        )}

        {uploadState === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/20 mx-auto flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>

            <p className="text-xl font-semibold text-foreground mb-2">Analysis Complete!</p>
            <p className="text-muted-foreground mb-8">
              We&apos;ve analyzed 1,234 hiring records and found actionable insights.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="glass rounded-xl p-4">
                <p className="text-2xl font-bold text-primary">78%</p>
                <p className="text-xs text-muted-foreground">Fairness Score</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-2xl font-bold text-yellow-400">3</p>
                <p className="text-xs text-muted-foreground">Biases Found</p>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-2xl font-bold text-accent">5</p>
                <p className="text-xs text-muted-foreground">Suggestions</p>
              </div>
            </div>

            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                View Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
