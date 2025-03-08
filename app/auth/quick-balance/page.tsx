"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function QuickBalancePage() {
  const [cardNumber, setCardNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [showBalance, setShowBalance] = useState(false)
  const [balance, setBalance] = useState<number | null>(null)

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")

    // Format with spaces every 4 digits
    let formatted = ""
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " "
      }
      formatted += value[i]
    }

    // Limit to 19 characters (16 digits + 3 spaces)
    if (formatted.length <= 19) {
      setCardNumber(formatted)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Demo card: 4111 1111 1111 1111
      if (cardNumber.replace(/\s/g, "") === "4111111111111111") {
        setBalance(2543.87)
        setShowBalance(true)
      } else {
        alert("Card not found. For demo, use 4111 1111 1111 1111")
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
            <CardTitle className="text-2xl text-gray-900 dark:text-white">Quick Balance Check</CardTitle>
          </CardHeader>
          <CardContent>
            {!showBalance ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-gray-700 dark:text-gray-300">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="text-lg h-12 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    placeholder="•••• •••• •••• ••••"
                    autoFocus
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg"
                  disabled={cardNumber.replace(/\s/g, "").length !== 16 || loading}
                >
                  {loading ? "Checking..." : "Check Balance"}
                </Button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Available Balance</div>
                  <div className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(balance || 0)}
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400">Card ending in {cardNumber.slice(-4)}</div>

                <Button onClick={() => setShowBalance(false)} variant="outline" className="w-full">
                  Check Another Card
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/auth" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
              Sign in for full access
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

