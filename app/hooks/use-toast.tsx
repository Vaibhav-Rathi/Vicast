"use client"

import { useEffect, useState } from "react"
import { toast as sonnerToast, Toaster as SonnerToaster, ToasterProps } from "sonner"

export interface ToastProps {
  id?: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: React.ReactNode
  onDismiss?: () => void
  duration?: number
  [key: string]: any  // For any additional props that sonner supports
}

export interface Toast extends ToastProps {
  id: string
}

interface UseToastReturn {
  toast: (props: ToastProps) => void
  toasts: Toast[]
  dismiss: (toastId?: string) => void
}

/**
 * Custom hook for using Sonner toast notifications
 * Provides a simplified interface for toast notifications
 */
export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ 
    title, 
    description, 
    variant = "default", 
    action,
    onDismiss,
    duration = 5000,
    ...props 
  }: ToastProps) => {
    const toastOptions: Record<string, any> = {
      duration,
      onDismiss,
      ...props,
      // Map variant to sonner's style
      style: variant === "destructive" ? 
        { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" } : 
        undefined
    }

    // Generate a unique ID if not provided
    const id = props.id || Date.now().toString()
    
    // Store the toast in our state for tracking
    const newToast: Toast = { id, title, description, variant, action }
    setToasts((prev) => [...prev, newToast])

    // Handle different toast types based on content
    if (title && description) {
      return sonnerToast(title, {
        description,
        action,
        ...toastOptions
      })
    } else {
      return sonnerToast(title || description || "", toastOptions)
    }
  }

  // Expose methods that match the original implementation
  return {
    toast,
    toasts,
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId)
        setToasts(prev => prev.filter(t => t.id !== toastId))
      } else {
        sonnerToast.dismiss()
        setToasts([])
      }
    }
  }
}

// For direct toast usage
export const toast = ({ 
  title, 
  description, 
  variant = "default", 
  action,
  duration = 5000,
  ...props 
}: ToastProps) => {
  const toastOptions: Record<string, any> = {
    duration,
    ...props,
    style: variant === "destructive" ? 
      { backgroundColor: "var(--destructive)", color: "var(--destructive-foreground)" } : 
      undefined
  }

  if (title && description) {
    return sonnerToast(title, {
      description,
      action,
      ...toastOptions
    })
  } else {
    return sonnerToast(title || description || "", toastOptions)
  }
}

// Export the Toaster component for use in layout
export function Toaster(props: Partial<ToasterProps>) {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        className: "sonner-toast",
      }}
      {...props}
    />
  )
}