"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Progress } from "../../../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { DashboardShell } from "../../../components/dashboard-shell"
import { SavingsGoal } from "../../../components/savings-goal"
import { SavingsHistory } from "../../../components/savings-history"
import { NewSavingsGoalDialog } from "../../../components/new-savings-goal-dialog"
import { useLocalStorage } from "../../hooks/use-local-storage"
import { ArrowUpRight, Calculator, Eye, EyeOff, PiggyBank, Plus, Rocket } from 'lucide-react'
import { InterestCalculator } from "../../../components/interest-calculator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"

// Initial savings data if none exists in localStorage
const initialSavingsData = {
  accounts: [
    {
      id: "sav1",
      name: "Emergency Fund",
      number: "**** 5678",
      balance: 15750.52,
      interestRate: 1.25,
      lastInterestPaid: "2025-02-15",
      nextInterestDate: "2025-03-15",
      openDate: "2022-01-15",
      currency: "USD",
      status: "active",
    },
    {
      id: "sav2",
      name: "Vacation Fund",
      number: "**** 3456",
      balance: 8500.00,
      interestRate: 1.5,
      lastInterestPaid: "2025-02-15",
      nextInterestDate: "2025-03-15",
      openDate: "2023-05-10",
      currency: "USD",
      status: "active",
    },
    {
      id: "sav3",
      name: "Home Down Payment",
      number: "**** 7890",
      balance: 32450.75,
      interestRate: 1.75,
      lastInterestPaid: "2025-02-15",
      nextInterestDate: "2025-03-15",
      openDate: "2022-08-22",
      currency: "USD",
      status: "active",
    }
  ],
  goals: [
    {
      id: "goal1",
      name: "Emergency Fund",
      targetAmount: 25000,
      currentAmount: 15750.52,
      targetDate: "2025-12-31",
      accountId: "sav1",
      color: "blue",
      autoTransfer: {
        enabled: true,
        amount: 500,
        frequency: "monthly",
        nextDate: "2025-04-01"
      }
    },
    {
      id: "goal2",
      name: "Summer Vacation",
      targetAmount: 10000,
      currentAmount: 8500,
      targetDate: "2025-06-15",
      accountId: "sav2",
      color: "green",
      autoTransfer: {
        enabled: true,
        amount: 300,
        frequency: "monthly",
        nextDate: "2025-04-01"
      }
    },
    {
      id: "goal3",
      name: "Home Down Payment",
      targetAmount: 50000,
      currentAmount: 32450.75,
      targetDate: "2026-09-30",
      accountId: "sav3",
      color: "purple",
      autoTransfer: {
        enabled: true,
        amount: 1000,
        frequency: "monthly",
        nextDate: "2025-04-01"
      }
    }
  ],
  transactions: [
    {
      id: "st1",
      accountId: "sav1",
      type: "deposit",
      amount: 500,
      date: "2025-03-01T10:30:00",
      description: "Monthly Savings Transfer",
      category: "Automatic Transfer"
    },
    {
      id: "st2",
      accountId: "sav1",
      type: "interest",
      amount: 16.25,
      date: "2025-02-15T00:00:00",
      description: "Interest Payment",
      category: "Interest"
    },
    {
      id: "st3",
      accountId: "sav2",
      type: "deposit",
      amount: 300,
      date: "2025-03-01T10:30:00",
      description: "Monthly Savings Transfer",
      category: "Automatic Transfer"
    },
    {
      id: "st4",
      accountId: "sav2",
      type: "interest",
      amount: 10.52,
      date: "2025-02-15T00:00:00",
      description: "Interest Payment",
      category: "Interest"
    },
    {
      id: "st5",
      accountId: "sav3",
      type: "deposit",
      amount: 1000,
      date: "2025-03-01T10:30:00",
      description: "Monthly Savings Transfer",
      category: "Automatic Transfer"
    },
    {
      id: "st6",
      accountId: "sav3",
      type: "interest",
      amount: 47.25,
      date: "2025-02-15T00:00:00",
      description: "Interest Payment",
      category: "Interest"
    }
  ]
}

