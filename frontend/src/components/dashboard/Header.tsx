"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Menu, User, Settings, LogOut, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useLocalStorage } from "@/lib/hooks/useLocalStorage"
import { EmptyState } from "@/components/ui/states"

type Notification = {
  id: string
  title: string
  desc: string
  time: string
  href: string
  read: boolean
}

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('pehchaan_notifications_list', [
    { id: '1', title: 'Score Updated', desc: 'Your readiness score increased by 24 points.', time: '2 hours ago', href: '/progress', read: false },
    { id: '2', title: 'New Action Available', desc: 'Check out your new improvement path recommendations.', time: '1 day ago', href: '/improvement?action=stable-savings', read: false },
    { id: '3', title: 'Payment Insight', desc: 'Review your perfect payment consistency insight.', time: '2 days ago', href: '/key-factors?factor=payment_consistency', read: true }
  ])

  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false)
      }
    }
    
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowNotifications(false)
        setShowProfile(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl shrink-0">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button 
            className="lg:hidden text-neutral-500 hover:text-foreground p-1"
            onClick={() => setShowMobileMenu(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex flex-col justify-center">
            <h1 className="text-lg font-display font-semibold tracking-tight text-foreground leading-none">
              Good morning, Shivansh
            </h1>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Here&apos;s your financial readiness overview.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowProfile(false)
              }}
              className={`relative rounded-full p-1.5 transition-colors ${showNotifications ? 'bg-neutral-100 text-foreground' : 'text-neutral-400 hover:bg-neutral-100 hover:text-foreground'}`}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand border border-white"></span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <div className="p-3 border-b border-neutral-100 bg-neutral-50/50 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold bg-brand text-white px-2 py-0.5 rounded-full">{unreadCount} new</span>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <EmptyState 
                      title="No notifications" 
                      description="You're all caught up!"
                      className="border-none min-h-[150px] shadow-none bg-transparent"
                    />
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={`p-3 border-b border-neutral-100 hover:bg-neutral-50 transition-colors flex gap-3 ${n.read ? 'opacity-60' : 'bg-brand/5'}`}>
                        <div className="mt-0.5">
                          {n.read ? <CheckCircle2 className="h-4 w-4 text-neutral-400" /> : <div className="h-2 w-2 mt-1 rounded-full bg-brand" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link 
                            href={n.href} 
                            onClick={() => {
                              markAsRead(n.id)
                              setShowNotifications(false)
                            }}
                            className="block"
                          >
                            <p className={`text-sm font-medium mb-0.5 ${n.read ? 'text-neutral-600' : 'text-foreground'}`}>{n.title}</p>
                            <p className="text-xs text-neutral-500 line-clamp-2">{n.desc}</p>
                            <p className={`text-[10px] font-medium mt-1 ${n.read ? 'text-neutral-400' : 'text-brand'}`}>{n.time}</p>
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {unreadCount > 0 && (
                  <div className="p-2 text-center border-t border-neutral-100 bg-neutral-50">
                    <button onClick={markAllAsRead} className="text-xs font-semibold text-brand hover:text-brand-dark transition-colors">Mark all as read</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button 
              onClick={() => {
                setShowProfile(!showProfile)
                setShowNotifications(false)
              }}
              className="h-8 w-8 rounded-full bg-neutral-200 border border-border overflow-hidden shrink-0 hover:ring-2 hover:ring-brand/30 transition-all cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Shivansh"
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                <div className="p-3 border-b border-neutral-100 bg-neutral-50/50">
                  <p className="text-sm font-semibold text-foreground truncate">Shivansh</p>
                  <p className="text-xs text-neutral-500 truncate">shivansh@example.com</p>
                </div>
                <div className="p-1">
                  <Link href="/settings" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-foreground rounded-md transition-colors">
                    <User className="h-4 w-4 text-neutral-400" /> Profile Settings
                  </Link>
                  <Link href="/privacy" onClick={() => setShowProfile(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-foreground rounded-md transition-colors">
                    <Settings className="h-4 w-4 text-neutral-400" /> Privacy & Consent
                  </Link>
                </div>
                <div className="p-1 border-t border-neutral-100">
                  <button onClick={() => setShowProfile(false)} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-border shadow-xl animate-in slide-in-from-left flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-brand flex items-center justify-center">
                  <span className="text-white font-bold text-lg leading-none">P</span>
                </div>
                <span className="font-display font-bold text-lg tracking-wide text-foreground">
                  PEHCHAAN
                </span>
              </div>
              <button onClick={() => setShowMobileMenu(false)} className="text-neutral-500 p-1">
                <Menu className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <Link href="/" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100">Overview</Link>
              <Link href="/readiness" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100">My Readiness</Link>
              <Link href="/key-factors" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100">Key Factors</Link>
              <Link href="/improvement" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100">Improvement Path</Link>
              <Link href="/simulator" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100">What-If Simulator</Link>
              <Link href="/micro-investment" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100">Micro-Investment</Link>
              <Link href="/progress" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100">Progress</Link>
            </div>
            
            <div className="p-4 border-t border-border">
              <Link href="/privacy" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100 mb-1">Privacy & Consent</Link>
              <Link href="/settings" onClick={() => setShowMobileMenu(false)} className="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-neutral-100">Settings</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
