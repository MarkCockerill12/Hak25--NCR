"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ArrowLeft, CreditCard, Eye, EyeOff } from "lucide-react"

export default function AuthPage() {
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers and limit to 4 digits
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setLoading(false)
      // Demo PIN: 1234
      if (pin === "1234") {
        router.push("/dashboard")
      } else {
        alert("Invalid PIN. For demo, use 1234.")
      }
    }, 1500)
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
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-900 dark:text-white">Enter PIN</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin" className="text-gray-700 dark:text-gray-300">
                  PIN Code
                </Label>
                <div className="relative">
                  <Input
                    id="pin"
                    type={showPin ? "text" : "password"}
                    value={pin}
                    onChange={handlePinChange}
                    className="pr-10 text-lg h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    placeholder="• • • •"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((num, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={num === "" ? "ghost" : "outline"}
                    className={`h-14 text-lg ${num === "" ? "cursor-default" : ""}`}
                    disabled={num === ""}
                    onClick={() => {
                      if (num === "⌫") {
                        setPin(pin.slice(0, -1))
                      } else if (typeof num === "number" && pin.length < 4) {
                        setPin(pin + num)
                      }
                    }}
                  >
                    {num}
                  </Button>
                ))}
              </div>

              <Button type="submit" className="w-full h-12 text-lg" disabled={pin.length !== 4 || loading}>
                {loading ? "Authenticating..." : "Continue"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center">
              <Link href="/auth/biometric" className="text-blue-600 dark:text-blue-400 hover:underline">
                Use Biometric Authentication
              </Link>
            </div>
            <div className="text-center">
              <Link href="/auth/help" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
                Need Help?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

