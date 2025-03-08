import type React from "react"
import { Button } from "./ui/button"
import { ArrowUpRight, CreditCard, Download, PiggyBank, Smartphone, Upload } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <ActionButton icon={<Upload className="h-4 w-4" />} label="Deposit" />
      <ActionButton icon={<Download className="h-4 w-4" />} label="Withdraw" />
      <ActionButton icon={<ArrowUpRight className="h-4 w-4" />} label="Transfer" />
      <ActionButton icon={<CreditCard className="h-4 w-4" />} label="Pay Bills" />
      <ActionButton icon={<PiggyBank className="h-4 w-4" />} label="Savings" />
      <ActionButton icon={<Smartphone className="h-4 w-4" />} label="Mobile Top-up" />
    </div>
  )
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto flex-col py-4 gap-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
    >
      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">{icon}</div>
      <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
    </Button>
  )
}

