"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { AccountSummary } from "../../components/account-summary"
import { TransactionHistory } from "../../components/transaction-history"
import { FinancialInsights } from "../../components/financial-insights"
import { QuickActions } from "../../components/quick-actions"
import { UserNav } from "../../components/user-nav"
import { LayoutDashboard, CreditCard, BarChart3, PiggyBank, Settings, LogOut } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">NextGen ATM</h1>
        </div>

        <div className="flex flex-col flex-1 py-4">
          <nav className="space-y-1 px-2">
            <NavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" active={true} />
            <NavItem href="/dashboard/accounts" icon={<CreditCard className="h-5 w-5" />} label="Accounts" />
            <NavItem href="/dashboard/investments" icon={<BarChart3 className="h-5 w-5" />} label="Investments" />
            <NavItem href="/dashboard/savings" icon={<PiggyBank className="h-5 w-5" />} label="Savings" />
            <NavItem href="/dashboard/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
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
          <div className="flex flex-col space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, John Doe</p>
              </div>
              <div className="mt-2 md:mt-0">
                <Button>
                  <PiggyBank className="mr-2 h-4 w-4" />
                  New Transfer
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <AccountSummary
                    title="Checking Account"
                    accountNumber="**** 1234"
                    balance={2543.87}
                    change={+125.24}
                  />
                  <AccountSummary
                    title="Savings Account"
                    accountNumber="**** 5678"
                    balance={15750.52}
                    change={+350.12}
                  />
                  <AccountSummary
                    title="Investment Portfolio"
                    accountNumber="**** 9012"
                    balance={32150.75}
                    change={-125.65}
                  />
                  <AccountSummary
                    title="Credit Card"
                    accountNumber="**** 3456"
                    balance={-450.33}
                    change={+50.0}
                    isCredit
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="col-span-2">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Recent Transactions</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        Your latest financial activity
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TransactionHistory limit={5} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Quick Actions</CardTitle>
                      <CardDescription className="text-gray-500 dark:text-gray-400">
                        Common tasks and services
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <QuickActions />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Transaction History</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      A detailed view of your recent transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionHistory limit={20} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Financial Insights</CardTitle>
                    <CardDescription className="text-gray-500 dark:text-gray-400">
                      Understand your spending patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FinancialInsights />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
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

