"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { ArrowUpRight, CreditCard, Download, PiggyBank, Smartphone, Upload } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function QuickActions() {
  const [activeAction, setActiveAction] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [actionSuccess, setActionSuccess] = useState(false)
  const [processingAction, setProcessingAction] = useState(false)

  const handleAction = (action: string) => {
    setActiveAction(action)
    setAmount("")
    setActionSuccess(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessingAction(true)
    
    // Simulate processing time
    setTimeout(() => {
      setProcessingAction(false)
      setActionSuccess(true)
      
      // Reset after showing success
      setTimeout(() => {
        setActiveAction(null)
        setActionSuccess(false)
      }, 2000)
    }, 1500)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <ActionButton 
          icon={<Upload className="h-4 w-4" />} 
          label="Deposit" 
          onClick={() => handleAction("deposit")}
        />
        <ActionButton 
          icon={<Download className="h-4 w-4" />} 
          label="Withdraw" 
          onClick={() => handleAction("withdraw")}
        />
        <ActionButton 
          icon={<ArrowUpRight className="h-4 w-4" />} 
          label="Transfer" 
          onClick={() => handleAction("transfer")}
        />
        <ActionButton 
          icon={<CreditCard className="h-4 w-4" />} 
          label="Pay Bills" 
          onClick={() => handleAction("billpay")}
        />
        <ActionButton 
          icon={<PiggyBank className="h-4 w-4" />} 
          label="Savings" 
          onClick={() => handleAction("savings")}
        />
        <ActionButton 
          icon={<Smartphone className="h-4 w-4" />} 
          label="Mobile Top-up" 
          onClick={() => handleAction("topup")}
        />
      </div>

      {/* Action Dialogs */}
      <Dialog open={activeAction !== null} onOpenChange={() => setActiveAction(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {activeAction === "deposit" && "Make a Deposit"}
              {activeAction === "withdraw" && "Make a Withdrawal"}
              {activeAction === "transfer" && "Transfer Money"}
              {activeAction === "billpay" && "Pay Bills"}
              {activeAction === "savings" && "Savings Options"}
              {activeAction === "topup" && "Mobile Top-up"}
            </DialogTitle>
            <DialogDescription>
              {actionSuccess 
                ? "Transaction completed successfully!" 
                : `Please enter the details for your ${activeAction}.`}
            </DialogDescription>
          </DialogHeader>

          {!actionSuccess ? (
            <form onSubmit={handleSubmit}>
              {(activeAction === "deposit" || activeAction === "withdraw" || activeAction === "transfer") && (
                <div className="grid gap-4 py-4">
                  {activeAction === "transfer" && (
                    <>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="from-account" className="text-right">
                          From
                        </Label>
                        <select 
                          id="from-account"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="checking">Checking (**** 1234)</option>
                          <option value="savings">Savings (**** 5678)</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="to-account" className="text-right">
                          To
                        </Label>
                        <select 
                          id="to-account"
                          className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="savings">Savings (**** 5678)</option>
                          <option value="checking">Checking (**** 1234)</option>
                          <option value="external">External Account</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {(activeAction === "deposit" || activeAction === "withdraw") && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="account" className="text-right">
                        Account
                      </Label>
                      <select 
                        id="account"
                        className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        <option value="checking">Checking (**** 1234)</option>
                        <option value="savings">Savings (**** 5678)</option>
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      type="text"
                      placeholder="$0.00"
                      className="col-span-3"
                      value={amount}
                      onChange={(e) => {
                        // Only allow numbers and decimals
                        const value = e.target.value;
                        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
                          setAmount(value);
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {activeAction === "billpay" && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="payee" className="text-right">
                      Payee
                    </Label>
                    <select 
                      id="payee"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="">Select a payee</option>
                      <option value="utility">City Utilities</option>
                      <option value="internet">Internet Service</option>
                      <option value="phone">Phone Company</option>
                      <option value="other">Add New Payee</option>
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
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
                          setAmount(value);
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {activeAction === "savings" && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="savings-action" className="text-right">
                      Action
                    </Label>
                    <select 
                      id="savings-action"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="">Select an option</option>
                      <option value="goal">Create Savings Goal</option>
                      <option value="auto">Setup Auto-Save</option>
                      <option value="interest">View Interest Rates</option>
                    </select>
                  </div>
                </div>
              )}

              {activeAction === "topup" && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone #
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="carrier" className="text-right">
                      Carrier
                    </Label>
                    <select 
                      id="carrier"
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="">Select carrier</option>
                      <option value="att">AT&T</option>
                      <option value="verizon">Verizon</option>
                      <option value="tmobile">T-Mobile</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="topup-amount" className="text-right">
                      Amount
                    </Label>
                    <Input
                      id="topup-amount"
                      type="text"
                      placeholder="$0.00"
                      className="col-span-3"
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
                          setAmount(value);
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveAction(null)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={processingAction || (!amount && activeAction !== "savings")}
                >
                  {processingAction ? "Processing..." : "Continue"}
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
    </>
  )
}

function ActionButton({ 
  icon, 
  label, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void 
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