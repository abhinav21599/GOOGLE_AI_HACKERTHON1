"use client"

import { motion } from "framer-motion"
import {
  Moon,
  Sun,
  Key,
  Bell,
  Shield,
  Users,
  Copy,
  Check,
  Eye,
  EyeOff,
  Settings,
  CreditCard,
  Palette,
  Globe,
  Trash2,
  Plus,
  MoreHorizontal,
  Mail,
  Smartphone,
  RefreshCw,
  Download,
  Upload,
  History,
  Zap,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function SettingsPage() {
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSendingInvite, setIsSendingInvite] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [regenerateDialogOpen, setRegenerateDialogOpen] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    slack: false,
    weekly: true,
    alerts: true,
    push: false,
    sms: false,
  })
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState("")
  const inviteEmailRef = useRef<HTMLInputElement>(null)
  const webhookUrlRef = useRef<HTMLInputElement>(null)
  const [addWebhookOpen, setAddWebhookOpen] = useState(false)

  const apiKey = "fh_sk_live_aBc123XyZ456DefGhi789JklMno012"

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    toast.success("API key copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSaveProfile = async () => {
    setIsSavingProfile(true)
    await new Promise((r) => setTimeout(r, 1200))
    toast.success("Profile saved", { description: "Your changes have been applied." })
    setIsSavingProfile(false)
  }

  const handleThemeChange = (value: "dark" | "light" | "system") => {
    setTheme(value)
    // Apply class to html element — ready for next-themes integration later
    const html = document.documentElement
    html.classList.remove("dark", "light")
    if (value !== "system") html.classList.add(value)
    toast.success(`Theme changed to ${value}`)
  }

  const handleNotificationToggle = (key: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: checked }))
    toast.success(checked ? "Notification enabled" : "Notification disabled", {
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications updated.`,
    })
  }

  const handleSendInvite = async () => {
    const email = inviteEmailRef.current?.value
    if (!email) { toast.error("Please enter an email address"); return }
    setIsSendingInvite(true)
    await new Promise((r) => setTimeout(r, 1500))
    toast.success("Invitation sent!", { description: `Invite sent to ${email}` })
    setIsSendingInvite(false)
    setInviteDialogOpen(false)
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    await new Promise((r) => setTimeout(r, 1500))
    toast.success("API key regenerated", { description: "Your old key has been invalidated." })
    setIsRegenerating(false)
    setRegenerateDialogOpen(false)
  }

  const handleAddWebhook = () => {
    const url = webhookUrlRef.current?.value
    if (!url) { toast.error("Please enter a webhook URL"); return }
    toast.success("Webhook added", { description: url })
    setAddWebhookOpen(false)
  }

  const teamMembers = [
    { name: "John Doe", email: "john@company.com", role: "Owner", avatar: null, status: "active", lastActive: "Now" },
    { name: "Sarah Smith", email: "sarah@company.com", role: "Admin", avatar: null, status: "active", lastActive: "2h ago" },
    { name: "Mike Johnson", email: "mike@company.com", role: "Member", avatar: null, status: "active", lastActive: "1d ago" },
    { name: "Emily Chen", email: "emily@company.com", role: "Member", avatar: null, status: "pending", lastActive: "Invited" },
  ]

  const billingHistory = [
    { date: "Apr 1, 2026", amount: "$299.00", status: "Paid", invoice: "INV-2026-004" },
    { date: "Mar 1, 2026", amount: "$299.00", status: "Paid", invoice: "INV-2026-003" },
    { date: "Feb 1, 2026", amount: "$299.00", status: "Paid", invoice: "INV-2026-002" },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Settings className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account, team, and preferences</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="glass-card h-auto p-1 flex-wrap gap-1">
            <TabsTrigger value="general" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Palette className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Key className="w-4 h-4" />
              API
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            {/* Profile Section */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Profile</h3>
              <div className="flex items-start gap-6">
                <div className="relative group">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" className="bg-secondary/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" className="bg-secondary/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john@company.com" className="bg-secondary/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Corporation" className="bg-secondary/50" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  onClick={handleSaveProfile}
                  disabled={isSavingProfile}
                >
                  {isSavingProfile ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
                  ) : "Save Changes"}
                </Button>
              </div>
            </div>

            {/* Appearance Section */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Appearance</h3>
                  <p className="text-sm text-muted-foreground">Customize how FairHire looks on your device</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Theme</p>
                    <p className="text-sm text-muted-foreground">Select your preferred color mode</p>
                  </div>
                  <div className="flex items-center gap-1 p-1 glass rounded-lg">
                    {[
                      { value: "light", icon: Sun, label: "Light" },
                      { value: "dark", icon: Moon, label: "Dark" },
                      { value: "system", icon: Settings, label: "System" },
                    ].map(({ value, icon: Icon, label }) => (
                      <button
                        key={value}
                        onClick={() => handleThemeChange(value as typeof theme)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
                          theme === value
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Language</p>
                    <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">English (US)</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Control how and when you receive updates</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-1">
                {[
                  { key: "email", icon: Mail, label: "Email notifications", description: "Receive reports and alerts via email" },
                  { key: "push", icon: Smartphone, label: "Push notifications", description: "Get real-time alerts on your device" },
                  { key: "slack", icon: Zap, label: "Slack integration", description: "Get notifications in your Slack workspace" },
                  { key: "weekly", icon: History, label: "Weekly digest", description: "Receive a weekly summary of bias metrics" },
                  { key: "alerts", icon: Bell, label: "Critical alerts", description: "Get notified when bias levels exceed thresholds" },
                  { key: "sms", icon: Smartphone, label: "SMS alerts", description: "Receive critical alerts via SMS" },
                ].map((item, index) => (
                  <div key={item.key}>
                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => handleNotificationToggle(item.key, checked)}
                      />
                    </div>
                    {index < 5 && <Separator />}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api" className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Key className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">API Integration</h3>
                  <p className="text-sm text-muted-foreground">Connect FairHire to your systems</p>
                </div>
              </div>
              <Separator className="my-4" />

              {/* API Key */}
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Production API Key</Label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        readOnly
                        className="bg-secondary/50 pr-10 font-mono text-sm"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Button
                      variant="outline"
                      onClick={copyApiKey}
                      className="glass shrink-0"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-400" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Use this key to authenticate API requests. Keep it secure and never expose it in client-side code.
                  </p>
                </div>

                <Separator />

                {/* API Stats */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Usage This Month</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass rounded-lg p-4">
                      <p className="text-2xl font-bold text-foreground">12,847</p>
                      <p className="text-sm text-muted-foreground">API Calls</p>
                    </div>
                    <div className="glass rounded-lg p-4">
                      <p className="text-2xl font-bold text-foreground">45</p>
                      <p className="text-sm text-muted-foreground">Reports Generated</p>
                    </div>
                    <div className="glass rounded-lg p-4">
                      <p className="text-2xl font-bold text-foreground">99.9%</p>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Regenerate API Key</p>
                    <p className="text-sm text-muted-foreground">This will invalidate your current key</p>
                  </div>
                  <Button variant="outline" className="glass border-destructive/50 text-destructive hover:bg-destructive/10">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            </div>

            {/* Webhooks */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Webhooks</h3>
                  <p className="text-sm text-muted-foreground">Receive real-time notifications for events</p>
                </div>
                <Dialog open={addWebhookOpen} onOpenChange={setAddWebhookOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="glass">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Webhook
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-border">
                    <DialogHeader>
                      <DialogTitle>Add Webhook</DialogTitle>
                      <DialogDescription>Enter a URL to receive event notifications.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 py-4">
                      <Label>Webhook URL</Label>
                      <Input ref={webhookUrlRef} placeholder="https://your-server.com/hook" className="bg-secondary/50" />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAddWebhookOpen(false)}>Cancel</Button>
                      <Button className="bg-gradient-to-r from-primary to-accent" onClick={handleAddWebhook}>Add Webhook</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="glass rounded-lg p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-secondary mx-auto mb-3 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">No webhooks configured</p>
                <p className="text-sm text-muted-foreground mt-1">Add a webhook to receive event notifications</p>
              </div>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Team Members</h3>
                    <p className="text-sm text-muted-foreground">
                      {teamMembers.length} members on Enterprise plan
                    </p>
                  </div>
                </div>
                <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      <Plus className="w-4 h-4 mr-2" />
                      Invite Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-border">
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your team on FairHire AI.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="inviteEmail">Email Address</Label>
                        <Input ref={inviteEmailRef} id="inviteEmail" type="email" placeholder="colleague@company.com" className="bg-secondary/50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inviteRole">Role</Label>
                        <select id="inviteRole" className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border text-foreground">
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inviteMessage">Personal Message (Optional)</Label>
                        <Textarea id="inviteMessage" placeholder="Add a personal note to your invitation..." className="bg-secondary/50" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>Cancel</Button>
                      <Button className="bg-gradient-to-r from-primary to-accent" onClick={handleSendInvite} disabled={isSendingInvite}>
                        {isSendingInvite ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : "Send Invitation"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <Separator className="my-4" />

              {/* Team Members List */}
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.email} className="flex items-center justify-between p-4 glass rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{member.name}</p>
                          {member.status === "pending" && (
                            <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/30">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            member.role === "Owner" && "bg-primary/10 text-primary border-primary/30",
                            member.role === "Admin" && "bg-accent/10 text-accent border-accent/30",
                            member.role === "Member" && "bg-secondary text-muted-foreground"
                          )}
                        >
                          {member.role}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{member.lastActive}</p>
                      </div>
                      {member.role !== "Owner" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="glass-card border-border">
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            {/* Current Plan */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Current Plan</h3>
                    <p className="text-sm text-muted-foreground">Manage your subscription</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">Enterprise</Badge>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="glass rounded-lg p-4">
                  <p className="text-3xl font-bold text-foreground">$299</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-3xl font-bold text-foreground">Unlimited</p>
                  <p className="text-sm text-muted-foreground">API calls</p>
                </div>
                <div className="glass rounded-lg p-4">
                  <p className="text-3xl font-bold text-foreground">10</p>
                  <p className="text-sm text-muted-foreground">team members</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="glass">Change Plan</Button>
                <Button variant="outline" className="glass">Update Payment</Button>
              </div>
            </div>

            {/* Billing History */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Billing History</h3>
              <div className="space-y-3">
                {billingHistory.map((item) => (
                  <div key={item.invoice} className="flex items-center justify-between p-4 glass rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{item.invoice}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                        {item.status}
                      </Badge>
                      <p className="font-medium text-foreground">{item.amount}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toast.success("Invoice downloaded", { description: `${item.invoice}.pdf` })}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">Manage your account security</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-1">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button variant="outline" className="glass">
                    <Shield className="w-4 h-4 mr-2" />
                    Enable 2FA
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-foreground">Change Password</p>
                    <p className="text-sm text-muted-foreground">Update your account password</p>
                  </div>
                  <Button variant="outline" className="glass">Update Password</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-foreground">Active Sessions</p>
                    <p className="text-sm text-muted-foreground">Manage devices where you are logged in</p>
                  </div>
                  <Button variant="outline" className="glass">View Sessions</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium text-foreground">Login History</p>
                    <p className="text-sm text-muted-foreground">View recent login activity</p>
                  </div>
                  <Button variant="outline" className="glass">View History</Button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card rounded-xl overflow-hidden border border-destructive/20">
              <div className="p-4 border-b border-destructive/20 bg-destructive/5">
                <h3 className="font-semibold text-destructive flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  Danger Zone
                </h3>
                <p className="text-sm text-muted-foreground">Irreversible actions</p>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
                  </div>
                  <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-destructive/20">
                      <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Account</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account,
                          all your data, reports, and remove you from all teams.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="confirmDelete">Type &quot;DELETE&quot; to confirm</Label>
                        <Input
                          id="confirmDelete"
                          placeholder="DELETE"
                          className="mt-2 bg-secondary/50"
                          value={deleteConfirm}
                          onChange={(e) => setDeleteConfirm(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                        <Button
                          variant="destructive"
                          disabled={deleteConfirm !== "DELETE"}
                          onClick={() => {
                            toast.error("Account deletion requires backend confirmation")
                            setDeleteDialogOpen(false)
                            setDeleteConfirm("")
                          }}
                        >
                          Delete Account
                        </Button>

                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
