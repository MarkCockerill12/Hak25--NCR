"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { DashboardShell } from "../../../components/dashboard-shell"
import { AccountDetails } from "../../../components/account-details"
import { AccountActivity } from "../../../components/account-activity"
import { AccountSettings } from "../../../components/account-settings"
import { Badge } from "../../../components/ui/badge"
import { ArrowUpRight, Download, Eye, EyeOff, FileText, Plus, Share2, Settings } from 'lucide-react'
import { useLocalStorage } from "../../hooks/use-local-storage"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"

// Initial accounts data if none exists in localStorage
const initialAccountsData = {
  accounts: [
    {
      id: "acc1",
      name: "Everyday Checking",
      number: "**** 1234",
      type: "checking",
      balance: 2543.87,
      available: 2543.87,
      currency: "USD",
      status: "active",
      isDefault: true,
      openDate: "2022-01-15",
      accountHolder: "John Doe",
      accountType: "Individual",
      interestRate: 0.01,
      routingNumber: "074000078",
      branch: "Main Street Financial Center",
      lastStatement: "2025-03-01",
      overdraftLimit: 500.0,
      jointOwners: [],
      features: ["Online Banking", "Mobile Deposits", "Bill Pay", "Zelle Transfers"],
    },
    {
      id: "acc2",
      name: "Premium Savings",
      number: "**** 5678",
      type: "savings",
      balance: 15750.52,
      available: 15750.52,
      currency: "USD",
      status: "active",
      isDefault: false,
      openDate: "2022-01-15",
      accountHolder: "John Doe",
      accountType: "Individual",
      interestRate: 1.25,
      routingNumber: "074000078",
      branch: "Main Street Financial Center",
      lastStatement: "2025-03-01",
      overdraftLimit: 0.0,
      jointOwners: [],
      features: ["Online Banking", "Mobile Deposits", "Bill Pay", "Zelle Transfers"],
    },
    {
      id: "acc3",
      name: "Joint Checking",
      number: "**** 9012",
      type: "checking",
      balance: 4320.18,
      available: 4320.18,
      currency: "USD",
      status: "active",
      isDefault: false,
      openDate: "2022-01-15",
      accountHolder: "John Doe & Jane Doe",
      accountType: "Joint",
      interestRate: 0.01,
      routingNumber: "074000078",
      branch: "Main Street Financial Center",
      lastStatement: "2025-03-01",
      overdraftLimit: 500.0,
      jointOwners: ["Jane Doe"],
      features: ["Online Banking", "Mobile Deposits", "Bill Pay", "Zelle Transfers"],
    },
    {
      id: "acc4",
      name: "Emergency Fund",
      number: "**** 3456",
      type: "savings",
      balance: 8500.0,
      available: 8500.0,
      currency: "USD",
      status: "active",
      isDefault: false,
      openDate: "2022-01-15",
      accountHolder: "John Doe",
      accountType: "Individual",
      interestRate: 1.25,
      routingNumber: "074000078",
      branch: "Main Street Financial Center",
      lastStatement: "2025-03-01",
      overdraftLimit: 0.0,
      jointOwners: [],
      features: ["Online Banking", "Mobile Deposits", "Bill Pay", "Zelle Transfers"],
    },
  ],
  transactions: [
    {
      id: "t1",
      accountId: "acc1",
      type: "debit",
      description: "Grocery Store",
      category: "Shopping",
      amount: 78.45,
      date: "2025-03-07T14:30:00",
    },
    {
      id: "t2",
      accountId: "acc1",
      type: "credit",
      description: "Salary Deposit",
      category: "Income",
      amount: 2500.0,
      date: "2025-03-05T09:15:00",
    },
    {
      id: "t3",
      accountId: "acc1",
      type: "debit",
      description: "Coffee Shop",
      category: "Food & Drink",
      amount: 4.5,
      date: "2025-03-04T08:20:00",
    },
    {
      id: "t4",
      accountId: "acc1",
      type: "debit",
      description: "Monthly Rent",
      category: "Housing",
      amount: 1200.0,
      date: "2025-03-03T00:00:00",
    },
    {
      id: "t5",
      accountId: "acc1",
      type: "debit",
      description: "Phone Bill",
      category: "Utilities",
      amount: 65.99,
      date: "2025-03-02T12:45:00",
    },
    {
      id: "t6",
      accountId: "acc2",
      type: "debit",
      description: "Restaurant Dinner",
      category: "Food & Drink",
      amount: 42.75,
      date: "2025-03-01T19:30:00",
    },
    {
      id: "t7",
      accountId: "acc2",
      type: "debit",
      description: "Online Purchase",
      category: "Shopping",
      amount: 29.99,
      date: "2025-02-28T15:20:00",
    },
    {
      id: "t8",
      accountId: "acc2",
      type: "credit",
      description: "Refund",
      category: "Income",
      amount: 19.99,
      date: "2025-02-27T10:15:00",
    },
    {
      id: "t9",
      accountId: "acc1",
      type: "debit",
      description: "Gas Station",
      category: "Transportation",
      amount: 45.67,
      date: "2025-02-26T16:30:00",
    },
    {
      id: "t10",
      accountId: "acc1",
      type: "debit",
      description: "Pharmacy",
      category: "Healthcare",
      amount: 32.5,
      date: "2025-02-25T13:45:00",
    },
    {
      id: "t11",
      accountId: "acc3",
      type: "debit",
      description: "Streaming Service",
      category: "Entertainment",
      amount: 14.99,
      date: "2025-02-24T08:00:00",
    },
    {
      id: "t12",
      accountId: "acc3",
      type: "credit",
      description: "Interest Payment",
      category: "Income",
      amount: 5.23,
      date: "2025-02-23T00:00:00",
    },
    {
      id: "t13",
      accountId: "acc4",
      type: "credit",
      description: "Savings Deposit",
      category: "Transfer",
      amount: 500.0,
      date: "2025-02-22T10:30:00",
    },
    {
      id: "t14",
      accountId: "acc4",
      type: "credit",
      description: "Interest Payment",
      category: "Income",
      amount: 12.75,
      date: "2025-02-21T00:00:00",
    },
  ],
}

