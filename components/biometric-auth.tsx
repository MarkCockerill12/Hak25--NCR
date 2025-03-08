"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Fingerprint, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export function BiometricAuth() {
  const [authenticating, setAuthenticating] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  const handleBiometricAuth = () => {
    setAuthenticating(true)

    // Simulate biometric authentication
    setTimeout(() => {
      setAuthenticating(false)
      setAuthenticated(true)

      // Redirect to dashboard after successful authentication
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleBiometricAuth}
        disabled={authenticating || authenticated}
        size="lg"
        className="h-24 w-24 rounded-full"
      >
        {authenticated ? <Check className="h-10 w-10" /> : <Fingerprint className="h-10 w-10" />}
      </Button>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {authenticating
          ? "Authenticating..."
          : authenticated
            ? "Authentication successful!"
            : "Place your finger on the scanner"}
      </p>
    </div>
  )
}

