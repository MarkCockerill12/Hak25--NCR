"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Progress } from "./ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { 
  Area, 
  AreaChart, 
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
  YAxis 
} from "recharts"
import { ArrowDown, ArrowUp, TrendingUp } from 'lucide-react'

interface InvestmentPortfolioProps {
  account: {
    id: string
    name: string
    balance: number
    initialInvestment: number
    currency: string
    riskProfile: string
  }
  holdings: Array<{
    id: string
    accountId: string
    name: string
    ticker: string
    shares: number
    purchasePrice: number
    currentPrice: number
    allocation: number
    category: string
    sector: string
  }>
  performance: Array<{
    date: string
    value: number
  }>
  showBalances: boolean
}

export function InvestmentPortfolio({ account, holdings, performance, showBalances }: InvestmentPortfolioProps) {
  const [timeframe, setTimeframe] = useState("1M")
  const [allocationView, setAllocationView] = useState("category")
  
  // Calculate total value of holdings
  const totalHoldingsValue = holdings.reduce((sum, holding) => {
    return sum + (holding.shares * holding.currentPrice)
  }, 0)
  
  // Calculate cash position
  const cashPosition = account.balance
  const totalPortfolioValue = totalHoldingsValue + cashPosition
  
  // Calculate cash allocation percentage
  const cashAllocation = totalPortfolioValue > 0 ? (cashPosition / totalPortfolioValue) * 100 : 0
  
  // Prepare data for allocation pie chart
  const prepareAllocationData = () => {
    if (allocationView === "category") {
      // Group by category
      const categories = {}
      holdings.forEach(holding => {
        const value = holding.shares * holding.currentPrice
        if (categories[holding.category]) {
          categories[holding.category] += value
        } else {
          categories[holding.category] = value
        }
      })
      
      // Add cash as a category
      categories["Cash"] = cashPosition
      
      // Convert to array format for pie chart
      return Object.entries(categories).map(([name, value]) => ({
        name,
        value: value as number,
        percentage: totalPortfolioValue > 0 ? ((value as number) / totalPortfolioValue) * 100 : 0
      }))
    } else {
      // Group by sector
      const sectors = {}
      holdings.forEach(holding => {
        const value = holding.shares * holding.currentPrice
        if (sectors[holding.sector]) {
          sectors[holding.sector] += value
        } else {
          sectors[holding.sector] = value
        }
      })
      
      // Add cash as a sector
      sectors["Cash"] = cashPosition
      
      // Convert to array format for pie chart
      return Object.entries(sectors).map(([name, value]) => ({
        name,
        value: value as number,
        percentage: totalPortfolioValue > 0 ? ((value as number) / totalPortfolioValue) * 100 : 0
      }))
    }
  }
  
  const allocationData = prepareAllocationData()
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1']
  
  // Format performance data for chart
  const performanceData = performance.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: item.value
  }))
  
  // Calculate performance metrics
  const calculatePerformance = () => {
    if (performance.length < 2) return { change: 0, percentage: 0 }
    
    const latestValue = performance[performance.length - 1].value
    const initialValue = performance[0].value
    const change = latestValue - initialValue
    const percentage = (change / initialValue) * 100
    
    return { change, percentage }
  }
  
  const performanceMetrics = calculatePerformance()

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {showBalances 
                  ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(totalPortfolioValue)
                  : "••••••"
                }
              </p>
              <div className="flex items-center text-xs">
                <span className={performanceMetrics.change >= 0 ? "text-green-500" : "text-red-500"}>
                  {performanceMetrics.change >= 0 ? <ArrowUp className="inline h-3 w-3 mr-1" /> : <ArrowDown className="inline h-3 w-3 mr-1" />}
                  {showBalances 
                    ? `${performanceMetrics.change >= 0 ? "+" : ""}${new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(performanceMetrics.change)} (${performanceMetrics.percentage.toFixed(2)}%)`
                    : "••••••"
                  }
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Invested</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {showBalances 
                  ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(totalHoldingsValue)
                  : "••••••"
                }
              </p>
              <div className="flex items-center text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  {holdings.length} securities
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Cash</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {showBalances 
                  ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(cashPosition)
                  : "••••••"
                }
              </p>
              <div className="flex items-center text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  {cashAllocation.toFixed(1)}% of portfolio
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Risk Profile</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {account.riskProfile}
              </p>
              <div className="flex items-center text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  {account.riskProfile === "Conservative" ? "Lower risk, lower return" : 
                   account.riskProfile === "Moderate" ? "Balanced risk and return" : 
                   "Higher risk, higher return"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Chart */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Performance</CardTitle>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1W">1 Week</SelectItem>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
                <SelectItem value="ALL">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis 
                  tickFormatter={(value) => 
                    showBalances 
                      ? new Intl.NumberFormat("en-US", { 
                          style: "currency", 
                          currency: account.currency,
                          notation: "compact",
                          maximumFractionDigits: 1
                        }).format(value)
                      : "•••"
                  } 
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip 
                  formatter={(value) => 
                    showBalances 
                      ? [new Intl.NumberFormat("en-US", { 
                          style: "currency", 
                          currency: account.currency 
                        }).format(value as number), "Value"]
                      : ["•••••", "Value"]
                  } 
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0088FE" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Holdings and Allocation */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
            <CardDescription>Your investment securities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holdings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                        <th className="pb-2">Security</th>
                        <th className="pb-2 text-right">Shares</th>
                        <th className="pb-2 text-right">Price</th>
                        <th className="pb-2 text-right">Value</th>
                        <th className="pb-2 text-right">Return</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {holdings.map((holding) => {
                        const currentValue = holding.shares * holding.currentPrice
                        const costBasis = holding.shares * holding.purchasePrice
                        const returnValue = currentValue - costBasis
                        const returnPercentage = (returnValue / costBasis) * 100
                        
                        return (
                          <tr key={holding.id} className="text-sm">
                            <td className="py-3">
                              <div className="font-medium">{holding.ticker}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{holding.name}</div>
                            </td>
                            <td className="py-3 text-right">{holding.shares}</td>
                            <td className="py-3 text-right">
                              {showBalances 
                                ? new Intl.NumberFormat("en-US", { 
                                    style: "currency", 
                                    currency: account.currency 
                                  }).format(holding.currentPrice)
                                : "••••••"
                              }
                            </td>
                            <td className="py-3 text-right">
                              {showBalances 
                                ? new Intl.NumberFormat("en-US", { 
                                    style: "currency", 
                                    currency: account.currency 
                                  }).format(currentValue)
                                : "••••••"
                              }
                            </td>
                            <td className="py-3 text-right">
                              <div className={returnValue >= 0 ? "text-green-500" : "text-red-500"}>
                                {showBalances 
                                  ? `${returnValue >= 0 ? "+" : ""}${returnPercentage.toFixed(2)}%`
                                  : "••••••"
                                }
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {showBalances 
                                  ? `${returnValue >= 0 ? "+" : ""}${new Intl.NumberFormat("en-US", { 
                                      style: "currency", 
                                      currency: account.currency 
                                    }).format(returnValue)}`
                                  : "••••••"
                                }
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                      {/* Cash row */}
                      <tr className="text-sm">
                        <td className="py-3">
                          <div className="font-medium">Cash</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">USD</div>
                        </td>
                        <td className="py-3 text-right">-</td>
                        <td className="py-3 text-right">-</td>
                        <td className="py-3 text-right">
                          {showBalances 
                            ? new Intl.NumberFormat("en-US", { 
                                style: "currency", 
                                currency: account.currency 
                              }).format(cashPosition)
                            : "••••••"
                          }
                        </td>
                        <td className="py-3 text-right">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-semibold">No holdings yet</h3>
                  <p className="mt-1 text-sm">Start investing by making your first trade.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Allocation Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Allocation</CardTitle>
              <Tabs value={allocationView} onValueChange={setAllocationView} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="category">Category</TabsTrigger>
                  <TabsTrigger value="sector">Sector</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {allocationData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percentage }) => `${name} ${percentage.toFixed(1)}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => 
                        showBalances 
                          ? [new Intl.NumberFormat("en-US", { 
                              style: "currency", 
                              currency: account.currency 
                            }).format(value as number), "Value"]
                          : ["•••••", "Value"]
                      } 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No allocation data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
