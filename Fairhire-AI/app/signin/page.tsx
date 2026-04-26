"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Store user session in localStorage
      const user = {
        email: data.email,
        name: data.email.split('@')[0],
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      }
      localStorage.setItem('fairhire_user', JSON.stringify(user))
      
      toast.success("Welcome back!", { description: `Signed in as ${data.email}` })
      router.push("/dashboard")
    } catch {
      toast.error("Sign in failed", { description: "Please check your credentials and try again." })
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Simulate Google sign-in
      const user = {
        email: 'user@gmail.com',
        name: 'Google User',
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
        provider: 'google'
      }
      localStorage.setItem('fairhire_user', JSON.stringify(user))
      
      toast.success("Welcome!", { description: "Signed in with Google" })
      router.push("/dashboard")
    } catch {
      toast.error("Google sign-in failed", { description: "Please try again." })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side — Gradient & Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-primary/20 via-background to-accent/20 p-12 flex-col justify-between">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-[100px]" />

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
              Build fair hiring systems with confidence
            </h2>
            <p className="text-muted-foreground text-lg">
              Join 500+ enterprises already using FairHire AI to audit and improve their hiring decisions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 glass-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-foreground">Fairness Score Improved</p>
                <p className="text-sm text-muted-foreground">From 72% to 94% in 2 weeks</p>
              </div>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[94%] bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>
          </motion.div>
        </div>

        <p className="relative z-10 text-sm text-muted-foreground">
          Enterprise-grade security with SOC 2 Type II compliance
        </p>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                className={`h-12 bg-secondary/50 border-border focus:border-primary transition-colors ${
                  errors.email ? "border-destructive focus:border-destructive" : ""
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive mt-1"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground" htmlFor="password">
                  Password
                </label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`h-12 bg-secondary/50 border-border focus:border-primary transition-colors pr-12 ${
                    errors.password ? "border-destructive focus:border-destructive" : ""
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
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive mt-1"
                >
                  {errors.password.message}
                </motion.p>
              )}
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
                    Signing in...
                  </>
                ) : (
                  "Sign In"
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
              onClick={handleGoogleSignIn}
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

          <p className="text-center mt-8 text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
