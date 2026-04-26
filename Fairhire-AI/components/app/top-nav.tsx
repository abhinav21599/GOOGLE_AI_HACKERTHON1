"use client"

import { useState, useEffect } from "react"
import { Bell, Search, Settings, LogOut, User, X, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"

interface User {
  email: string
  name: string
  isAuthenticated: boolean
  loginTime: string
  provider?: string
}

interface TopNavProps {
  /** Optional callback for when sidebar toggle needs to be invoked from top-nav on mobile */
  onMenuToggle?: () => void
}

const initialNotifications = [
  {
    id: 1,
    title: "Bias Alert: Gender Disparity",
    body: "New data shows 16% selection gap for female candidates.",
    time: "2 min ago",
    read: false,
    type: "alert",
  },
  {
    id: 2,
    title: "Analysis Complete",
    body: "Your Q4 2024 dataset has been fully processed.",
    time: "1 hour ago",
    read: false,
    type: "success",
  },
  {
    id: 3,
    title: "Weekly Report Ready",
    body: "Your fairness summary for this week is available.",
    time: "3 hours ago",
    read: true,
    type: "info",
  },
]

export function TopNav({ onMenuToggle }: TopNavProps) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('fairhire_user')
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser))
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error)
      // Clear invalid data
      localStorage.removeItem('fairhire_user')
    }
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast.success("All notifications marked as read")
  }

  const markRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleLogout = () => {
    localStorage.removeItem('fairhire_user')
    toast.success("Signed out successfully")
    setTimeout(() => router.push("/"), 500)
  }

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports, insights..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            className={cn(
              "pl-10 bg-secondary/50 border-border h-10 transition-all duration-200",
              searchFocused && "border-primary/50 bg-secondary ring-2 ring-primary/10"
            )}
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          {/* Search suggestions dropdown */}
          <AnimatePresence>
            {searchFocused && searchValue.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-1 glass-card rounded-xl border border-border overflow-hidden z-50"
              >
                {["Q4 2024 Bias Report", "Gender Insights", "CGPA Analysis", "Settings"].filter(
                  (s) => s.toLowerCase().includes(searchValue.toLowerCase())
                ).length === 0 ? (
                  <div className="p-4 text-sm text-muted-foreground text-center">No results found</div>
                ) : (
                  ["Q4 2024 Bias Report", "Gender Insights", "CGPA Analysis", "Settings"]
                    .filter((s) => s.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((result) => (
                      <button
                        key={result}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-secondary/50 transition-colors"
                        onClick={() => {
                          setSearchValue("")
                          toast.info(`Navigating to "${result}"`)
                        }}
                      >
                        <span>{result}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] font-bold text-primary-foreground"
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass-card border-border p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <p className="font-semibold text-foreground">Notifications</p>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Mark all read
                </button>
              )}
            </div>
            <div className="divide-y divide-border max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => markRead(notification.id)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-secondary/30 transition-colors",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        notification.type === "alert" && "bg-red-400",
                        notification.type === "success" && "bg-green-400",
                        notification.type === "info" && "bg-primary"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium", notification.read ? "text-muted-foreground" : "text-foreground")}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notification.body}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-border">
              <Link href="/settings">
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                  View notification settings
                </Button>
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-8 w-px bg-border" />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {currentUser?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {currentUser?.provider === 'google' ? 'Google Account' : 'Enterprise Plan'}
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-sm font-semibold text-primary-foreground">
                  {currentUser?.name ? getInitials(currentUser.name) : 'U'}
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-card border-border">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">
                  {currentUser?.name || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {currentUser?.email || 'user@example.com'}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                <User className="w-4 h-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
