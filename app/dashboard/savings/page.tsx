"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { ArrowUp, Plus, Target, Wallet, PiggyBank, TrendingUp } from "lucide-react"

export default function SavingsPage() {
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false)
  const [newGoalAmount, setNewGoalAmount] = useState("")
  const [newGoalName, setNewGoalName] = useState("")

  // Mock data for savings goals
  const savingsGoals = [
    {
      name: "Emergency Fund",
      targetAmount: 10000,
      currentAmount: 6500,
      progress: 65,
      monthlyContribution: 500
    },
    {
      name: "Vacation",
      targetAmount: 5000,
      currentAmount: 2000,
      progress: 40,
      monthlyContribution: 300
    },
    {
      name: "Down Payment",
      targetAmount: 50000,
      currentAmount: 15000,
      progress: 30,
      monthlyContribution: 1000
    }
  ]

  // Mock data for automatic savings rules
  const autoSavingsRules = [
    {
      name: "Payday Saving",
      amount: 500,
      frequency: "Monthly",
      nextDate: "2024-03-15"
    },
    {
      name: "Round-Up Savings",
      description: "Round up transactions to nearest dollar",
      enabled: true
    },
    {
      name: "Bonus Allocation",
      amount: "50%",
      description: "Save 50% of any bonus automatically"
    }
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Savings & Goals</h1>
          <p className="text-gray-500">Track and manage your savings goals</p>
        </div>
        <Button onClick={() => setShowNewGoalDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Savings</p>
                <h3 className="text-2xl font-bold">$23,500</h3>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +$2,150 this month
                </p>
              </div>
              <Wallet className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Monthly Auto-Save</p>
                <h3 className="text-2xl font-bold">$1,800</h3>
                <p className="text-xs text-gray-500 mt-1">Across all goals</p>
              </div>
              <PiggyBank className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Interest Earned</p>
                <h3 className="text-2xl font-bold">$125.50</h3>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Goals */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Active Goals</h2>
        <div className="grid gap-4">
          {savingsGoals.map((goal, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{goal.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Funds
                  </Button>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="mt-4 text-sm text-gray-500">
                  <p>Monthly contribution: ${goal.monthlyContribution}</p>
                  <p>Progress: {goal.progress}%</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Automatic Savings Rules */}
      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-semibold">Automatic Savings</h2>
        <div className="grid gap-4">
          {autoSavingsRules.map((rule, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{rule.name}</h3>
                    <p className="text-sm text-gray-500">
                      {rule.amount ? `Amount: ${rule.amount}` : rule.description}
                    </p>
                    {rule.frequency && (
                      <p className="text-sm text-gray-500">
                        {rule.frequency} - Next: {rule.nextDate}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* New Goal Dialog */}
      <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Savings Goal</DialogTitle>
            <DialogDescription>
              Set up a new savings goal and track your progress
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="goalName">Goal Name</label>
              <Input
                id="goalName"
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder="e.g., Vacation Fund"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="goalAmount">Target Amount</label>
              <Input
                id="goalAmount"
                value={newGoalAmount}
                onChange={(e) => setNewGoalAmount(e.target.value)}
                placeholder="$0.00"
                type="number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewGoalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle saving new goal
              setShowNewGoalDialog(false)
            }}>
              Create Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}