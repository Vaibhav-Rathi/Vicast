"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-provider"
import { Sidebar } from "../components/Sidebar"
import { Menu } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [checkedAuth, setCheckedAuth] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const auth_token = localStorage.getItem('auth_token')
    if (!auth_token) {
      router.push('/signin')
    }
  }, [router])

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/signin")
      } else {
        setCheckedAuth(true)
      }
    }
  }, [user, isLoading, router])

  if (isLoading || !checkedAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <h1 className="text-foreground text-2xl md:text-4xl font-bold text-center">
          Rolling out the red carpet...
        </h1>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-auto">
        {/* Mobile Header with Hamburger */}
        <header className="md:hidden flex items-center bg-background border-b border-border p-4">
          <button
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-muted"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="ml-4 text-lg font-bold">Dashboard</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
