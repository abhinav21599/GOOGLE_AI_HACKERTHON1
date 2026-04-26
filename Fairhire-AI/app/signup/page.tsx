"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Eye, EyeOff, ArrowLeft, Check, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid work email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const watchedPassword = watch("password", "")
  const watchedConfirm = watch("confirmPassword", "")

  const passwordRequirements = [
    { text: "At least 8 characters", met: watchedPassword.length >= 8 },
    { text: "One uppercase letter", met: /[A-Z]/.test(watchedPassword) },
    { text: "One number", met: /[0-9]/.test(watchedPassword) },
    { text: "Passwords match", met: watchedPassword === watchedConfirm && watchedPassword.length > 0 },
  ]

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Store user session in localStorage
      const user = {
        email: data.email,
        name: data.fullName,
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('fairhire_user', JSON.stringify(user))
      
      toast.success("Account created!", {
        description: `Welcome to FairHire AI, ${data.fullName.split(" ")[0]}!`,
      })
      router.push("/dashboard")
    } catch {
      toast.error("Sign up failed", { description: "Something went wrong. Please try again." })
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Simulate Google sign-up
      const user = {
        email: 'user@gmail.com',
        name: 'Google User',
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
        provider: 'google'
      }
      localStorage.setItem('fairhire_user', JSON.stringify(user))
      
      toast.success("Account created!", { description: "Signed up with Google" })
      router.push("/dashboard")
    } catch {
      toast.error("Google sign-up failed", { description: "Please try again." })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side — Gradient & Feature list */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-accent/20 via-background to-primary/20 p-12 flex-col justify-between">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />

        <Link href="/" className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-foreground">FairHire AI</span>
        </Link>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
              Start building fairer hiring systems today
            </h2>
            <p className="text-muted-foreground text-lg">
              Get started for free. No credit card required. Full access to all features for 14 days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 space-y-4"
          >
            {[
              "Unlimited bias audits",
              "AI-powered explanations",
              "Team collaboration tools",
              "Priority support",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <p className="relative z-10 text-sm text-muted-foreground">
          Join 10,000+ HR professionals using FairHire AI
        </p>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Start your free 14-day trial</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="fullName">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Jane Smith"
                {...register("fullName")}
                className={`h-12 bg-secondary/50 border-border focus:border-primary transition-colors ${
                  errors.fullName ? "border-destructive" : ""
                }`}
                disabled={isLoading}
              />
              {errors.fullName && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive">
                  {errors.fullName.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Work Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                className={`h-12 bg-secondary/50 border-border focus:border-primary transition-colors ${
                  errors.email ? "border-destructive" : ""
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive">
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password")}
                  className={`h-12 bg-secondary/50 border-border focus:border-primary transition-colors pr-12 ${
                    errors.password ? "border-destructive" : ""
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive">
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={`h-12 bg-secondary/50 border-border focus:border-primary transition-colors ${
                  errors.confirmPassword ? "border-destructive" : ""
                }`}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive">
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="grid grid-cols-2 gap-2">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${req.met ? "bg-green-500/20" : "bg-secondary"}`}>
                    {req.met && <Check className="w-3 h-3 text-green-400" />}
                  </div>
                  <span className={`text-xs transition-colors ${req.met ? "text-green-400" : "text-muted-foreground"}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-base font-medium"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full h-12 glass border-border/50 hover:bg-secondary/50"
              disabled={isLoading}
              onClick={handleGoogleSignUp}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Button>
          </motion.div>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
          <p className="text-center mt-4 text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
