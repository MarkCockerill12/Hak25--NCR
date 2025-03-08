import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { LanguageSelector } from "../components/language-selector"
import { Fingerprint, Globe, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "NextGen ATM",
  description: "The ATM of the future",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <header className="container flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">NextGen ATM</h1>
        <div className="flex items-center gap-4">
          <LanguageSelector />
        </div>
      </header>
      <main className="container flex-1 flex flex-col items-center justify-center py-12">
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to the Future of Banking</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Secure, intuitive, and designed for your financial needs
                </p>
              </div>
              <div className="grid gap-4 w-full">
                <Link href="/auth" passHref>
                  <Button className="w-full h-12 text-lg">Card Login</Button>
                </Link>
                <Link href="/auth/biometric" passHref>
                  <Button variant="outline" className="w-full h-12 text-lg flex items-center gap-2">
                    <Fingerprint className="w-5 h-5" />
                    Biometric Login
                  </Button>
                </Link>
                <Link href="/auth/quick-balance" passHref>
                  <Button variant="ghost" className="w-full">
                    Quick Balance Check
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <FeatureCard
            icon={<Fingerprint className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title="Biometric Security"
            description="Authenticate with your fingerprint or face for enhanced security"
          />
          <FeatureCard
            icon={<Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title="Global Access"
            description="Access your accounts in multiple languages and currencies"
          />
          <FeatureCard
            icon={<ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title="Advanced Protection"
            description="State-of-the-art encryption and fraud detection systems"
          />
        </div>
      </main>
      <footer className="container py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© 2025 NextGen ATM. All rights reserved.</p>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-0">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-2">
        <div className="mb-2">{icon}</div>
        <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

