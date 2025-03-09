"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
// import { LineChart, BarChart, PieChart } from "@/components/charts"
import {
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Filter
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function InvestmentsPage() {
  const [activeTab, setActiveTab] = useState("portfolio")
  const [showBuyDialog, setShowBuyDialog] = useState(false)

  // Mock investment data
  const portfolioData = {
    totalValue: 32150.75,
    todayChange: -125.65,
    todayChangePercent: -0.39,
    holdings: [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        shares: 15,
        avgPrice: 150.25,
        currentPrice: 175.50,
        value: 2632.50,
        gain: 378.75,
        gainPercent: 16.8
      },
      {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        shares: 10,
        avgPrice: 285.75,
        currentPrice: 315.25,
        value: 3152.50,
        gain: 295.00,
        gainPercent: 10.3
      },
      // Add more holdings as needed
    ],
    watchlist: [
      {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 2850.25,
        change: 45.30,
        changePercent: 1.62
      },
      {
        symbol: "TSLA",
        name: "Tesla Inc.",
        price: 242.75,
        change: -3.25,
        changePercent: -1.32
      }
    ]
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Investments</h1>
          <p className="text-gray-500 mt-1">Manage your investment portfolio and track performance</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setShowBuyDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Buy / Sell
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Portfolio Value</p>
                <h3 className="text-2xl font-bold">${portfolioData.totalValue.toLocaleString()}</h3>
              </div>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Today's Change</p>
                <h3 className={`text-2xl font-bold ${portfolioData.todayChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {portfolioData.todayChange >= 0 ? '+' : ''}{portfolioData.todayChange.toLocaleString()}
                  <span className="text-sm ml-1">({portfolioData.todayChangePercent}%)</span>
                </h3>
              </div>
              {portfolioData.todayChange >= 0 ? 
                <ArrowUpRight className="h-5 w-5 text-green-500" /> :
                <ArrowDownRight className="h-5 w-5 text-red-500" />
              }
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Gain/Loss</p>
                <h3 className="text-2xl font-bold text-green-500">
                  +$4,325.50
                  <span className="text-sm ml-1">(15.5%)</span>
                </h3>
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-4">
          {/* Holdings Table */}
          <Card>
            <CardHeader>
              <CardTitle>Holdings</CardTitle>
              <CardDescription>Your current investment positions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-4">Symbol</th>
                      <th className="pb-4">Shares</th>
                      <th className="pb-4">Avg Price</th>
                      <th className="pb-4">Current Price</th>
                      <th className="pb-4">Value</th>
                      <th className="pb-4">Gain/Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioData.holdings.map((holding) => (
                      <tr key={holding.symbol} className="border-b">
                        <td className="py-4">
                          <div>
                            <div className="font-medium">{holding.symbol}</div>
                            <div className="text-sm text-gray-500">{holding.name}</div>
                          </div>
                        </td>
                        <td className="py-4">{holding.shares}</td>
                        <td className="py-4">${holding.avgPrice}</td>
                        <td className="py-4">${holding.currentPrice}</td>
                        <td className="py-4">${holding.value.toLocaleString()}</td>
                        <td className={`py-4 ${holding.gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {holding.gain >= 0 ? '+' : ''}{holding.gain.toLocaleString()} ({holding.gainPercent}%)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watchlist">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Watchlist</CardTitle>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search symbols..." 
                    className="w-[200px]"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.watchlist.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{stock.symbol}</div>
                      <div className="text-sm text-gray-500">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${stock.price}</div>
                      <div className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          {/* Add transaction history content */}
        </TabsContent>
      </Tabs>

      {/* Buy/Sell Dialog */}
      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy / Sell Stock</DialogTitle>
            <DialogDescription>
              Enter the details of your trade
            </DialogDescription>
          </DialogHeader>
          {/* Add trade form */}
        </DialogContent>
      </Dialog>
    </div>
  )
}