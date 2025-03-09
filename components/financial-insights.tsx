"use client"

import { useState, useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { transactions as mockTransactions } from "./transaction-history"
import { useLocalStorage } from "@/app/hooks/use-local-storage"

interface FinancialInsightsProps {
  transactions?: Array<{
    id: string
    accountId: string
    type: string
    description: string
    category: string
    amount: number
    date: string
  }>
}

export function FinancialInsights({ transactions = [] }: FinancialInsightsProps) {
  const [timeframe, setTimeframe] = useState("year")
  const [savedTransactions] = useLocalStorage("nextgen-atm-transactions", [])

  // Combine real and mock transactions
  const allTransactions = [...(transactions || []), ...mockTransactions, ...savedTransactions]

  // Calculate spending by category from transactions
  const spendingByCategory = useMemo(() => {
    const categories: { [key: string]: { name: string; value: number; color: string } } = {}
    const colors: { [key: string]: string } = {
      Shopping: "#8884d8",
      "Food & Drink": "#82ca9d",
      Housing: "#ffc658",
      Entertainment: "#ff8042",
      Utilities: "#0088fe",
      Transportation: "#00C49F",
      Healthcare: "#FFBB28",
      Transfer: "#FF8042",
      Other: "#FF8042",
    }

    // Filter transactions by timeframe and type (debit only)
    const filteredTransactions = allTransactions.filter((transaction) => {
      if (transaction.type !== "debit") return false

      const transactionDate = new Date(transaction.date)
      const now = new Date()

      if (timeframe === "month") {
        return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear()
      } else if (timeframe === "quarter") {
        const quarterStart = new Date(now)
        quarterStart.setMonth(Math.floor(now.getMonth() / 3) * 3)
        quarterStart.setDate(1)
        return transactionDate >= quarterStart
      } else {
        // year
        return transactionDate.getFullYear() === now.getFullYear()
      }
    })

    // Group by category
    filteredTransactions.forEach((transaction) => {
      const category = transaction.category || "Other"
      if (!categories[category]) {
        categories[category] = {
          name: category,
          value: 0,
          color: colors[category] || "#FF8042",
        }
      }
      categories[category].value += transaction.amount
    })

    return Object.values(categories)
  }, [allTransactions, timeframe])

  // Calculate monthly spending
  const monthlySpending = useMemo(() => {
    const months: { [key: string]: { name: string; amount: number } } = {}
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Initialize all months with zero
    monthNames.forEach((month) => {
      months[month] = { name: month, amount: 0 }
    })

    // Filter transactions by type (debit only) and within the current year
    const filteredTransactions = allTransactions.filter((transaction) => {
      if (transaction.type !== "debit") return false

      const transactionDate = new Date(transaction.date)
      const now = new Date()

      return transactionDate.getFullYear() === now.getFullYear()
    })

    // Group by month
    filteredTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date)
      const month = monthNames[transactionDate.getMonth()]
      months[month].amount += transaction.amount
    })

    return Object.values(months)
  }, [allTransactions])

  // Calculate total monthly spending
  const totalMonthlySpending = useMemo(() => {
    return spendingByCategory.reduce((sum, category) => sum + category.value, 0)
  }, [spendingByCategory])

  // Find highest spending category
  const highestCategory = useMemo(() => {
    if (spendingByCategory.length === 0) return { name: "None", value: 0 }
    return spendingByCategory.reduce((max, category) => (category.value > max.value ? category : max), {
      name: "None",
      value: 0,
    })
  }, [spendingByCategory])

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="spending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="spending">Spending by Category</TabsTrigger>
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {spendingByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${(value as number).toFixed(2)}`, "Amount"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${totalMonthlySpending.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total {timeframe === "month" ? "Monthly" : timeframe === "quarter" ? "Quarterly" : "Yearly"}{" "}
                    Spending
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${highestCategory.value.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Highest Category: {highestCategory.name}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => [`$${(value as number).toFixed(2)}`, "Amount"]} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}