"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { setCookie } from "cookies-next"

interface UserData {
  firstName: string
  lastName: string
  email: string
  id: string
  verified: boolean
}

interface VerifyResponse {
  user: UserData
  token?: string
  message: string
}

interface PollingResponse {
  firstName: string
  lastName: string
  email: string
}

export default function VerifyPage() {
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [verificationError, setVerificationError] = useState<string>("")
  const [verificationMessage, setVerificationMessage] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get<VerifyResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`)
        
        if (response.status === 200 || response.status === 201) {
          const userData = response.data.user
          localStorage.setItem("user_firstName", userData.firstName)
          localStorage.setItem("user_lastName", userData.lastName)
          localStorage.setItem("user_email", userData.email)
          localStorage.setItem("auth_token", token as string)
          localStorage.setItem("verification_status", "verified")
          
          setCookie("auth_token", response.data.token || token, { maxAge: 30 * 24 * 60 * 60 })
          
          axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token || token}`
          
          setEmail(userData.email)
          setIsVerified(true)
          
          const message = response.status === 201 
            ? "Your email is already verified. Redirecting to dashboard..."
            : "Email verified successfully! Redirecting to dashboard..."
          
          setVerificationMessage(message)
          
          setTimeout(() => {
            router.push("/dashboard")
          }, 1500)
        }
      } catch (error: any) {
        console.error("Verification error:", error)
        if (error.response) {
          setVerificationError(error.response.data?.message || "Verification failed")
        } else if (error.request) {
          setVerificationError("No response received from server")
        } else {
          setVerificationError("An error occurred during verification")
        }
      }
    }
  
    if (token) {
      verifyToken()
    }
  }, [token, router])

  useEffect(() => {
    if (isVerified) return
    if (!email) return
    if (verificationError) return

    const checkVerification = async () => {
      try {
        const response = await axios.post<PollingResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/polling`, { email })
        
        if (response.status === 200) {
          const userData = response.data
          localStorage.setItem("user_firstName", userData.firstName)
          localStorage.setItem("user_lastName", userData.lastName)
          localStorage.setItem("user_email", userData.email)
          localStorage.setItem("verification_status", "verified")
          
          setIsVerified(true)
        }
      } catch (error: any) {
        console.error("Polling error:", error)
      }
    }
  
    const intervalId = setInterval(checkVerification, 3000)
    return () => clearInterval(intervalId)
  }, [email, isVerified, verificationError])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "verification_status" && event.newValue === "verified") {
        setIsVerified(true)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    if (isVerified) {
      const timeout = setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
  
      return () => clearTimeout(timeout)
    }
  }, [isVerified, router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md px-4 py-8 text-center">
        <div className="mb-6">
          <Image src="/favicon.svg" alt="Vicast" width={120} height={120} className="mx-auto rounded-full" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Email Verification</h1>
        
        {verificationError ? (
          <div className="mt-4 text-red-500">
            <p>{verificationError}</p>
            <button 
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-zinc-400">We are processing your request, please hold on.</p>

            {!isVerified ? (
              <div className="flex flex-col items-center">
                <div className="mb-4 flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-purple-500" />
                  <span>Waiting for verification</span>
                </div>
                <p className="text-sm text-zinc-500">
                  If you haven&apos;t received the email, please check your spam folder.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 text-green-500">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{verificationMessage || "Redirecting to dashboard..."}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}