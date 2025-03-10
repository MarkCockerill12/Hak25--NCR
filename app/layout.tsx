"use client"

import { usePathname } from "next/navigation"
import { Geist, Geist_Mono } from "next/font/google"
import { UserNav } from "@/components/user-nav"
import { UserProvider } from "@/app/hooks/use-local-storage"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const showHeader = pathname.startsWith('/dashboard')

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          {/* Only show header on dashboard pages */}
          {showHeader && (
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <div className="flex h-16 items-center px-4 md:px-6">
                <div className="flex-1">
                  <h1 className="text-x2 font-bold text-blue-600 dark:text-blue-400">Commisioned by NCR-Atleos</h1>
                </div>
                <div className="flex items-center gap-4">
                  <UserNav />
                </div>
              </div>
            </header>
          )}

          {/* Main Content */}
          <main>
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}