"use client"

import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const genderData = [
  { name: "Male", selected: 68, rejected: 32 },
  { name: "Female", selected: 52, rejected: 48 },
  { name: "Non-Binary", selected: 45, rejected: 55 },
]

const collegeData = [
  { name: "Tier 1", rate: 78 },
  { name: "Tier 2", rate: 55 },
  { name: "Tier 3", rate: 32 },
  { name: "Other", rate: 25 },
]

const skillsData = [
  { name: "Python", value: 85 },
  { name: "ML", value: 72 },
  { name: "SQL", value: 68 },
  { name: "Cloud", value: 55 },
  { name: "Soft Skills", value: 42 },
]

const cgpaData = [
  { cgpa: "6.0-6.5", rate: 15 },
  { cgpa: "6.5-7.0", rate: 28 },
  { cgpa: "7.0-7.5", rate: 45 },
  { cgpa: "7.5-8.0", rate: 62 },
  { cgpa: "8.0-8.5", rate: 78 },
  { cgpa: "8.5-9.0", rate: 88 },
  { cgpa: "9.0+", rate: 95 },
]

const COLORS = ["oklch(0.65 0.25 265)", "oklch(0.7 0.2 290)", "oklch(0.65 0.2 195)", "oklch(0.75 0.18 150)"]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color?: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 border border-border">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}: <span className="font-medium text-foreground">{entry.value}%</span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function BiasCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Gender Bias Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-1">Gender Distribution</h3>
        <p className="text-sm text-muted-foreground mb-4">Selection rates by gender identity</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genderData} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="selected" name="Selected" fill="oklch(0.65 0.25 265)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="rejected" name="Rejected" fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* College Bias Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-1">College Tier Bias</h3>
        <p className="text-sm text-muted-foreground mb-4">Selection rate by institution tier</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={collegeData} layout="vertical" barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={12} domain={[0, 100]} />
              <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.4)" fontSize={12} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="rate" name="Selection Rate" fill="oklch(0.7 0.2 290)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Skills vs Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-1">Skills Impact</h3>
        <p className="text-sm text-muted-foreground mb-4">Skill contribution to selection decisions</p>
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={skillsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {skillsData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card rounded-lg p-3 border border-border">
                        <p className="text-sm font-medium text-foreground">{payload[0].name}</p>
                        <p className="text-xs text-muted-foreground">
                          Impact: <span className="font-medium text-foreground">{payload[0].value}%</span>
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {skillsData.map((skill, index) => (
            <div key={skill.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
              <span className="text-xs text-muted-foreground">{skill.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CGPA vs Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="glass-card rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-foreground mb-1">CGPA Correlation</h3>
        <p className="text-sm text-muted-foreground mb-4">Selection rate vs CGPA range</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cgpaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="cgpa" stroke="rgba(255,255,255,0.4)" fontSize={10} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rate"
                name="Selection Rate"
                stroke="oklch(0.65 0.25 265)"
                strokeWidth={3}
                dot={{ fill: "oklch(0.65 0.25 265)", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "oklch(0.7 0.2 290)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}
