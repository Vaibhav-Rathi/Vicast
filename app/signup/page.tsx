"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useGoogleLogin } from '@react-oauth/google'
import { setCookie } from "cookies-next"
import { useAuth } from "@/lib/auth-provider"

export default function SignupPage() {
  const [step, setStep] = useState<"options" | "form">("options")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { login } = useAuth()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {firstName, lastName, email, password})
      if (response.status == 200) {
        router.push(`/signup/verification?email=${email}`)
      }
      const responseMessage = (response.data as any).message
      setMessage(responseMessage)
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred"
      setMessage(errorMessage)
      toast.error(errorMessage, {
        description: "Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true)
      setMessage("")
      
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google-signup`,
          { access_token: tokenResponse.access_token }
        )

        if (response.status === 200) {
          const { user, token } = response.data as any

          // Store user data
          localStorage.setItem("user_firstName", user.firstName)
          localStorage.setItem("user_lastName", user.lastName)
          localStorage.setItem("user_email", user.email)
          localStorage.setItem("auth_token", token)
          localStorage.setItem("verification_status", "verified")
          localStorage.setItem("user_id", user.id)

          await setCookie("auth_token", token, { maxAge: 30 * 24 * 60 * 60 })
          
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
          login()
          
          toast.success("Account created successfully!")
          setTimeout(() => {
            router.push("/dashboard")
          }, 500)
        }
      } catch (error: any) {
        console.error("Google signup error:", error)
        const errorMessage = error.response?.data?.message || "Google sign-up failed"
        setMessage(errorMessage)
        toast.error(errorMessage)
      } finally {
        setIsGoogleLoading(false)
      }
    },
    onError: () => {
      setMessage("Google sign-up failed")
      toast.error("Google sign-up failed")
    }
  })

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center bg-black/95 px-4 py-12 sm:w-1/2 sm:px-10 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-6">
            {step === "form" && (
              <Button
                variant="link"
                className="self-start text-zinc-400 hover:text-zinc-300 -mt-4 -ml-4 mb-2"
                onClick={() => setStep("options")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}

            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">Create your account</h1>
              <p className="text-zinc-400">Sign up to join Vicast it&apos;s free</p>
            </div>

            {message && (
              <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-400">
                {message}
              </div>
            )}

            {step === "options" ? (
              <>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="h-12 bg-zinc-800 text-white hover:bg-zinc-700 justify-start px-4"
                    onClick={() => googleSignup()}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    ) : (
                      <svg viewBox="0 0 24 24" className="mr-3 h-5 w-5">
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
                    Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 bg-zinc-800 text-white hover:bg-zinc-700 justify-start px-4"
                    onClick={() => setStep("form")}
                    disabled={isGoogleLoading}
                  >
                    <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Continue with Email
                  </Button>
                </div>

                <p className="text-xs text-zinc-400 text-center">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-purple-500 hover:text-purple-400">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link href="/privacy" className="text-purple-500 hover:text-purple-400">
                    Privacy Policy
                  </Link>
                </p>

                <div className="text-center text-sm text-zinc-400">
                  Have an account?{" "}
                  <Link href="/signin" className="text-purple-500 hover:text-purple-400">
                    Sign in
                  </Link>
                </div>
              </>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="firstname"
                    placeholder="FirstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="lastname"
                    placeholder="Lastname"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-purple-500"
                  />
                </div>
                <div className="space-y-2 relative">
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
                    className="absolute right-3 top-3 text-zinc-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
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
                      Creating account...
                    </>
                  ) : (
                    "Create your account"
                  )}
                </Button>

                <p className="text-xs text-zinc-400 text-center">
                  By signing up, you agree to our{" "}
                  <Link href="/terms" className="text-purple-500 hover:text-purple-400">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link href="/privacy" className="text-purple-500 hover:text-purple-400">
                    Privacy Policy
                  </Link>
                </p>

                <div className="text-center text-sm text-zinc-400">
                  Have an account?{" "}
                  <Link href="/signin" className="text-purple-500 hover:text-purple-400">
                    Log in
                  </Link>
                </div>
              </form>
            )}
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