"use client"

import { motion } from "framer-motion"

const companies = [
  "Acme Corp",
  "GlobalTech",
  "InnovateCo",
  "FutureLabs",
  "NextGen Inc",
  "DataDriven",
]

export function TrustSection() {
  return (
    <section id="trust" className="py-32 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Trusted by Industry Leaders</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Used by Global Companies
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="glass-card rounded-xl px-8 py-4 hover:border-primary/30 transition-all duration-300">
                <span className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  {company}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-20"
        >
          {[
            { value: "500+", label: "Enterprises" },
            { value: "10M+", label: "Hiring Decisions Audited" },
            { value: "99.9%", label: "Uptime SLA" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
