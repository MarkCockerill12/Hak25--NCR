"use client"

import { useState } from "react"
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

// Mock spending data
const spendingByCategory = [
  { name: "Housing", value: 1200, color: "#8884d8" },
  { name: "Food", value: 450, color: "#82ca9d" },
  { name: "Transportation", value: 300, color: "#ffc658" },
  { name: "Entertainment", value: 150, color: "#ff8042" },
  { name: "Utilities", value: 200, color: "#0088fe" },
  { name: "Shopping", value: 350, color: "#00C49F" },
  { name: "Healthcare", value: 100, color: "#FFBB28" },
  { name: "Other", value: 180, color: "#FF8042" },
]

const monthlySpending = [
  { name: "Jan", amount: 2800 },
  { name: "Feb", amount: 2950 },
  { name: "Mar", amount: 2700 },
  { name: "Apr", amount: 3100 },
  { name: "May", amount: 2850 },
  { name: "Jun", amount: 2600 },
  { name: "Jul", amount: 2750 },
  { name: "Aug", amount: 2900 },
  { name: "Sep", amount: 3200 },
  { name: "Oct", amount: 3050 },
  { name: "Nov", amount: 2800 },
  { name: "Dec", amount: 3300 },
]

export function FinancialInsights() {
  const [timeframe, setTimeframe] = useState("year")

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
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
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
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">$2,930</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total Monthly Spending</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">$450</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Highest Category: Food</div>
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
                    <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
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

