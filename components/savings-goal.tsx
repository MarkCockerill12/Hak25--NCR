"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Progress } from "./ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ArrowUpRight, Calendar, Check, Clock, Coins, Edit, PiggyBank, Target } from 'lucide-react'

interface SavingsGoalProps {
  goal: {
    id: string
    name: string
    targetAmount: number
    currentAmount: number
    targetDate: string
    accountId: string
    color: string
    autoTransfer?: {
      enabled: boolean
      amount: number
      frequency: string
      nextDate: string
    }
  }
  showBalances: boolean
  currency: string
  onUpdate: (updates: Partial<SavingsGoalProps['goal']>) => void
  onAddTransaction: (transaction: any) => void
}

export function SavingsGoal({ goal, showBalances, currency, onUpdate, onAddTransaction }: SavingsGoalProps) {
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [depositAmount, setDepositAmount] = useState("")
  const [editName, setEditName] = useState(goal.name)
  const [editTargetAmount, setEditTargetAmount] = useState(goal.targetAmount.toString())
  const [editTargetDate, setEditTargetDate] = useState(goal.targetDate.split('T')[0])
  const [editColor, setEditColor] = useState(goal.color)
  
  // Calculate progress percentage
  const progress = (goal.currentAmount / goal.targetAmount) * 100
  
  // Calculate days remaining
  const daysRemaining = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  
  // Get color class based on goal color
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
      amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    }
    return colorMap[color] || colorMap.blue
  }
  
  // Get progress color class based on percentage
  const getProgressColorClass = (percent: number) => {
    if (percent >= 100) return "bg-green-500"
    if (percent >= 75) return "bg-blue-500"
    if (percent >= 50) return "bg-amber-500"
    if (percent >= 25) return "bg-orange-500"
    return "bg-red-500"
  }

  // Handle deposit submission
  const handleDeposit = () => {
    const amount = parseFloat(depositAmount)
    if (isNaN(amount) || amount <= 0) return
    
    // Add transaction
    onAddTransaction({
      type: "deposit",
      amount,
      description: `Deposit to ${goal.name}`,
      category: "Goal Contribution",
      goalId: goal.id
    })
    
    // Close dialog and reset form
    setIsDepositDialogOpen(false)
    setDepositAmount("")
  }

  // Handle edit submission
  const handleEdit = () => {
    const targetAmount = parseFloat(editTargetAmount)
    if (isNaN(targetAmount) || targetAmount <= 0) return
    
    // Update goal
    onUpdate({
      name: editName,
      targetAmount,
      targetDate: new Date(editTargetDate).toISOString(),
      color: editColor
    })
    
    // Close dialog
    setIsEditDialogOpen(false)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{goal.name}</CardTitle>
          <div className={`px-2 py-1 text-xs rounded-full ${getColorClass(goal.color)}`}>
            {progress >= 100 ? "Completed" : `${Math.round(progress)}%`}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <Progress 
            value={progress > 100 ? 100 : progress} 
            className={`h-2 ${getProgressColorClass(progress)}`} 
          />
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              {showBalances 
                ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(goal.currentAmount)
                : "••••••"
              }
            </span>
            <span>
              {showBalances 
                ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(goal.targetAmount)
                : "••••••"
              }
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
            <span className="mx-1">•</span>
            <Clock className="h-3 w-3" />
            <span>{daysRemaining} days left</span>
          </div>
          
          {goal.autoTransfer?.enabled && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <ArrowUpRight className="h-3 w-3" />
              <span>Auto: {new Intl.NumberFormat("en-US", { style: "currency", currency }).format(goal.autoTransfer.amount)} {goal.autoTransfer.frequency}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => setIsDepositDialogOpen(true)}
        >
          <PiggyBank className="mr-1 h-3 w-3" />
          Add Funds
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Edit className="mr-1 h-3 w-3" />
          Edit
        </Button>
      </CardFooter>

      {/* Deposit Dialog */}
      <Dialog open={isDepositDialogOpen} onOpenChange={setIsDepositDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to {goal.name}</DialogTitle>
            <DialogDescription>
              Enter the amount you want to deposit toward this savings goal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="depositAmount">Deposit Amount</Label>
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
              <p className="text-xs text-gray-500">
                Current balance: {showBalances 
                  ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(goal.currentAmount)
                  : "••••••"
                }
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Goal Progress After Deposit</Label>
              <div className="space-y-2">
                <Progress 
                  value={Math.min(((goal.currentAmount + (parseFloat(depositAmount) || 0)) / goal.targetAmount) * 100, 100)} 
                  className={`h-2 ${getProgressColorClass((goal.currentAmount + (parseFloat(depositAmount) || 0)) / goal.targetAmount * 100)}`} 
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {showBalances 
                      ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(goal.currentAmount + (parseFloat(depositAmount) || 0))
                      : "••••••"
                    }
                  </span>
                  <span>
                    {showBalances 
                      ? new Intl.NumberFormat("en-US", { style: "currency", currency }).format(goal.targetAmount)
                      : "••••••"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDepositDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeposit} disabled={!depositAmount || parseFloat(depositAmount) <= 0}>
              <Check className="mr-2 h-4 w-4" />
              Confirm Deposit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Savings Goal</DialogTitle>
            <DialogDescription>
              Update the details of your savings goal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name</Label>
              <Input
                id="goalName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="targetAmount"
                  type="number"
                  value={editTargetAmount}
                  onChange={(e) => setEditTargetAmount(e.target.value)}
                  className="pl-7"
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input
                id="targetDate"
                type="date"
                value={editTargetDate}
                onChange={(e) => setEditTargetDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Goal Color</Label>
              <div className="flex gap-2">
                {["blue", "green", "purple", "amber", "red"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      editColor === c ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600" : ""
                    }`}
                    style={{ 
                      backgroundColor: `var(--${c}-500)`,
                      color: "white"
                    }}
                    onClick={() => setEditColor(c)}
                  >
                    {editColor === c && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleEdit} 
              disabled={!editName || !editTargetAmount || parseFloat(editTargetAmount) <= 0 || !editTargetDate}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
