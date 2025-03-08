"use client"

import { useState } from "react"
import { ArrowDownLeft, Coffee, CreditCard, Home, ShoppingCart, Smartphone, Utensils } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

// Mock transaction data
const transactions = [
  {
    id: "t1",
    type: "debit",
    description: "Grocery Store",
    category: "Shopping",
    amount: 78.45,
    date: "2025-03-07T14:30:00",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    id: "t2",
    type: "credit",
    description: "Salary Deposit",
    category: "Income",
    amount: 2500.0,
    date: "2025-03-05T09:15:00",
    icon: <ArrowDownLeft className="h-4 w-4" />,
  },
  {
    id: "t3",
    type: "debit",
    description: "Coffee Shop",
    category: "Food & Drink",
    amount: 4.5,
    date: "2025-03-04T08:20:00",
    icon: <Coffee className="h-4 w-4" />,
  },
  {
    id: "t4",
    type: "debit",
    description: "Monthly Rent",
    category: "Housing",
    amount: 1200.0,
    date: "2025-03-03T00:00:00",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: "t5",
    type: "debit",
    description: "Phone Bill",
    category: "Utilities",
    amount: 65.99,
    date: "2025-03-02T12:45:00",
    icon: <Smartphone className="h-4 w-4" />,
  },
  {
    id: "t6",
    type: "debit",
    description: "Restaurant Dinner",
    category: "Food & Drink",
    amount: 42.75,
    date: "2025-03-01T19:30:00",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    id: "t7",
    type: "debit",
    description: "Online Purchase",
    category: "Shopping",
    amount: 29.99,
    date: "2025-02-28T15:20:00",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: "t8",
    type: "credit",
    description: "Refund",
    category: "Income",
    amount: 19.99,
    date: "2025-02-27T10:15:00",
    icon: <ArrowDownLeft className="h-4 w-4" />,
  },
]

interface TransactionHistoryProps {
  limit?: number
}

export function TransactionHistory({ limit }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filter === "income" && transaction.type !== "credit") return false
      if (filter === "expenses" && transaction.type !== "debit") return false
      return transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .slice(0, limit || transactions.length)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="income">Income Only</SelectItem>
            <SelectItem value="expenses">Expenses Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "credit"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {transaction.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{transaction.description}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                  </div>
                </div>
              </div>
              <div
                className={`font-medium ${transaction.type === "credit" ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}
              >
                {transaction.type === "credit" ? "+" : "-"}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(transaction.amount)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">No transactions found</div>
        )}
      </div>

      {limit && transactions.length > limit && (
        <div className="text-center">
          <Button variant="outline">View All Transactions</Button>
        </div>
      )}
    </div>
  )
}

