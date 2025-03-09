"use client"

import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { AccountSummary } from "../../components/account-summary"
import { TransactionHistory } from "../../components/transaction-history"
import { FinancialInsights } from "../../components/financial-insights"
import { QuickActions } from "../../components/quick-actions"
import { DashboardShell } from "../../components/dashboard-shell"
import { PiggyBank, Eye, EyeOff, MonitorSmartphone } from "lucide-react"
import { useLocalStorage } from "../hooks/use-local-storage"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { initialAccountsData } from "../../lib/initial-data"
import { useRouter } from "next/navigation"
import { Switch } from "../../components/ui/switch"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [accountsData, setAccountsData] = useState<typeof initialAccountsData>({ accounts: [], transactions: [] }) // Start with empty arrays
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [savedData, setSavedData] = useLocalStorage("nextgen-atm-accounts", initialAccountsData)
  const [savingsData, setSavingsData] = useLocalStorage("nextgen-atm-savings", {
    accounts: [],
    goals: [],
    transactions: [],
  })

  // ATM mode state
  const [isAtmMode, setIsAtmMode] = useLocalStorage("nextgen-atm-mode", false)

  const router = useRouter()

  // Load data after initial render to prevent hydration mismatch
  useEffect(() => {
    setAccountsData(savedData)
    setIsDataLoaded(true)
  }, [savedData])

  // Save any changes to local storage
  useEffect(() => {
    if (isDataLoaded && accountsData.accounts.length > 0) {
      setSavedData(accountsData)
    }
  }, [accountsData, isDataLoaded, setSavedData])

  // Transfer dialog state
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [showBalances, setShowBalances] = useState(true)

  // Handle opening the transfer dialog
  const handleOpenTransferDialog = () => {
    if (accountsData.accounts.length > 0) {
      setFromAccount(accountsData.accounts[0].id)

      // Set to account to the second account if available, otherwise keep empty
      if (accountsData.accounts.length > 1) {
        setToAccount(accountsData.accounts[1].id)
      } else {
        setToAccount("")
      }
    }

    setTransferAmount("")
    setIsTransferDialogOpen(true)
  }

  // Handle transferring money between accounts
  const handleTransfer = () => {
    const amount = Number.parseFloat(transferAmount)
    if (isNaN(amount) || amount <= 0 || !fromAccount || !toAccount || fromAccount === toAccount) {
      return
    }

    // Find the source and destination accounts
    const sourceAccount = accountsData.accounts.find((acc) => acc.id === fromAccount)
    const destAccount = accountsData.accounts.find((acc) => acc.id === toAccount)

    if (!sourceAccount || !destAccount) return

    // Check if there are sufficient funds
    if (sourceAccount.balance < amount) {
      alert("Insufficient funds for this transfer.")
      return
    }

    // Create new transactions
    const withdrawalTransaction = {
      id: `t${Date.now()}-1`,
      accountId: sourceAccount.id,
      type: "debit",
      description: `Transfer to ${destAccount.name}`,
      category: "Transfer",
      amount: amount,
      date: new Date().toISOString(),
    }

    const depositTransaction = {
      id: `t${Date.now()}-2`,
      accountId: destAccount.id,
      type: "credit",
      description: `Transfer from ${sourceAccount.name}`,
      category: "Transfer",
      amount: amount,
      date: new Date().toISOString(),
    }

    // Update account balances
    const updatedAccounts = accountsData.accounts.map((account) => {
      if (account.id === sourceAccount.id) {
        return {
          ...account,
          balance: account.balance - amount,
          available: account.available - amount,
        }
      } else if (account.id === destAccount.id) {
        return {
          ...account,
          balance: account.balance + amount,
          available: account.available + amount,
        }
      }
      return account
    })

    // Update state
    setAccountsData((prevData) => ({
      accounts: updatedAccounts,
      transactions: [...prevData.transactions, withdrawalTransaction, depositTransaction],
    }))

    // Close dialog and reset form
    setIsTransferDialogOpen(false)
    setTransferAmount("")
  }

  // Navigation handlers for quick actions
  const handleNavigateToSavings = () => {
    router.push("/dashboard/savings")
  }

  // Get all accounts (checking, savings, etc.)
  const allAccounts = [...(accountsData.accounts || []), ...(savingsData.accounts || [])]

  // Toggle ATM mode
  const toggleAtmMode = () => {
    setIsAtmMode(!isAtmMode)

    // If we're entering ATM mode, make sure we're on the overview tab
    if (!isAtmMode) {
      setActiveTab("overview")
    }
  }

  // Effect to notify parent component about ATM mode change
  useEffect(() => {
    // This will be used by the DashboardShell to hide the sidebar
    document.documentElement.style.setProperty("--atm-mode", isAtmMode ? "true" : "false")

    return () => {
      document.documentElement.style.removeProperty("--atm-mode")
    }
  }, [isAtmMode])

  // Get default account (for ATM mode)
  const defaultAccount = accountsData.accounts?.find((acc) => acc.isDefault) || accountsData.accounts?.[0]

  if (!isDataLoaded) {
    return (
      <DashboardShell atmMode={isAtmMode}>
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your account data...</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell atmMode={isAtmMode}>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {isAtmMode ? "ATM" : "Dashboard"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Welcome back, John Doe</p>
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Switch id="atm-mode" checked={isAtmMode} onCheckedChange={toggleAtmMode} />
              <Label htmlFor="atm-mode" className="flex items-center gap-1.5">
                <MonitorSmartphone className="h-4 w-4" />
                ATM Mode
              </Label>
            </div>

            <Button variant="outline" size="sm" onClick={() => setShowBalances(!showBalances)}>
              {showBalances ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showBalances ? "Hide" : "Show"}
            </Button>

            {!isAtmMode && (
              <Button onClick={handleOpenTransferDialog}>
                <PiggyBank className="mr-2 h-4 w-4" />
                New Transfer
              </Button>
            )}
          </div>
        </div>

        {isAtmMode ? (
          // ATM Mode UI
          <div className="space-y-6">
            {/* Main Account Balance Card */}
            {defaultAccount && (
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">{defaultAccount.name}</h2>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {showBalances
                      ? new Intl.NumberFormat("en-US", { style: "currency", currency: defaultAccount.currency }).format(
                          defaultAccount.balance,
                        )
                      : "••••••"}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Available Balance:{" "}
                    {showBalances
                      ? new Intl.NumberFormat("en-US", { style: "currency", currency: defaultAccount.currency }).format(
                          defaultAccount.available,
                        )
                      : "••••••"}
                  </p>
                </div>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-gray-900 dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <QuickActions
                  onTransfer={handleOpenTransferDialog}
                  accounts={accountsData.accounts}
                  onUpdateAccounts={setAccountsData}
                  onSavings={handleNavigateToSavings}
                />
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                {defaultAccount && (
                  <TransactionHistory
                    limit={5}
                    showBalances={showBalances}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          // Regular Dashboard UI
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {allAccounts.slice(0, 4).map((account) => (
                  <AccountSummary
                    key={account.id}
                    title={account.name}
                    accountNumber={account.number}
                    balance={account.balance}
                    change={
                      account.id === "acc1"
                        ? +125.24
                        : account.id === "acc2"
                          ? +350.12
                          : account.id === "acc3"
                            ? -125.65
                            : +50.0
                    }
                    isCredit={account.type === "credit"}
                    showBalances={showBalances}
                  />
                ))}
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
                    <TransactionHistory
                      limit={20}
                      showBalances={showBalances}
                    />
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
                    <QuickActions
                      onTransfer={handleOpenTransferDialog}
                      accounts={accountsData.accounts}
                      onUpdateAccounts={setAccountsData}
                      onSavings={handleNavigateToSavings}
                    />
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
                  <TransactionHistory limit={20} transactions={accountsData.transactions} showBalances={showBalances} />
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
                    <FinancialInsights/>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Money</DialogTitle>
            <DialogDescription>Transfer funds between your accounts.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fromAccount">From Account</Label>
              <select
                id="fromAccount"
                value={fromAccount}
                onChange={(e) => setFromAccount(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="">Select an account</option>
                {accountsData.accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} (
                    {showBalances
                      ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(
                          account.balance,
                        )
                      : "••••••"}
                    )
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toAccount">To Account</Label>
              <select
                id="toAccount"
                value={toAccount}
                onChange={(e) => setToAccount(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="">Select an account</option>
                {accountsData.accounts
                  .filter((account) => account.id !== fromAccount)
                  .map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.number})
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transferAmount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="transferAmount"
                  type="number"
                  placeholder="0.00"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="pl-7"
                  min="0.01"
                  step="0.01"
                />
              </div>
              {fromAccount && (
                <p className="text-xs text-gray-500">
                  Available balance:{" "}
                  {showBalances
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: accountsData.accounts.find((acc) => acc.id === fromAccount)?.currency || "USD",
                      }).format(accountsData.accounts.find((acc) => acc.id === fromAccount)?.available || 0)
                    : "••••••"}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={
                !transferAmount ||
                Number.parseFloat(transferAmount) <= 0 ||
                !fromAccount ||
                !toAccount ||
                fromAccount === toAccount
              }
            >
              Transfer Funds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}

