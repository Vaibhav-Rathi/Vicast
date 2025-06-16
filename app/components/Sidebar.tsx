"use client"

import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FolderClosed, Calendar, Settings, HelpCircle, Video, LogOut, X } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toogle"
import { useRouter } from "next/navigation"

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [studioName, setStudioName] = useState("Studio")
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Project", href: "/dashboard/projects", icon: FolderClosed },
    { name: "Scheduled", href: "/dashboard/scheduled", icon: Calendar },
  ]

  useEffect(() => {
    const firstName = localStorage.getItem('user_firstName') || ''
    const lastName = localStorage.getItem('user_lastName') || ''
    const username = firstName && lastName ? `${firstName} ${lastName}'s Studio` : "Studio"
    setStudioName(username)
  }, [])

  const bottomNavItems = [
    { name: "What's new?", href: "/dashboard/whats-new", icon: HelpCircle },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const handleOpenStudio = () => {
    startTransition(() => {
      router.push(`/dashboard/studio`)
    })
    onClose() // close sidebar on mobile after navigation
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    startTransition(() => {
      router.push(href)
    })
    onClose()
  }

  const handleLogout = () => {
    startTransition(() => {
      logout()
    })
    onClose()
  }

  return (
    <>
      {/* Backdrop on mobile when open */}
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-40 flex flex-col transition-transform md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
          isPending && "pointer-events-none opacity-80"
        )}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border md:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Video className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold uppercase tracking-wider">Vicast</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-2 rounded-md hover:bg-muted"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex h-16 items-center px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Video className="h-5 w-5" />
            </div>
            <div className="items-center flex gap-16">
              <span className="text-lg font-bold uppercase tracking-wider">Vicast</span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
            <span className="text-sm font-medium">VR</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Studio</span>
            <span className="text-sm font-medium truncate">{studioName}</span>
          </div>
        </div>

        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <div onClick={handleOpenStudio} className="px-4 py-2 flex items-center gap-2">
            <button className="flex flex-1 items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Video className="h-5 w-5" />
              <span>Open studio</span>
            </button>
          </div>

          <ul className="space-y-1 px-2 py-4">
            {bottomNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
                Log out
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}