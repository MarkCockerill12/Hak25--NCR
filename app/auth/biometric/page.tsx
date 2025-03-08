"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { ArrowLeft, Fingerprint, Scan, Check } from "lucide-react"

export default function BiometricAuthPage() {
  const [stage, setStage] = useState<"initial" | "scanning" | "success">("initial")
  const router = useRouter()

  const startBiometricScan = () => {
    setStage("scanning")

    // Simulate biometric scanning
    setTimeout(() => {
      setStage("success")

      // Redirect to dashboard after successful authentication
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    }, 3000)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container flex flex-col items-center justify-center">
        <Link href="/" className="absolute top-4 left-4 text-blue-600 dark:text-blue-400">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl text-gray-900 dark:text-white">Biometric Authentication</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            {stage === "initial" && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                  <Fingerprint className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Use your fingerprint to securely access your account
                  </p>
                  <Button onClick={startBiometricScan} className="w-full h-12 text-lg mt-4">
                    Start Scan
                  </Button>
                </div>
              </div>
            )}

            {stage === "scanning" && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto relative">
                  <Scan className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping"></div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Scanning your fingerprint...</p>
              </div>
            )}

            {stage === "success" && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-green-600 dark:text-green-400 font-medium">Authentication successful!</p>
                <p className="text-gray-500 dark:text-gray-400">Redirecting to your account...</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/auth" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
              Use PIN instead
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

