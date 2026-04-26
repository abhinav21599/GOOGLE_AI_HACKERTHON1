"use client"

import { motion } from "framer-motion"
import { Shield, BarChart3, Brain, Target } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Bias Detection",
    description: "Automatically identify and flag potential biases in your hiring algorithms across all demographic attributes.",
  },

  {
    icon: BarChart3,
    title: "Multi-Factor Analysis",
    description: "Analyze fairness across gender, education, skills, experience, and CGPA with detailed breakdowns.",
  },
  {
    icon: Brain,
    title: "AI Explanation",
    description: "Get clear, human-readable explanations of why certain decisions were made and what factors contributed.",
  },
  {
    icon: Target,
    title: "Fairness Scoring",
    description: "Comprehensive fairness metrics with actionable recommendations to improve your hiring process.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 relative">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Enterprise-Grade Bias Auditing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Powerful tools to ensure your AI hiring systems are fair, transparent, and compliant with global regulations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
