"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { setCookie } from "cookies-next"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, EyeOff, Eye } from "lucide-react"
import { useAuth } from "@/lib/auth-provider"
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from "sonner"

interface LoginResponse {
  user: {
    firstName: string
    lastName: string
    email: string
    id: string
    verified: boolean
  }
  token: string
  message: string
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post<LoginResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`, {
        email,
        password,
      })

      if (response.status === 200) {
        const { user, token } = response.data

        localStorage.setItem("user_firstName", user.firstName)
        localStorage.setItem("user_lastName", user.lastName)
        localStorage.setItem("user_email", user.email)
        localStorage.setItem("auth_token", token)
        localStorage.setItem("verification_status", user.verified ? "verified" : "pending")
        localStorage.setItem("user_id", user.id)

        await setCookie("auth_token", token, { maxAge: 30 * 24 * 60 * 60 })
        
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        login()
        setTimeout(()=>{
          router.push("/dashboard")
        }, 500)
      }
    } catch (error: any) {
      console.error("Login error:", error)
      if (error.response) {
        setError(error.response.data?.message || "Invalid email or password")
      } else if (error.request) {
        setError("No response received from server")
      } else {
        setError("An error occurred during login")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true)
      setError("")
      
      try {
        const response = await axios.post<LoginResponse>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google-signin`,
          { access_token: tokenResponse.access_token }
        )

        if (response.status === 200) {
          const { user, token } = response.data

          localStorage.setItem("user_firstName", user.firstName)
          localStorage.setItem("user_lastName", user.lastName)
          localStorage.setItem("user_email", user.email)
          localStorage.setItem("auth_token", token)
          localStorage.setItem("verification_status", "verified")
          localStorage.setItem("user_id", user.id)

          await setCookie("auth_token", token, { maxAge: 30 * 24 * 60 * 60 })
          
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
          login()
          
          toast.success("Google sign-in successful!")
          setTimeout(() => {
            router.push("/dashboard")
          }, 500)
        }
      } catch (error: any) {
        console.error("Google login error:", error)
        const errorMessage = error.response?.data?.message || "Google sign-in failed"
        setError(errorMessage)
        toast.error(errorMessage)
      } finally {
        setIsGoogleLoading(false)
      }
    },
    onError: () => {
      setError("Google sign-in failed")
      toast.error("Google sign-in failed")
    }
  })

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center bg-black/95 px-4 py-12 sm:w-1/2 sm:px-10 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">Sign in to Vicast</h1>
              <p className="text-zinc-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-purple-500 hover:text-purple-400">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700"
                onClick={() => googleLogin()}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                )}
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black px-2 text-zinc-400">Or</span>
              </div>
            </div>

            {error && <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-400">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="email"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-purple-500"
                />
              </div>

              <div className="relative space-y-2">
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-purple-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>

              <Button
                type="submit"
                className="h-12 w-full bg-purple-600 text-white hover:bg-purple-500"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>

            <Button
              variant="link"
              className="flex items-center justify-center gap-1 text-purple-500 hover:text-purple-400"
              onClick={() => setError("SSO login is not implemented yet")}
            >
            </Button>

            <Link href={"/forgot-password"}>
              <Button variant="link" className="text-zinc-400 hover:text-zinc-300 w-full flex justify-center">
                Forgot password?
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden sm:block sm:w-1/2">
        <div className="relative h-full w-full">
          <Image
            src="/dashboard_image.png"
            alt="Dashboard Preview"
            fill
            className="object-cover blur-sm brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-md rounded-lg overflow-hidden">
              <Image src="/login_image.png" alt="Vicast Preview" width={600} height={400} className="w-full h-auto" />
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <h3 className="text-xl font-bold text-white">Studio-quality recording.</h3>
                <h3 className="text-xl font-bold text-white">Effortless editing.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}