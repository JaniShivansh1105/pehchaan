"use client"

import { mockUser } from "@/lib/mock-data"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { User, Bell, Globe, Save, AlertTriangle } from "lucide-react"
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { useToast } from "@/lib/hooks/useToast"
import { useState } from "react"

export default function SettingsPage() {
  const [profile, setProfile] = useLocalStorage('pehchaan_profile', {
    name: mockUser.name,
    phone: "+91 98765 43210",
    email: `${mockUser.name.toLowerCase()}@example.com`
  })

  const [notifications, setNotifications] = useLocalStorage('pehchaan_notifications', {
    scoreUpdates: true,
    improvementTips: true,
    marketingOffers: false
  })

  const [language, setLanguage] = useLocalStorage('pehchaan_language', 'en')
  
  const [errors, setErrors] = useState<{name?: string, phone?: string, email?: string}>({})
  const [showResetModal, setShowResetModal] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = () => {
    const newErrors: {name?: string, phone?: string, email?: string} = {}
    
    if (!profile.name.trim()) newErrors.name = "Name cannot be empty."
    if (!profile.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = "Please enter a valid email address."
    }
    if (!profile.phone.trim() || !/^\+?[0-9\s\-()]{7,15}$/.test(profile.phone)) {
      newErrors.phone = "Please enter a valid phone number."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    toast({ message: "Profile settings saved successfully." })
  }

  const handleResetDemo = () => {
    // Clear only PEHCHAAN local storage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('pehchaan_')) {
        localStorage.removeItem(key)
      }
    }
    setShowResetModal(false)
    toast({ message: "Demo data has been reset." })
    // Hard refresh to re-initialize defaults
    window.location.reload()
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const next = { ...prev, [key]: !prev[key] }
      toast({ message: "Notification preferences updated." })
      return next
    })
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
    toast({ message: "Language preference updated." })
  }

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-sm text-neutral-500">Manage your profile and application preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Settings */}
        <Card className="md:col-span-2 border-neutral-200 h-max">
          <CardHeader className="pb-3 border-b border-neutral-100">
            <CardTitle className="text-base flex items-center gap-2">
              <User className="h-4 w-4 text-brand" /> Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-neutral-200 border-2 border-white shadow-sm overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${profile.name}`} alt="Avatar" className="h-full w-full object-cover" />
              </div>
              <div>
                <button className="text-xs font-semibold text-brand hover:text-brand-dark bg-brand/5 px-3 py-1.5 rounded-md transition-colors">
                  Change Avatar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                  className={`w-full p-2.5 bg-neutral-50 border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all ${errors.name ? 'border-destructive focus:ring-destructive/50 focus:border-destructive' : 'border-neutral-200'}`} 
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  value={profile.phone} 
                  onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                  className={`w-full p-2.5 bg-neutral-50 border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all ${errors.phone ? 'border-destructive focus:ring-destructive/50 focus:border-destructive' : 'border-neutral-200'}`} 
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                  className={`w-full p-2.5 bg-neutral-50 border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all ${errors.email ? 'border-destructive focus:ring-destructive/50 focus:border-destructive' : 'border-neutral-200'}`} 
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <button 
                onClick={handleSaveProfile}
                className="py-2 px-4 bg-neutral-900 text-white text-sm font-semibold rounded-lg hover:bg-neutral-800 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Save className="h-4 w-4" /> Save Profile
              </button>
            </div>
          </CardContent>
        </Card>

        {/* App Settings */}
        <div className="space-y-6 md:col-span-1">
          <Card className="border-neutral-200">
            <CardHeader className="pb-3 border-b border-neutral-100">
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4 text-brand" /> Language
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <select 
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
              </select>
            </CardContent>
          </Card>

          <Card className="border-neutral-200">
            <CardHeader className="pb-3 border-b border-neutral-100">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4 text-brand" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => handleNotificationToggle('scoreUpdates')}>
                <span className="text-sm font-medium text-foreground">Score Updates</span>
                <input type="checkbox" checked={notifications.scoreUpdates} readOnly className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand cursor-pointer" />
              </div>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => handleNotificationToggle('improvementTips')}>
                <span className="text-sm font-medium text-foreground">Improvement Tips</span>
                <input type="checkbox" checked={notifications.improvementTips} readOnly className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand cursor-pointer" />
              </div>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => handleNotificationToggle('marketingOffers')}>
                <span className="text-sm font-medium text-foreground">Marketing Offers</span>
                <input type="checkbox" checked={notifications.marketingOffers} readOnly className="h-4 w-4 rounded border-neutral-300 text-brand focus:ring-brand cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      <div className="pt-8 border-t border-neutral-200 max-w-xl">
        <h3 className="text-sm font-bold text-destructive mb-2">Reset Prototype Data</h3>
        <p className="text-xs text-neutral-500 mb-4">
          This will clear all PEHCHAAN local prototype data, including your improvement statuses, consent settings, simulator values, and notifications.
        </p>
        <button 
          onClick={() => setShowResetModal(true)}
          className="px-4 py-2 border border-destructive text-destructive text-sm font-semibold rounded-lg hover:bg-destructive/10 transition-colors"
        >
          Reset Demo Data
        </button>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full border border-neutral-200 overflow-hidden">
            <div className="p-5 border-b border-neutral-100">
              <h3 className="text-base font-bold text-foreground">Are you sure?</h3>
            </div>
            <div className="p-5">
              <p className="text-sm text-neutral-600">
                This action cannot be undone. All locally stored mock preferences and interactions will revert to default.
              </p>
            </div>
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end gap-2">
              <button 
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleResetDemo}
                className="px-4 py-2 text-sm font-semibold bg-destructive text-white hover:bg-destructive/90 rounded-lg transition-colors"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
