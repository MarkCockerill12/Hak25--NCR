"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { CreditCard, DollarSign, Home, LineChart, Menu, PiggyBank, X } from "lucide-react"

interface DashboardShellProps {
  children: React.ReactNode
  atmMode?: boolean
}

export function DashboardShell({ children, atmMode = false }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Accounts",
      href: "/dashboard/accounts",
      icon: CreditCard,
    },
    {
      title: "Savings",
      href: "/dashboard/savings",
      icon: PiggyBank,
    },
    {
      title: "Investments",
      href: "/dashboard/investments",
      icon: LineChart,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Fixed Sidebar for desktop */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0 overflow-y-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${atmMode ? "md:hidden" : ""}`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/dashboard" className="flex items-center">
            <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">NextGen ATM</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className={`${atmMode ? "" : "md:ml-64"}`}>
        {/* Mobile header with menu button */}
        <div className={`md:hidden mb-4 ${atmMode ? "hidden" : ""}`}>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 dark:text-gray-300"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Page content */}
        <main className={`p-4 md:p-6 ${atmMode ? "max-w-3xl mx-auto" : ""}`}>
          {children}
        </main>
      </div>
    </div>
  )
}