"use client"

import { useState } from "react"
import type React from "react"
import { Button } from "./ui/button"
import { ArrowUpRight, CreditCard, Download, PiggyBank, Smartphone, Upload } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface QuickActionsProps {
  onTransfer?: () => void
  accounts?: Array<{
    id: string
    name: string
    number: string
    balance: number
    available: number
  }>
  onUpdateAccounts?: (data: any) => void
  onPayBills?: () => void
  onSavings?: () => void
  onMobileTopup?: () => void
}

export function QuickActions({ 
  onTransfer, 
  accounts = [], 
  onUpdateAccounts = () => {},
  onPayBills = () => {},
  onSavings = () => {},
  onMobileTopup = () => {}
}: QuickActionsProps) {
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)
  const [isBillPayDialogOpen, setIsBillPayDialogOpen] = useState(false)
  const [isMobileTopupDialogOpen, setIsMobileTopupDialogOpen] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [billPayee, setBillPayee] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  // Handle deposit submission
  const handleDeposit = () => {
    const depositAmount = Number.parseFloat(amount)
    if (isNaN(depositAmount) || depositAmount <= 0 || !selectedAccount) return

    // Find the account
    const account = accounts.find((acc) => acc.id === selectedAccount)
    if (!account) return

    // Create new transaction
    const depositTransaction = {
      id: `t${Date.now()}`,
      accountId: account.id,
      type: "credit",
      description: "Cash Deposit",
      category: "Deposit",
      amount: depositAmount,
      date: new Date().toISOString(),
    }

    // Update account balance
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === account.id) {
        return {
          ...acc,
          balance: acc.balance + depositAmount,
          available: acc.available + depositAmount,
        }
      }
      return acc
    })

    // Update state via callback
    onUpdateAccounts({
      accounts: updatedAccounts,
      transactions: [depositTransaction], // Let the parent component handle merging with existing transactions
    })

    // Close dialog and reset form
    setIsDepositDialogOpen(false)
    setSelectedAccount("")
    setAmount("")
  }

  // Handle withdrawal submission
  const handleWithdraw = () => {
    const withdrawAmount = Number.parseFloat(amount)
    if (isNaN(withdrawAmount) || withdrawAmount <= 0 || !selectedAccount) return

    // Find the account
    const account = accounts.find((acc) => acc.id === selectedAccount)
    if (!account) return

    // Check if there are sufficient funds
    if (account.available < withdrawAmount) {
      alert("Insufficient funds for this withdrawal.")
      return
    }

    // Create new transaction
    const withdrawTransaction = {
      id: `t${Date.now()}`,
      accountId: account.id,
      type: "debit",
      description: "ATM Withdrawal",
      category: "Withdrawal",
      amount: withdrawAmount,
      date: new Date().toISOString(),
    }

    // Update account balance
    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === account.id) {
        return {
          ...acc,
          balance: acc.balance - withdrawAmount,
          available: acc.available - withdrawAmount,
        }
      }
      return acc
    })

    // Update state via callback
    onUpdateAccounts({
      accounts: updatedAccounts,
      transactions: [withdrawTransaction], // Let the parent component handle merging with existing transactions
    })

    // Close dialog and reset form
    setIsWithdrawDialogOpen(false)
    setSelectedAccount("")
    setAmount("")
  }

  // Handle bill payment
  const handlePayBill = () => {
    const paymentAmount = parseFloat(amount)
    if (isNaN(paymentAmount) || paymentAmount <= 0 || !selectedAccount || !billPayee) return
    
    // Find the account
    const account = accounts.find(acc => acc.id === selectedAccount)
    if (!account) return
    
    // Check if there are sufficient funds
    if (account.available < paymentAmount) {
      alert("Insufficient funds for this payment.")
      return
    }
    
    // Create new transaction
    const billTransaction = {
      id: `t${Date.now()}`,
      accountId: account.id,
      type: "debit",
      description: `Bill Payment - ${billPayee}`,
      category: "Bills",
      amount: paymentAmount,
      date: new Date().toISOString(),
    }
    
    // Update account balance
    const updatedAccounts = accounts.map(acc => {
      if (acc.id === account.id) {
        return {
          ...acc,
          balance: acc.balance - paymentAmount,
          available: acc.available - paymentAmount
        }
      }
      return acc
    })
    
    // Update state via callback
    onUpdateAccounts({
      accounts: updatedAccounts,
      transactions: [billTransaction] // Let the parent component handle merging with existing transactions
    })
    
    // Close dialog and reset form
    setIsBillPayDialogOpen(false)
    setSelectedAccount("")
    setAmount("")
    setBillPayee("")
  }

  // Handle mobile top-up
  const handleMobileTopup = () => {
    const topupAmount = parseFloat(amount)
    if (isNaN(topupAmount) || topupAmount <= 0 || !selectedAccount || !phoneNumber) return
    
    // Find the account
    const account = accounts.find(acc => acc.id === selectedAccount)
    if (!account) return
    
    // Check if there are sufficient funds
    if (account.available < topupAmount) {
      alert("Insufficient funds for this top-up.")
      return
    }
    
    // Create new transaction
    const topupTransaction = {
      id: `t${Date.now()}`,
      accountId: account.id,
      type: "debit",
      description: `Mobile Top-up - ${phoneNumber}`,
      category: "Mobile",
      amount: topupAmount,
      date: new Date().toISOString(),
    }
    
    // Update account balance
    const updatedAccounts = accounts.map(acc => {
      if (acc.id === account.id) {
        return {
          ...acc,
          balance: acc.balance - topupAmount,
          available: acc.available - topupAmount
        }
      }
      return acc
    })
    
    // Update state via callback
    onUpdateAccounts({
      accounts: updatedAccounts,
      transactions: [topupTransaction] // Let the parent component handle merging with existing transactions
    })
    
    // Close dialog and reset form
    setIsMobileTopupDialogOpen(false)
    setSelectedAccount("")
    setAmount("")
    setPhoneNumber("")
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <ActionButton 
          icon={<Upload className="h-4 w-4" />} 
          label="Deposit" 
          onClick={() => setIsDepositDialogOpen(true)}
        />
        <ActionButton 
          icon={<Download className="h-4 w-4" />} 
          label="Withdraw" 
          onClick={() => setIsWithdrawDialogOpen(true)}
        />
        <ActionButton 
          icon={<ArrowUpRight className="h-4 w-4" />} 
          label="Transfer" 
          onClick={onTransfer}
        />
        <ActionButton 
          icon={<CreditCard className="h-4 w-4" />} 
          label="Pay Bills" 
          onClick={() => setIsBillPayDialogOpen(true)}
        />
        <ActionButton 
          icon={<PiggyBank className="h-4 w-4" />} 
          label="Savings" 
          onClick={onSavings}
        />
        <ActionButton 
          icon={<Smartphone className="h-4 w-4" />} 
          label="Mobile Top-up" 
          onClick={() => setIsMobileTopupDialogOpen(true)}
        />
      </div>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit Funds</DialogTitle>
            <DialogDescription>Deposit money into your account.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="depositAccount">Select Account</Label>
              <select
                id="depositAccount"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="">Select an account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.number})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="depositAmount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="depositAmount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeposit} disabled={!amount || Number.parseFloat(amount) <= 0 || !selectedAccount}>
              Deposit Funds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>Withdraw money from your account.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="withdrawAccount">Select Account</Label>
              <select
                id="withdrawAccount"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="">Select an account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.number}) - ${account.available.toFixed(2)} available
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="withdrawAmount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="withdrawAmount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  min="0.01"
                  step="0.01"
                />
              </div>
              {selectedAccount && (
                <p className="text-xs text-gray-500">
                  Available balance: $
                  {accounts.find((acc) => acc.id === selectedAccount)?.available.toFixed(2) || "0.00"}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleWithdraw} disabled={!amount || Number.parseFloat(amount) <= 0 || !selectedAccount}>
              Withdraw Funds
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bill Pay Dialog */}
      <Dialog open={isBillPayDialogOpen} onOpenChange={setIsBillPayDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay Bills</DialogTitle>
            <DialogDescription>
              Pay your bills from your account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="billPayAccount">Select Account</Label>
              <select
                id="billPayAccount"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="">Select an account</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.number}) - ${account.available.toFixed(2)} available
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billPayee">Payee</Label>
              <select
                id="billPayee"
                value={billPayee}
                onChange={(e) => setBillPayee(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="">Select a payee</option>
                <option value="Electric Company">Electric Company</option>
                <option value="Water Utility">Water Utility</option>
                <option value="Internet Provider">Internet Provider</option>
                <option value="Cell Phone">Cell Phone</option>
                <option value="Credit Card">Credit Card</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billAmount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="billAmount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  min="0.01"
                  step="0.01"
                />
              </div>
              {selectedAccount && (
                <p className="text-xs text-gray-500">
                  Available balance: ${accounts.find(acc => acc.id === selectedAccount)?.available.toFixed(2) || '0.00'}
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBillPayDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handlePayBill} 
              disabled={!amount || parseFloat(amount) <= 0 || !selectedAccount || !billPayee}
            >
              Pay Bill
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Top-up Dialog */}
      <Dialog open={isMobileTopupDialogOpen} onOpenChange={setIsMobileTopupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mobile Top-up</DialogTitle>
            <DialogDescription>
              Add credit to your mobile phone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="topupAccount">Select Account</Label>
              <select
                id="topupAccount"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
              >
                <option value="">Select an account</option>
                {accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.number}) - ${account.available.toFixed(2)} available
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="(123) 456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topupAmount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="topupAmount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                  min="0.01"
                  step="0.01"
                />
              </div>
              {selectedAccount && (
                <p className="text-xs text-gray-500">
                  Available balance: ${accounts.find(acc => acc.id === selectedAccount)?.available.toFixed(2) || '0.00'}
                </p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMobileTopupDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleMobileTopup} 
              disabled={!amount || parseFloat(amount) <= 0 || !selectedAccount || !phoneNumber}
            >
              Top-up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function ActionButton({
  icon,
  label,
  onClick = () => {},
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}) {
  return (
    <Button
      variant="outline"
      className="h-auto flex-col py-4 gap-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
      onClick={onClick}
    >
      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">{icon}</div>
      <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
    </Button>
  )
}
