"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { UserNav } from "./user-nav"
import { LayoutDashboard, CreditCard, BarChart3, PiggyBank, Settings, LogOut, User, Receipt } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  
  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/accounts", icon: CreditCard, label: "Accounts" },
    { href: "/dashboard/investments", icon: BarChart3, label: "Investments" },
    { href: "/dashboard/savings", icon: PiggyBank, label: "Savings" },
  ]

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">NextGen ATM</h1>
        </div>

        <div className="flex flex-col flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => (
              <NavItem 
                key={item.href}
                href={item.href} 
                icon={<item.icon className="h-5 w-5" />} 
                label={item.label} 
                active={pathname === item.href} 
              />
            ))}
          </nav>

          <div className="mt-auto px-2">
            <Button variant="ghost" className="w-full justify-start text-gray-500 dark:text-gray-400">
              <LogOut className="mr-2 h-5 w-5" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex h-16 items-center px-4 md:px-6">
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <LayoutDashboard className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        active 
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" 
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  )
}
