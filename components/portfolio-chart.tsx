"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "./ui/button"

// Mock data for the chart
const data = {
  "1m": [
    { date: "Mar 1", value: 125000 },
    { date: "Mar 5", value: 124200 },
    { date: "Mar 10", value: 126500 },
    { date: "Mar 15", value: 125800 },
    { date: "Mar 20", value: 127200 },
    { date: "Mar 25", value: 126900 },
    { date: "Mar 30", value: 127800 },
  ],
  "3m": [
    { date: "Jan 1", value: 120000 },
    { date: "Jan 15", value: 121500 },
    { date: "Feb 1", value: 122800 },
    { date: "Feb 15", value: 123200 },
    { date: "Mar 1", value: 125000 },
    { date: "Mar 15", value: 125800 },
    { date: "Mar 30", value: 127800 },
  ],
  "1y": [
    { date: "Apr 2024", value: 112000 },
    { date: "May 2024", value: 114500 },
    { date: "Jun 2024", value: 113800 },
    { date: "Jul 2024", value: 116200 },
    { date: "Aug 2024", value: 118500 },
    { date: "Sep 2024", value: 117900 },
    { date: "Oct 2024", value: 120500 },
    { date: "Nov 2024", value: 122000 },
    { date: "Dec 2024", value: 123500 },
    { date: "Jan 2025", value: 122800 },
    { date: "Feb 2025", value: 125000 },
    { date: "Mar 2025", value: 127800 },
  ],
  "all": [
    { date: "2022", value: 100000 },
    { date: "2023", value: 110000 },
    { date: "2024", value: 120000 },
    { date: "2025", value: 127800 },
  ]
}

interface PortfolioChartProps {
  showBalances: boolean
}

export function PortfolioChart({ showBalances }: PortfolioChartProps) {
  const [timeRange, setTimeRange] = useState("1y")
  
  const chartData = data[timeRange]
  
  const formatYAxis = (value) => {
    if (!showBalances) return "••••••"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value)
  }
  
  const formatTooltip = (value) => {
    if (!showBalances) return "••••••"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button 
          variant={timeRange === "1m" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeRange("1m")}
        >
          1M
        </Button>
        <Button 
          variant={timeRange === "3m" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeRange("3m")}
        >
          3M
        </Button>
        <Button 
          variant={timeRange === "1y" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeRange("1y")}
        >
          1Y
        </Button>
        <Button 
          variant={timeRange === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTimeRange("all")}
        >
          All
        </Button>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip 
            formatter={(value) => [formatTooltip(value), "Value"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
