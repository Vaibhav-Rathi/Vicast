"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [message, setMessage] = useState('')
  const [toastError, setToastError] = useState('')
  const [statusCode, setStatusCode] = useState(0)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    const callFunction = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset?token=${token}`);
        setStatusCode(response.status);
        setMessage((response.data as any).decoded.email);
      } catch (error: any) {
        setStatusCode(error.response?.status || 500);
        setMessage(error.response?.data?.message || "Something went wrong.");
      }
    };
  
    callFunction();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        description: "Please ensure both passwords are identical."
      })
      return
    }

    setIsLoading(true)

    try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-enter-password?token=${token}`, { password });
        setToastError((response?.data as any).message)
        if (response.status === 200){
            setIsReset(true);
            toast.success("Password reset successful!", {
                description: "You can now log in with your new password.",
              });
        }else {
            toast.error(toastError, {
                description: "Try again!",
              });
        }
    } catch (error: any) {
        const errorMsg = error.response?.data?.message || "Something went wrong.";
        toast.error(errorMsg, {
          description: "Please try again later.",
        });
    } finally {
      setIsLoading(false)
    }
  }

  if (statusCode !==200) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="mx-auto max-w-md px-4 py-8 text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">NOTE : {message}</h1>
          <p className="mb-6 text-zinc-400">The password reset link is invalid or has expired.</p>
          <Button asChild className="bg-purple-600 hover:bg-purple-500">
            <Link href="/forgot-password">Request a new link</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full flex-col items-center justify-center bg-black/95 px-4 py-12 sm:w-1/2 sm:px-10 md:px-16 lg:px-24">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">Create new password</h1>
              <p className="text-zinc-400">
                {isReset ? "Your password has been reset successfully" : "Enter a new password for your account"}
              </p>
            </div>

            {!isReset ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 relative">
                  <Input
                    id="password"
                    placeholder="New password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-purple-500 pr-16"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-purple-500 hover:text-purple-400 text-sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="space-y-2">
                  <Input
                    id="confirm-password"
                    placeholder="Confirm new password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-12 bg-zinc-800 text-white placeholder:text-zinc-400 focus-visible:ring-purple-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-12 w-full bg-purple-600 text-white hover:bg-purple-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset password"}
                </Button>
              </form>
            ) : (
              <div className="rounded-lg bg-zinc-800/50 p-4 text-center">
                <p className="text-sm text-zinc-300">
                  Your password has been reset successfully. You will be redirected to the signin page shortly.
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