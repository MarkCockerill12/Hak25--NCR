"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Switch } from "./ui/switch"
import { format } from "date-fns"
import { CalendarIcon, Check } from "lucide-react"
import { cn } from "../lib/utils"

interface NewSavingsGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (goal: any) => void
}

export function NewSavingsGoalDialog({ open, onOpenChange, onSave }: NewSavingsGoalDialogProps) {
  const [name, setName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [targetDate, setTargetDate] = useState<Date | undefined>(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  )
  const [color, setColor] = useState("blue")
  const [enableAutoTransfer, setEnableAutoTransfer] = useState(false)
  const [autoTransferAmount, setAutoTransferAmount] = useState("")
  const [autoTransferFrequency, setAutoTransferFrequency] = useState("monthly")

  const handleSubmit = () => {
    if (!name || !targetAmount || !targetDate) return

    const newGoal = {
      name,
      targetAmount: Number.parseFloat(targetAmount),
      targetDate: targetDate.toISOString(),
      color,
      autoTransfer: enableAutoTransfer
        ? {
            enabled: true,
            amount: Number.parseFloat(autoTransferAmount),
            frequency: autoTransferFrequency,
            nextDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
          }
        : undefined,
    }

    onSave(newGoal)
    resetForm()
  }

  const resetForm = () => {
    setName("")
    setTargetAmount("")
    setTargetDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
    setColor("blue")
    setEnableAutoTransfer(false)
    setAutoTransferAmount("")
    setAutoTransferFrequency("monthly")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) resetForm()
        onOpenChange(newOpen)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Savings Goal</DialogTitle>
          <DialogDescription>Set up a new savings goal to help you save for something special.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="goalName">Goal Name</Label>
            <Input
              id="goalName"
              placeholder="e.g., Vacation Fund"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="targetAmount"
                type="number"
                placeholder="0.00"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="pl-7"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="targetDate"
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !targetDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {targetDate ? format(targetDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={targetDate}
                  onSelect={setTargetDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Goal Color</Label>
            <div className="flex gap-2">
              {["blue", "green", "purple", "amber", "red"].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    color === c ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600" : ""
                  }`}
                  style={{
                    backgroundColor: `var(--${c}-500)`,
                    color: "white",
                  }}
                  onClick={() => setColor(c)}
                >
                  {color === c && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="autoTransfer" className="cursor-pointer">
                <div>
                  <span>Enable Automatic Transfers</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Automatically transfer money to this goal</p>
                </div>
              </Label>
              <Switch id="autoTransfer" checked={enableAutoTransfer} onCheckedChange={setEnableAutoTransfer} />
            </div>

            {enableAutoTransfer && (
              <div className="space-y-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                <div className="space-y-2">
                  <Label htmlFor="autoAmount">Transfer Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="autoAmount"
                      type="number"
                      placeholder="0.00"
                      value={autoTransferAmount}
                      onChange={(e) => setAutoTransferAmount(e.target.value)}
                      className="pl-7"
                      min="0.01"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <select
                    id="frequency"
                    value={autoTransferFrequency}
                    onChange={(e) => setAutoTransferFrequency(e.target.value)}
                    className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name || !targetAmount || !targetDate || (enableAutoTransfer && !autoTransferAmount)}
          >
            Create Goal
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

