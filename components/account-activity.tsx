"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ArrowDownLeft, ArrowUpRight, Coffee, CreditCard, Home, ShoppingCart, Smartphone } from "lucide-react"
import { DateRangePicker } from "./date-range-picker"

interface AccountActivityProps {
  accountId: string
  transactions: Array<{
    id: string
    accountId: string
    type: string
    description: string
    category: string
    amount: number
    date: string
  }>
  showBalances: boolean
}

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

export function AccountActivity({ accountId, transactions, showBalances }: AccountActivityProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  })

  // Rest of your filtering logic needs to be updated to handle null values
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by type
    if (filter === "income" && transaction.type !== "credit") return false
    if (filter === "expenses" && transaction.type !== "debit") return false

    // Filter by search term
    if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase())) return false

    // Filter by date range
    if (dateRange.from) {
      const transactionDate = new Date(transaction.date)
      if (transactionDate < dateRange.from) return false
    }

    if (dateRange.to) {
      const transactionDate = new Date(transaction.date)
      const endOfDay = new Date(dateRange.to)
      endOfDay.setHours(23, 59, 59, 999)
      if (transactionDate > endOfDay) return false
    }

    return true
  })

  // Group transactions by date
  const groupedTransactions: Record<string, typeof filteredTransactions> = {}

  filteredTransactions.forEach((transaction) => {
    const date = new Date(transaction.date).toLocaleDateString()
    if (!groupedTransactions[date]) {
      groupedTransactions[date] = []
    }
    groupedTransactions[date].push(transaction)
  })

  // Get transaction icon based on category
  const getTransactionIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "shopping":
        return <ShoppingCart className="h-4 w-4" />
      case "food & drink":
        return <Coffee className="h-4 w-4" />
      case "housing":
        return <Home className="h-4 w-4" />
      case "utilities":
        return <Smartphone className="h-4 w-4" />
      case "income":
        return <ArrowDownLeft className="h-4 w-4" />
      case "transfer":
        return <ArrowUpRight className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

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
        <DateRangePicker 
          date={dateRange} 
          onDateChange={(date) => setDateRange({
            from: date.from || undefined,
            to: date.to || undefined
          })} 
        />
      </div>

      <div className="space-y-6">
        {Object.keys(groupedTransactions).length > 0 ? (
          Object.entries(groupedTransactions)
            .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
            .map(([date, transactions]) => (
              <div key={date} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <div className="space-y-2">
                  {transactions.map((transaction) => (
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
                          {getTransactionIcon(transaction.category)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{transaction.description}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(transaction.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
                            • {transaction.category}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`font-medium ${transaction.type === "credit" ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {showBalances
                          ? new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(transaction.amount)
                          : "••••••"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="mb-2">No transactions found</p>
            <p className="text-sm">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>

      {filteredTransactions.length > 10 && (
        <div className="text-center pt-4">
          <Button variant="outline">Load More Transactions</Button>
        </div>
      )}
    </div>
  )
}

