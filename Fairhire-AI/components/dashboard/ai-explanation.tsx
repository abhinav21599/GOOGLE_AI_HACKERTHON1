"use client"

import { motion } from "framer-motion"
import { Bot, Sparkles, Copy, Check, ChevronDown, ChevronUp, Send, Loader2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  role: "assistant" | "user"
  content: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: "I've analyzed your hiring dataset and found several concerning patterns. Here's what the data reveals:",
  },
  {
    id: 2,
    role: "assistant",
    content: "**Primary Bias Factor:** CGPA is weighted at 42% of the decision, significantly higher than industry standards (15-20%). This creates a strong academic bias in your selection process.",
  },
  {
    id: 3,
    role: "assistant",
    content: "**Gender Disparity:** Male candidates have a 16% higher selection rate than female candidates with similar qualifications. This suggests implicit bias in the evaluation criteria.",
  },
  {
    id: 4,
    role: "assistant",
    content: "**College Tier Impact:** Candidates from Tier 1 colleges are 2.4x more likely to be selected, even when controlling for skills and experience. This may exclude qualified candidates from diverse backgrounds.",
  },
]

const simulatedResponses = [
  "Based on your dataset, the primary driver of bias is the CGPA weighting. Reducing it to 15-20% could improve your fairness score by approximately 8-12 points.",
  "The gender disparity you're seeing is statistically significant. Blind CV screening during the initial review stage typically reduces this kind of bias by 30-40%.",
  "I recommend starting with the highest-impact change first: rebalancing the CGPA weight. This single change addresses 42% of the detected bias in your dataset.",
  "Your skills assessment is actually one of the fairer components — it shows only 7% variance across demographic groups. This is a good foundation to build on.",
]

function formatContent(content: string) {
  return content.split("**").map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-primary">
        {part}
      </span>
    ) : (
      part
    )
  )
}

export function AIExplanation() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [expanded, setExpanded] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expanded) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, expanded])

  const copyMessage = (id: number, content: string) => {
    navigator.clipboard.writeText(content.replace(/\*\*/g, ""))
    setCopiedId(id)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopiedId(null), 2000)
  }

  const sendMessage = async () => {
    const trimmed = inputValue.trim()
    if (!trimmed || isTyping) return

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
    }
    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response — replace with real API call later
    await new Promise((r) => setTimeout(r, 1200))
    const response = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)]
    const aiMsg: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: response,
    }
    setMessages((prev) => [...prev, aiMsg])
    setIsTyping(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Explanation</h3>
            <p className="text-xs text-muted-foreground">Powered by FairHire AI</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-secondary/50"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <>
          <div className="p-4 space-y-4 max-h-72 overflow-y-auto">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index < initialMessages.length ? 0.8 + index * 0.1 : 0 }}
                className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    message.role === "assistant"
                      ? "bg-gradient-to-br from-primary/20 to-accent/20"
                      : "bg-secondary"
                  )}
                >
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className={cn("flex-1 group relative", message.role === "user" && "flex justify-end")}>
                  <div
                    className={cn(
                      "glass rounded-xl p-3 text-sm leading-relaxed max-w-full",
                      message.role === "user" ? "rounded-tr-none bg-primary/10" : "rounded-tl-none"
                    )}
                  >
                    <p className="text-foreground">{formatContent(message.content)}</p>
                  </div>
                  {message.role === "assistant" && (
                    <button
                      onClick={() => copyMessage(message.id, message.content)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-secondary/70"
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-muted-foreground" />
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="glass rounded-xl rounded-tl-none p-3 flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-primary rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about the bias analysis..."
                className="flex-1 h-9 px-3 rounded-lg bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="h-9 w-9 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </>
      )}

      {!expanded && (
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>AI analysis complete — click to expand</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}
