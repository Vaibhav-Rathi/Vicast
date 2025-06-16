"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [message, setMessage] = useState<string>('')
  const router = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address", {
        description: "Please enter a valid email address."
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/forgot`, { email });
      setMessage((response.data as any).message)
      setIsSubmitted(true)
      toast.success("Reset link sent", {
        description: "Please check your email for the password reset link."
      })
    } catch (error) {
      toast.error("Failed to send reset link", {
        description: "Please try again later."
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center bg-black/95 px-4 py-12 sm:w-1/2 sm:px-10 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
              <p className="text-zinc-400">
                {isSubmitted 
                  ? "Check your email for the password reset link" 
                  : "Enter your email address to reset your password"}
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-purple-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 w-full bg-purple-600 text-white hover:bg-purple-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            ) : (
              <div className="rounded-lg bg-zinc-800/50 p-4 text-center">
                <p className="text-sm text-zinc-300">
                  {message}. 
                  Please check your inbox for {email}.
                </p>
              </div>
            )}

            <div className="text-center">
              <Link href="/signin" className="text-purple-500 hover:text-purple-400 text-sm">
                Back to Signin
              </Link>
            </div>
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