export default function SavingsPage() {
  // Use localStorage to persist savings data
  const [savingsData, setSavingsData] = useLocalStorage('nextgen-atm-savings', initialSavingsData)
  const [selectedAccount, setSelectedAccount] = useState(savingsData.accounts[0])
  const [showBalances, setShowBalances] = useState(true)
  const [isNewGoalDialogOpen, setIsNewGoalDialogOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false)
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false)
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  
  // New account form state
  const [newAccountName, setNewAccountName] = useState("")
  const [newAccountInterestRate, setNewAccountInterestRate] = useState("1.25")
  
  // Transfer form state
  const [transferAmount, setTransferAmount] = useState("")
  const [transferToAccount, setTransferToAccount] = useState("")
  
  // Deposit form state
  const [depositAmount, setDepositAmount] = useState("")
  const [depositDescription, setDepositDescription] = useState("Savings Deposit")

  // Get goals for the selected account
  const accountGoals = savingsData.goals.filter(goal => goal.accountId === selectedAccount.id)

  // Calculate total progress across all goals
  const totalTargetAmount = accountGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = accountGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0

  // Define the goal type
  type SavingsGoalType = {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
    targetDate: string;
    accountId: string;
    color: string;
    autoTransfer: {
      enabled: boolean;
      amount: number;
      frequency: string;
      nextDate: string;
    };
  };
  
  // Handle adding a new savings goal
    const handleAddGoal = (newGoal: Omit<SavingsGoalType, 'id' | 'accountId' | 'currentAmount'>) => {
      const updatedGoals = [...savingsData.goals, {
        ...newGoal,
        id: `goal${savingsData.goals.length + 1}`,
        accountId: selectedAccount.id,
        currentAmount: 0
      }]
    
    setSavingsData({
      ...savingsData,
      goals: updatedGoals
    })
    
    setIsNewGoalDialogOpen(false)
  }

  // Handle updating a goal (e.g., adding funds)
  const handleUpdateGoal = (goalId: string, updates: Partial<SavingsGoalType>) => {
    const updatedGoals = savingsData.goals.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    )
    
    setSavingsData({
      ...savingsData,
      goals: updatedGoals
    })
  }

  // Define transaction type
  type SavingsTransaction = {
    type: 'deposit' | 'withdrawal' | 'interest' | 'transfer';
    amount: number;
    description: string;
    category: string;
    goalId?: string;
  }

  // Handle adding a transaction
  const handleAddTransaction = (transaction: SavingsTransaction) => {
    // Add the transaction
    const newTransaction = {
      id: `st${savingsData.transactions.length + 1}`,
      accountId: selectedAccount.id,
      date: new Date().toISOString(),
      ...transaction
    }
    
    // Update account balance
    const updatedAccounts = savingsData.accounts.map(account => {
      if (account.id === selectedAccount.id) {
        const balanceChange = transaction.type === 'withdrawal' 
          ? -transaction.amount 
          : transaction.amount
        
        return {
          ...account,
          balance: account.balance + balanceChange
        }
      }
      return account
    })
    
    // If this transaction is for a goal, update the goal's current amount
    let updatedGoals = [...savingsData.goals]
    if (transaction.goalId) {
      updatedGoals = updatedGoals.map(goal => {
        if (goal.id === transaction.goalId) {
          const amountChange = transaction.type === 'withdrawal' 
            ? -transaction.amount 
            : transaction.amount
          
          return {
            ...goal,
            currentAmount: goal.currentAmount + amountChange
          }
        }
        return goal
      })
    }
    
    setSavingsData({
      ...savingsData,
      accounts: updatedAccounts,
      goals: updatedGoals,
      transactions: [...savingsData.transactions, newTransaction]
    })
    
    // Update selected account reference
    setSelectedAccount(updatedAccounts.find(acc => acc.id === selectedAccount.id)!)
  }

  // Handle creating a new account
  const handleCreateAccount = () => {
    if (!newAccountName) return
    
    const newAccount = {
      id: `sav${savingsData.accounts.length + 1}`,
      name: newAccountName,
      number: `**** ${Math.floor(1000 + Math.random() * 9000)}`,
      balance: 0,
      interestRate: parseFloat(newAccountInterestRate),
      lastInterestPaid: new Date().toISOString(),
      nextInterestDate: new Date(new Date().setMonth(new Date().getMonth() + 1, 15)).toISOString(),
      openDate: new Date().toISOString(),
      currency: "USD",
      status: "active",
    }
    
    const updatedAccounts = [...savingsData.accounts, newAccount]
    
    setSavingsData({
      ...savingsData,
      accounts: updatedAccounts
    })
    
    setSelectedAccount(newAccount)
    setIsNewAccountDialogOpen(false)
    setNewAccountName("")
    setNewAccountInterestRate("1.25")
  }

  // Handle transferring money between accounts
  const handleTransfer = () => {
    const amount = parseFloat(transferAmount)
    if (isNaN(amount) || amount <= 0 || !transferToAccount) return
    
    // Find the destination account
    const toAccount = savingsData.accounts.find(acc => acc.id === transferToAccount)
    if (!toAccount) return
    
    // Check if there are sufficient funds
    if (selectedAccount.balance < amount) {
      alert("Insufficient funds for this transfer.")
      return
    }
    
    // Create new transactions
    const withdrawalTransaction = {
      id: `st${savingsData.transactions.length + 1}`,
      accountId: selectedAccount.id,
      type: "withdrawal",
      description: `Transfer to ${toAccount.name}`,
      category: "Transfer",
      amount: amount,
      date: new Date().toISOString(),
    }
    
    const depositTransaction = {
      id: `st${savingsData.transactions.length + 2}`,
      accountId: toAccount.id,
      type: "deposit",
      description: `Transfer from ${selectedAccount.name}`,
      category: "Transfer",
      amount: amount,
      date: new Date().toISOString(),
    }
    
    // Update account balances
    const updatedAccounts = savingsData.accounts.map(account => {
      if (account.id === selectedAccount.id) {
        return {
          ...account,
          balance: account.balance - amount
        }
      } else if (account.id === toAccount.id) {
        return {
          ...account,
          balance: account.balance + amount
        }
      }
      return account
    })
    
    // Update state
    setSavingsData({
      ...savingsData,
      accounts: updatedAccounts,
      transactions: [...savingsData.transactions, withdrawalTransaction, depositTransaction]
    })
    
    // Update selected account reference
    setSelectedAccount(updatedAccounts.find(acc => acc.id === selectedAccount.id)!)
    
    // Close dialog and reset form
    setIsTransferDialogOpen(false)
    setTransferAmount("")
    setTransferToAccount("")
  }

  // Handle deposit to account
  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) return
    
    // Add transaction
    handleAddTransaction({
      type: "deposit",
      amount,
      description: depositDescription || "Savings Deposit",
      category: "Deposit"
    })
    
    // Close dialog and reset form
    setIsDepositDialogOpen(false)
    setDepositAmount("")
    setDepositDescription("Savings Deposit")
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Savings</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your savings accounts and goals</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowBalances(!showBalances)}>
              {showBalances ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showBalances ? "Hide Balances" : "Show Balances"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsCalculatorOpen(true)}>
              <Calculator className="mr-2 h-4 w-4" />
              Calculator
            </Button>
            <Button size="sm" onClick={() => setIsNewAccountDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Account
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savingsData.accounts.map((account) => (
            <Card 
              key={account.id} 
              className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedAccount.id === account.id ? "border-blue-500 dark:border-blue-400" : ""
              }`}
              onClick={() => setSelectedAccount(account)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{account.name}</CardTitle>
                  <div className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {account.interestRate}% APY
                  </div>
                </div>
                <CardDescription>{account.number}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {showBalances 
                    ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(account.balance)
                    : "••••••"
                  }
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Next interest payment: {new Date(account.nextInterestDate).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex gap-2 text-xs">
                  <span className="capitalize text-gray-500 dark:text-gray-400">Savings</span>
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
                  Account {selectedAccount.number} • {showBalances 
                    ? new Intl.NumberFormat("en-US", { style: "currency", currency: selectedAccount.currency }).format(selectedAccount.balance)
                    : "••••••"
                  }
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsTransferDialogOpen(true)}
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Transfer
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsDepositDialogOpen(true)}
                >
                  <PiggyBank className="mr-2 h-4 w-4" />
                  Deposit
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setIsNewGoalDialogOpen(true)}
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  New Goal
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="goals" className="space-y-4">
              <TabsList>
                <TabsTrigger value="goals">Savings Goals</TabsTrigger>
                <TabsTrigger value="history">Transaction History</TabsTrigger>
                <TabsTrigger value="details">Account Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="goals" className="space-y-6">
                {accountGoals.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Progress</h3>
                        <span className="text-sm font-medium">
                          {Math.round(overallProgress)}%
                        </span>
                      </div>
                      <Progress value={overallProgress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {showBalances 
                            ? new Intl.NumberFormat("en-US", { style: "currency", currency: selectedAccount.currency }).format(totalCurrentAmount)
                            : "••••••"
                          }
                        </span>
                        <span>
                          {showBalances 
                            ? new Intl.NumberFormat("en-US", { style: "currency", currency: selectedAccount.currency }).format(totalTargetAmount)
                            : "••••••"
                          }
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {accountGoals.map((goal) => (
                        <SavingsGoal 
                          key={goal.id} 
                          goal={goal} 
                          showBalances={showBalances}
                          currency={selectedAccount.currency}
                          onUpdate={(updates) => handleUpdateGoal(goal.id, updates)}
                          onAddTransaction={handleAddTransaction}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <PiggyBank className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No savings goals yet</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Create your first savings goal to start tracking your progress
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setIsNewGoalDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create a Goal
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <SavingsHistory 
                  accountId={selectedAccount.id}
                  transactions={savingsData.transactions}
                  showBalances={showBalances}
                  currency={selectedAccount.currency}
                />
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Interest Rate</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{selectedAccount.interestRate}% APY</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Interest is compounded monthly and paid on the 15th
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Interest Paid</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {new Date(selectedAccount.lastInterestPaid).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Next payment: {new Date(selectedAccount.nextInterestDate).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Opened</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {new Date(selectedAccount.openDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.floor((new Date().getTime() - new Date(selectedAccount.openDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months ago
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interest Projection</CardTitle>
                    <CardDescription>
                      Estimated interest earnings based on your current balance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">1 Year</h3>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {showBalances 
                              ? new Intl.NumberFormat("en-US", { style: "currency", currency: selectedAccount.currency })
                                .format(selectedAccount.balance * (1 + selectedAccount.interestRate / 100) - selectedAccount.balance)
                              : "••••••"
                            }
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">3 Years</h3>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {showBalances 
                              ? new Intl.NumberFormat("en-US", { style: "currency", currency: selectedAccount.currency })
                                .format(selectedAccount.balance * Math.pow(1 + selectedAccount.interestRate / 100, 3) - selectedAccount.balance)
                              : "••••••"
                            }
                          </p>
                        </div>
                        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">5 Years</h3>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {showBalances 
                              ? new Intl.NumberFormat("en-US", { style: "currency", currency: selectedAccount.currency })
                                .format(selectedAccount.balance * Math.pow(1 + selectedAccount.interestRate / 100, 5) - selectedAccount.balance)
                              : "••••••"
                            }
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        * These projections assume no additional deposits or withdrawals and that the interest rate remains unchanged.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* New Goal Dialog */}
      <NewSavingsGoalDialog 
        open={isNewGoalDialogOpen}
        onOpenChange={setIsNewGoalDialogOpen}
        onSave={handleAddGoal}
      />

      {/* Interest Calculator Dialog */}
      <InterestCalculator 
        open={isCalculatorOpen}
        onOpenChange={setIsCalculatorOpen}
      />

      {/* New Account Dialog */}
      <Dialog open={isNewAccountDialogOpen} onOpenChange={setIsNewAccountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Savings Account</DialogTitle>
            <DialogDescription>
              Open a new savings account to manage your savings goals.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="e.g., College Fund"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.01"
                min="0"
                placeholder="1.25"
                value={newAccountInterestRate}
                onChange={(e) => setNewAccountInterestRate(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAccountDialogOpen(false)}>Cancel</Button>
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
            <DialogDescription>
              Transfer funds from {selectedAccount.name} to another account.
            </DialogDescription>
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
                Available balance: {showBalances 
                  ? new Intl.NumberFormat("en-US", { style: "currency", currency: selectedAccount.currency }).format(selectedAccount.balance)
                  : "••••••"
                }
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
                {savingsData.accounts
                  .filter(account => account.id !== selectedAccount.id)
                  .map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.number})
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleTransfer} 
              disabled={!transferAmount || parseFloat(transferAmount) <= 0 || !transferToAccount}
            >
              Transfer Funds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit to {selectedAccount.name}</DialogTitle>
            <DialogDescription>
              Add funds to your savings account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="depositAmount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="depositAmount"
                  type="number"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="pl-7"
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="depositDescription">Description</Label>
              <Input
                id="depositDescription"
                placeholder="Savings Deposit"
                value={depositDescription}
                onChange={(e) => setDepositDescription(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleDeposit} 
              disabled={!depositAmount || parseFloat(depositAmount) <= 0}
            >
              Deposit Funds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