export default function AccountsPage() {
  // Use localStorage to persist accounts data
  const [accountsData, setAccountsData] = useLocalStorage("nextgen-atm-accounts", initialAccountsData)
  const [selectedAccount, setSelectedAccount] = useState(accountsData.accounts[0])
  const [showBalances, setShowBalances] = useState(true)
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)

  // New account form state
  const [newAccountName, setNewAccountName] = useState("")
  const [newAccountType, setNewAccountType] = useState("checking")

  // Transfer form state
  const [transferAmount, setTransferAmount] = useState("")
  const [transferToAccount, setTransferToAccount] = useState("")

  // Update selected account when accountsData changes
  useEffect(() => {
    const account = accountsData.accounts.find((acc) => acc.id === selectedAccount.id)
    if (account) {
      setSelectedAccount(account)
    } else if (accountsData.accounts.length > 0) {
      setSelectedAccount(accountsData.accounts[0])
    }
  }, [accountsData, selectedAccount.id])

  // Handle creating a new account
  const handleCreateAccount = () => {
    if (!newAccountName) return

    const newAccount = {
      id: `acc${accountsData.accounts.length + 1}`,
      name: newAccountName,
      number: `**** ${Math.floor(1000 + Math.random() * 9000)}`,
      type: newAccountType,
      balance: 0,
      available: 0,
      currency: "USD",
      status: "active",
      isDefault: false,
      openDate: new Date().toISOString(),
      accountHolder: "John Doe",
      accountType: "Individual",
      interestRate: newAccountType === "savings" ? 1.25 : 0.01,
      routingNumber: "074000078",
      branch: "Main Street Financial Center",
      lastStatement: new Date().toISOString(),
      overdraftLimit: newAccountType === "checking" ? 500.0 : 0.0,
      jointOwners: [],
      features: ["Online Banking", "Mobile Deposits", "Bill Pay", "Zelle Transfers"],
    }

    setAccountsData({
      ...accountsData,
      accounts: [...accountsData.accounts, newAccount],
    })

    setSelectedAccount(newAccount)
    setIsNewAccountDialogOpen(false)
    setNewAccountName("")
    setNewAccountType("checking")
  }

  // Handle transferring money between accounts
  const handleTransfer = () => {
    const amount = Number.parseFloat(transferAmount)
    if (isNaN(amount) || amount <= 0 || !transferToAccount) return

    // Find the destination account
    const toAccount = accountsData.accounts.find((acc) => acc.id === transferToAccount)
    if (!toAccount) return

    // Check if there are sufficient funds
    if (selectedAccount.balance < amount) {
      alert("Insufficient funds for this transfer.")
      return
    }

    // Create new transactions
    const withdrawalTransaction = {
      id: `t${accountsData.transactions.length + 1}`,
      accountId: selectedAccount.id,
      type: "debit",
      description: `Transfer to ${toAccount.name}`,
      category: "Transfer",
      amount: amount,
      date: new Date().toISOString(),
    }

    const depositTransaction = {
      id: `t${accountsData.transactions.length + 2}`,
      accountId: toAccount.id,
      type: "credit",
      description: `Transfer from ${selectedAccount.name}`,
      category: "Transfer",
      amount: amount,
      date: new Date().toISOString(),
    }

    // Update account balances
    const updatedAccounts = accountsData.accounts.map((account) => {
      if (account.id === selectedAccount.id) {
        return {
          ...account,
          balance: account.balance - amount,
          available: account.available - amount,
        }
      } else if (account.id === toAccount.id) {
        return {
          ...account,
          balance: account.balance + amount,
          available: account.available + amount,
        }
      }
      return account
    })

    // Update state
    setAccountsData({
      accounts: updatedAccounts,
      transactions: [...accountsData.transactions, withdrawalTransaction, depositTransaction],
    })

    // Update selected account reference
    setSelectedAccount(updatedAccounts.find((acc) => acc.id === selectedAccount.id)!)

    // Close dialog and reset form
    setIsTransferDialogOpen(false)
    setTransferAmount("")
    setTransferToAccount("")
  }

  // Handle updating account settings
  const handleUpdateAccount = (updates: Partial<typeof selectedAccount>) => {
    const updatedAccounts = accountsData.accounts.map((account) => {
      if (account.id === selectedAccount.id) {
        return { ...account, ...updates }
      }

      // If setting this account as default, unset default on other accounts
      if (updates.isDefault && updates.isDefault === true) {
        return {
          ...account,
          isDefault: account.id === selectedAccount.id,
        }
      }

      return account
    })

    setAccountsData({
      ...accountsData,
      accounts: updatedAccounts,
    })

    // Update selected account reference
    setSelectedAccount({ ...selectedAccount, ...updates })
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Accounts</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your bank accounts and view transactions</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowBalances(!showBalances)}>
              {showBalances ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showBalances ? "Hide Balances" : "Show Balances"}
            </Button>
            <Button size="sm" onClick={() => setIsNewAccountDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {accountsData.accounts.map((account) => (
            <Card
              key={account.id}
              className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedAccount.id === account.id ? "border-blue-500 dark:border-blue-400" : ""
              }`}
              onClick={() => setSelectedAccount(account)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{account.name}</CardTitle>
                    <CardDescription>{account.number}</CardDescription>
                  </div>
                  {account.isDefault && (
                    <Badge
                      variant="outline"
                      className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                    >
                      Default
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {showBalances
                    ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(
                        account.balance,
                      )
                    : "••••••"}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Available:{" "}
                  {showBalances
                    ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(
                        account.available,
                      )
                    : "••••••"}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex gap-2 text-xs">
                  <span className="capitalize text-gray-500 dark:text-gray-400">{account.type}</span>
                  <span className="text-gray-400 dark:text-gray-600">•</span>
                  <span className="capitalize text-gray-500 dark:text-gray-400">{account.status}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>{selectedAccount.name}</CardTitle>
                <CardDescription>
                  Account {selectedAccount.number} •{" "}
                  {selectedAccount.type.charAt(0).toUpperCase() + selectedAccount.type.slice(1)}
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsTransferDialogOpen(true)}>
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Transfer
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Statements
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activity" className="space-y-4">
              <TabsList>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="details">Account Details</TabsTrigger>
                <TabsTrigger value="statements">Statements</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="space-y-4">
                <AccountActivity
                  accountId={selectedAccount.id}
                  transactions={accountsData.transactions}
                  showBalances={showBalances}
                />
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <AccountDetails account={selectedAccount} onUpdate={handleUpdateAccount} />
              </TabsContent>

              <TabsContent value="statements" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => {
                    const date = new Date()
                    date.setMonth(date.getMonth() - i)
                    const month = date.toLocaleString("default", { month: "long" })
                    const year = date.getFullYear()

                    return (
                      <Card key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {month} {year}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Statement</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <AccountSettings account={selectedAccount} onUpdate={handleUpdateAccount} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* New Account Dialog */}
      <Dialog open={isNewAccountDialogOpen} onOpenChange={setIsNewAccountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Account</DialogTitle>
            <DialogDescription>Open a new bank account to manage your finances.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="e.g., Vacation Fund"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <select
                id="accountType"
                value={newAccountType}
                onChange={(e) => setNewAccountType(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAccountDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAccount} disabled={!newAccountName}>
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfer Money</DialogTitle>
            <DialogDescription>Transfer funds from {selectedAccount.name} to another account.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
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
              <p className="text-xs text-gray-500">
                Available balance:{" "}
                {showBalances
                  ? new Intl.NumberFormat("en-US", { style: "currency", currency: selectedAccount.currency }).format(
                      selectedAccount.available,
                    )
                  : "••••••"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toAccount">To Account</Label>
              <select
                id="toAccount"
                value={transferToAccount}
                onChange={(e) => setTransferToAccount(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="">Select an account</option>
                {accountsData.accounts
                  .filter((account) => account.id !== selectedAccount.id)
                  .map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.number})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleTransfer}
              disabled={!transferAmount || Number.parseFloat(transferAmount) <= 0 || !transferToAccount}
            >
              Transfer Funds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
