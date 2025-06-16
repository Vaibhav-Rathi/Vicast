"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const [isVerified, setIsVerified] = useState(false)
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter()

  useEffect(() => {
    if (isVerified) return;
  
    const callFunction = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/polling`, { email });
        if (response.status === 200) {
          setIsVerified(true);
          router.push('/dashboard')
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    };
  
    const intervalId = setInterval(() => {
      callFunction();
    }, 3000);
  
    return () => clearInterval(intervalId); 
  }, [isVerified]);
  

  useEffect(() => {
    if (isVerified) {
      const timeout = setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
  
      return () => clearTimeout(timeout);
    }
  }, [isVerified]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md px-4 py-8 text-center">
        <div className="mb-6">
          <Image src="/favicon.svg" alt="Vicast" width={120} height={120} className="mx-auto rounded-full" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Email Verification</h1>
        <p className="mb-6 text-zinc-400">Please check your email to verify your account</p>

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
          <div className="flex items-center justify-center gap-2 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Redirecting to dashboard...</span>
          </div>
        )}
      </div>
    </div>
  )
}
