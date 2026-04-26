"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { useState, useEffect } from "react"

// Pre-computed particle positions to avoid hydration mismatch
const PARTICLES = [
  { left: 5, top: 12, yOffset: -320, duration: 15, delay: 0.5 },
  { left: 15, top: 45, yOffset: -280, duration: 18, delay: 1.2 },
  { left: 25, top: 78, yOffset: -450, duration: 12, delay: 2.1 },
  { left: 35, top: 23, yOffset: -380, duration: 16, delay: 0.8 },
  { left: 45, top: 56, yOffset: -420, duration: 14, delay: 3.5 },
  { left: 55, top: 89, yOffset: -350, duration: 19, delay: 1.8 },
  { left: 65, top: 34, yOffset: -290, duration: 17, delay: 4.2 },
  { left: 75, top: 67, yOffset: -400, duration: 13, delay: 2.5 },
  { left: 85, top: 15, yOffset: -480, duration: 11, delay: 0.3 },
  { left: 95, top: 42, yOffset: -360, duration: 20, delay: 3.8 },
  { left: 10, top: 75, yOffset: -310, duration: 15, delay: 1.5 },
  { left: 20, top: 28, yOffset: -440, duration: 18, delay: 4.5 },
  { left: 30, top: 61, yOffset: -270, duration: 16, delay: 2.8 },
  { left: 40, top: 94, yOffset: -390, duration: 14, delay: 0.9 },
  { left: 50, top: 17, yOffset: -460, duration: 12, delay: 3.2 },
  { left: 60, top: 50, yOffset: -330, duration: 19, delay: 1.1 },
  { left: 70, top: 83, yOffset: -410, duration: 17, delay: 4.0 },
  { left: 80, top: 36, yOffset: -300, duration: 13, delay: 2.3 },
  { left: 90, top: 69, yOffset: -470, duration: 11, delay: 0.7 },
  { left: 8, top: 52, yOffset: -340, duration: 20, delay: 3.0 },
]

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      
      {/* Animated Particles - only render after hydration */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, particle.yOffset],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Trusted by 500+ enterprises</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            <span className="text-foreground">Make AI Hiring</span>
            <br />
            <span className="gradient-text">Fair. Transparent. Trustworthy.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance"
          >
            Audit, explain, and fix bias in automated hiring decisions. 
            Build trust with candidates and ensure compliance with AI regulations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all glow-primary px-8 h-12 text-base">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg" className="glass border-border/50 hover:bg-secondary/50 px-8 h-12 text-base">
                <Play className="mr-2 w-4 h-4" />
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card rounded-2xl p-2 glow-primary">
              <div className="bg-card rounded-xl overflow-hidden border border-border/50">
                <DashboardPreview />
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-1/4 glass-card rounded-xl p-4 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Bias Detected</p>
                  <p className="text-xs text-muted-foreground">CGPA weight reduced</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 top-1/3 glass-card rounded-xl p-4 hidden lg:block"
            >
              <div className="text-center">
                <p className="text-2xl font-bold gradient-text">94%</p>
                <p className="text-xs text-muted-foreground">Fairness Score</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div className="p-6 bg-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Bias Analysis Dashboard</h3>
          <p className="text-sm text-muted-foreground">Real-time fairness monitoring</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
          <span className="w-2 h-2 bg-yellow-400 rounded-full" />
          <span className="text-sm text-yellow-400">Bias Detected</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Fairness Score", value: "78%", color: "text-primary" },
          { label: "Bias Severity", value: "Medium", color: "text-yellow-400" },
          { label: "Attributes", value: "5", color: "text-foreground" },
          { label: "Risk Level", value: "Moderate", color: "text-orange-400" },
        ].map((stat) => (
          <div key={stat.label} className="glass-card rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
            <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-3">Gender Distribution</p>
          <div className="flex items-end gap-2 h-20">
            {[60, 80, 45, 70, 55, 90, 65].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm font-medium text-foreground mb-3">Selection Rate by Attribute</p>
          <div className="flex items-end gap-2 h-20">
            {[75, 50, 85, 60, 70, 45, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-accent to-primary rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
