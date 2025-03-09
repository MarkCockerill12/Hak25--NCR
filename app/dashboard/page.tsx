"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { AccountSummary } from "../../components/account-summary"
import { TransactionHistory } from "../../components/transaction-history"
import { FinancialInsights } from "../../components/financial-insights"
import { QuickActions } from "../../components/quick-actions"
import { UserNav } from "../../components/user-nav"
import { LayoutDashboard, CreditCard, BarChart3, PiggyBank, Settings, LogOut, Menu } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showTransferDialog, setShowTransferDialog] = useState(false)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferTo, setTransferTo] = useState("savings")
  const [transferFrom, setTransferFrom] = useState("checking")
  const [transferSuccess, setTransferSuccess] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const router = useRouter()

  // Handle logout
  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    // Simulate logout process
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  // Handle new transfer
  const handleNewTransfer = () => {
    setShowTransferDialog(true)
  }

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate processing
    setTimeout(() => {
      setTransferSuccess(true)
      
      // Reset and close after showing success
      setTimeout(() => {
        setTransferAmount("")
        setTransferSuccess(false)
        setShowTransferDialog(false)
      }, 2000)
    }, 1000)
  }

  // Handle mobile menu toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar - Mobile responsive */}
      <div className={`${isSidebarOpen ? 'flex' : 'hidden'} md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 absolute md:relative z-20 h-full`}>
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
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-500 dark:text-gray-400"
              onClick={handleLogout}
            >
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
            <Button 
              variant="outline" 
              size="icon" 
              className="mr-2 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto" onClick={() => isSidebarOpen && setIsSidebarOpen(false)}>
          <div className="flex flex-col space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, John Doe</p>
              </div>
              <div className="mt-2 md:mt-0">
                <Button onClick={handleNewTransfer}>
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

      {/* Money Transfer Dialog */}
      <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer Money</DialogTitle>
            <DialogDescription>
              {transferSuccess 
                ? "Transfer completed successfully!" 
                : "Transfer funds between your accounts."}
            </DialogDescription>
          </DialogHeader>
          
          {!transferSuccess ? (
            <form onSubmit={handleTransferSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="from" className="text-right">
                    From
                  </Label>
                  <select 
                    id="from"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    value={transferFrom}
                    onChange={(e) => setTransferFrom(e.target.value)}
                  >
                    <option value="checking">Checking (**** 1234)</option>
                    <option value="savings">Savings (**** 5678)</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="to" className="text-right">
                    To
                  </Label>
                  <select
                    id="to"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                  >
                    <option value="savings">Savings (**** 5678)</option>
                    <option value="checking">Checking (**** 1234)</option>
                    <option value="creditcard">Credit Card (**** 3456)</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="text"
                    placeholder="$0.00"
                    className="col-span-3"
                    value={transferAmount}
                    onChange={(e) => {
                      // Only allow numbers and decimals
                      const value = e.target.value;
                      if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
                        setTransferAmount(value);
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowTransferDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!transferAmount || transferFrom === transferTo}>
                  Transfer Now
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <div className="flex justify-center items-center py-8">
              <div className="bg-green-100 text-green-800 p-4 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  const router = useRouter()
  
  // Handle navigation with simulated loading
  const handleNavigation = (e: React.MouseEvent) => {
    e.preventDefault()
    // Let's simulate a navigation - in a real app,
    // we would actually navigate to the page
    if (!active) {
      router.push(href)
    }
  }
  
  return (
    <Link
      href={href}
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
        active
          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
      }`}
      onClick={handleNavigation}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  )
}