"use client"

import { motion } from "framer-motion"
import { AlertTriangle, TrendingUp, BookOpen } from "lucide-react"

export function FeatureInsight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="relative glass-card rounded-xl p-6 overflow-hidden"
    >
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]" />
      
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">Critical Bias Insight</h3>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                High Priority
              </span>
            </div>
            <p className="text-xl text-foreground mb-4">
              Model is <span className="text-yellow-400 font-semibold">over-prioritizing CGPA</span> over practical skills and experience.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Our analysis shows that candidates with CGPA above 8.5 are 3.2x more likely to be selected, 
              regardless of their actual skill levels or work experience. This creates an unfair advantage 
              for academic performers while potentially missing highly capable candidates with practical expertise.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-muted-foreground">
                  CGPA weight: <span className="text-foreground font-medium">42%</span> (recommended: 15-20%)
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  Skills weight: <span className="text-foreground font-medium">18%</span> (recommended: 35-40%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
