"use client"

import { motion } from "framer-motion"
import { Upload, Search, Lightbulb, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Data",
    description: "Securely upload your hiring dataset in CSV format. All data is encrypted and processed in compliance with GDPR.",
  },
  {
    icon: Search,
    step: "02",
    title: "Analyze",
    description: "Our AI engine analyzes your data across multiple fairness dimensions and identifies potential biases.",
  },
  {
    icon: Lightbulb,
    step: "03",
    title: "Get Insights",
    description: "Receive detailed explanations of detected biases with clear visualizations and impact assessments.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Improve Decisions",
    description: "Implement our actionable recommendations to create a more fair and equitable hiring process.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[128px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Get started in minutes with our simple four-step process to audit your hiring system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
