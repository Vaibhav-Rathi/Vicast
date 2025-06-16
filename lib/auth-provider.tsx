"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { deleteCookie, getCookie } from "cookies-next"
import axios from "axios"


type AuthContextType = {
  user: any
  isLoading: boolean
  login: () => Promise<{ success: boolean; message: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getCookie("auth_token")
    if (!token) {     
      setIsLoading(false)
      return
    }
    
    const fetchUser = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}` 
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`)
        setUser((response.data as any).user)
      } catch (error) {
        console.error("Auth check failed:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchUser()
  }, []);

  const login = async () => {
    try {
      setIsLoading(true)
      const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`)
      setUser({
        id: (data.data as any).user.id,
        firstName: (data.data as any).user.firstName,
        lastName : (data.data as any).user.lastName,
        email: (data.data as any).user.email,
      })

      setTimeout(()=>{
        router.push("/dashboard")
      }, 500)
      return { success: true, message: "Login successful" }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An error occurred during login" }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    deleteCookie("auth_token")
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("user_firstName")
      localStorage.removeItem("user_lastName")
      localStorage.removeItem("user_email")
      localStorage.removeItem("verification_status")
      delete axios.defaults.headers.common["Authorization"]
    }
    setUser(null)
    router.push("/signin")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthContext }