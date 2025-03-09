"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ArrowUpRight, Coins, PiggyBank, Percent } from "lucide-react"
import { DateRangePicker } from "./date-range-picker"

interface DateRange {
  from: Date | undefined
  to?: Date | undefined
}

interface SavingsHistoryProps {
  accountId: string
  transactions: Array<{
    id: string
    accountId: string
    type: string
    amount: number
    date: string
    description: string
    category: string
  }>
  showBalances: boolean
  currency: string
}

export function SavingsHistory({ accountId, transactions, showBalances, currency }: SavingsHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange>({ from: new Date(), to: undefined })

  // Filter transactions by account ID
  const accountTransactions = transactions.filter((transaction) => transaction.accountId === accountId)

  // Apply additional filters
  const filteredTransactions = accountTransactions.filter((transaction) => {
    // Filter by type
    if (filter === "deposits" && transaction.type !== "deposit") return false
    if (filter === "withdrawals" && transaction.type !== "withdrawal") return false
    if (filter === "interest" && transaction.type !== "interest") return false

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

  // Get transaction icon based on type
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <PiggyBank className="h-4 w-4" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4" />
      case "interest":
        return <Percent className="h-4 w-4" />
      default:
        return <Coins className="h-4 w-4" />
    }
  }

  // Get transaction color based on type
  const getTransactionColor = (type: string) => {
    switch (type) {
      case "deposit":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
      case "withdrawal":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
      case "interest":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
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
            <SelectItem value="deposits">Deposits Only</SelectItem>
            <SelectItem value="withdrawals">Withdrawals Only</SelectItem>
            <SelectItem value="interest">Interest Only</SelectItem>
          </SelectContent>
        </Select>
        <DateRangePicker date={dateRange} onDateChange={(date) => setDateRange(date)} />
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
                        <div className={`p-2 rounded-full ${getTransactionColor(transaction.type)}`}>
                          {getTransactionIcon(transaction.type)}
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
                        className={`font-medium ${
                          transaction.type === "withdrawal"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        {transaction.type === "withdrawal" ? "-" : "+"}
                        {showBalances
                          ? new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency,
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

