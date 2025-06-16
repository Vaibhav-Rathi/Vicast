'use client'

import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { setCookie } from 'cookies-next'

interface GoogleLoginButtonProps {
  mode: 'signin' | 'signup'
  onSuccess?: (user: any) => void
  onError?: (error: string) => void
}

export function GoogleLoginButton({ mode, onSuccess, onError }: GoogleLoginButtonProps) {
  const router = useRouter()

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const endpoint = mode === 'signin' ? '/api/auth/google-signin' : '/api/auth/google-signup'
        
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
          access_token: tokenResponse.access_token
        })

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
          
          if (onSuccess) onSuccess(user)
          
          router.push("/dashboard")
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || `Google ${mode} failed`
        if (onError) onError(errorMessage)
        toast.error(errorMessage)
      }
    },
    onError: () => {
      const errorMessage = 'Google login failed'
      if (onError) onError(errorMessage)
      toast.error(errorMessage)
    }
  })

  return (
    <Button
      variant="outline"
      className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700"
      onClick={() => login()}
    >
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
      {mode === 'signin' ? 'Google' : 'Continue with Google'}
    </Button>
  )
}