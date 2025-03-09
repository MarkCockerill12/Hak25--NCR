"use client"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { DashboardShell } from "../../../components/dashboard-shell"
import { InvestmentPortfolio } from "../../../components/investment-portfolio"
import { InvestmentActivity } from "../../../components/investment-activity"
import { InvestmentDetails } from "../../../components/investment-details"
import { useLocalStorage } from "../../hooks/use-local-storage"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Eye, EyeOff, LineChart, Plus, TrendingUp } from 'lucide-react'

// Define TypeScript interfaces for our data
interface PerformanceData {
  date: string;
  value: number;
}

interface InvestmentsData {
  accounts: Array<{
    id: string;
    name: string;
    number: string;
    balance: number;
    initialInvestment: number;
    currency: string;
    status: string;
    openDate: string;
    accountType: string;
    riskProfile: string;
    feeStructure: string;
    lastRebalanced: string;
  }>;
  holdings: Array<{
    id: string;
    accountId: string;
    name: string;
    ticker: string;
    shares: number;
    purchasePrice: number;
    currentPrice: number;
    allocation: number;
    category: string;
    sector: string;
  }>;
  transactions: Array<{
    id: string;
    accountId: string;
    type: string;
    ticker: string;
    shares: number;
    price: number;
    amount: number;
    date: string;
    status: string;
    fee: number;
  }>;
  performance: {
    [accountId: string]: PerformanceData[];
  };
}

// Initial investments data if none exists in localStorage
const initialInvestmentsData: InvestmentsData = {
  accounts: [
    {
      id: "inv1",
      name: "Retirement Portfolio",
      number: "**** 4321",
      balance: 125750.42,
      initialInvestment: 100000,
      currency: "USD",
      status: "active",
      openDate: "2020-05-15",
      accountType: "IRA",
      riskProfile: "Moderate",
      feeStructure: "0.25% annual",
      lastRebalanced: "2025-01-15",
    },
    {
      id: "inv2",
      name: "Growth Portfolio",
      number: "**** 8765",
      balance: 45250.18,
      initialInvestment: 30000,
      currency: "USD",
      status: "active",
      openDate: "2022-03-10",
      accountType: "Brokerage",
      riskProfile: "Aggressive",
      feeStructure: "0.30% annual",
      lastRebalanced: "2025-02-01",
    },
    {
      id: "inv3",
      name: "Conservative Fund",
      number: "**** 9876",
      balance: 75325.65,
      initialInvestment: 70000,
      currency: "USD",
      status: "active",
      openDate: "2019-11-22",
      accountType: "401(k)",
      riskProfile: "Conservative",
      feeStructure: "0.20% annual",
      lastRebalanced: "2025-01-30",
    }
  ],
  holdings: [
    // Retirement Portfolio
    {
      id: "h1",
      accountId: "inv1",
      name: "S&P 500 Index Fund",
      ticker: "SPY",
      shares: 120,
      purchasePrice: 380.25,
      currentPrice: 452.18,
      allocation: 40,
      category: "Equity",
      sector: "Broad Market",
    },
    {
      id: "h2",
      accountId: "inv1",
      name: "Total Bond Market ETF",
      ticker: "BND",
      shares: 250,
      purchasePrice: 82.45,
      currentPrice: 85.32,
      allocation: 30,
      category: "Fixed Income",
      sector: "Bonds",
    },
    {
      id: "h3",
      accountId: "inv1",
      name: "International Equity Fund",
      ticker: "VXUS",
      shares: 180,
      purchasePrice: 55.75,
      currentPrice: 62.19,
      allocation: 20,
      category: "Equity",
      sector: "International",
    },
    {
      id: "h4",
      accountId: "inv1",
      name: "Real Estate ETF",
      ticker: "VNQ",
      shares: 60,
      purchasePrice: 92.30,
      currentPrice: 98.45,
      allocation: 10,
      category: "Alternative",
      sector: "Real Estate",
    },
    
    // Growth Portfolio
    {
      id: "h5",
      accountId: "inv2",
      name: "Technology Sector ETF",
      ticker: "XLK",
      shares: 85,
      purchasePrice: 145.20,
      currentPrice: 178.65,
      allocation: 35,
      category: "Equity",
      sector: "Technology",
    },
    {
      id: "h6",
      accountId: "inv2",
      name: "Small Cap Growth ETF",
      ticker: "VBK",
      shares: 70,
      purchasePrice: 220.15,
      currentPrice: 245.30,
      allocation: 25,
      category: "Equity",
      sector: "Small Cap",
    },
    {
      id: "h7",
      accountId: "inv2",
      name: "Emerging Markets ETF",
      ticker: "VWO",
      shares: 150,
      purchasePrice: 42.35,
      currentPrice: 48.75,
      allocation: 20,
      category: "Equity",
      sector: "Emerging Markets",
    },
    {
      id: "h8",
      accountId: "inv2",
      name: "Cryptocurrency ETF",
      ticker: "BITO",
      shares: 100,
      purchasePrice: 25.45,
      currentPrice: 32.80,
      allocation: 20,
      category: "Alternative",
      sector: "Cryptocurrency",
    },
    
    // Conservative Fund
    {
      id: "h9",
      accountId: "inv3",
      name: "Treasury Bond ETF",
      ticker: "TLT",
      shares: 200,
      purchasePrice: 135.75,
      currentPrice: 142.20,
      allocation: 40,
      category: "Fixed Income",
      sector: "Government Bonds",
    },
    {
      id: "h10",
      accountId: "inv3",
      name: "Dividend Appreciation ETF",
      ticker: "VIG",
      shares: 120,
      purchasePrice: 155.30,
      currentPrice: 172.45,
      allocation: 30,
      category: "Equity",
      sector: "Dividend",
    },
    {
      id: "h11",
      accountId: "inv3",
      name: "Corporate Bond ETF",
      ticker: "LQD",
      shares: 150,
      purchasePrice: 125.40,
      currentPrice: 130.15,
      allocation: 20,
      category: "Fixed Income",
      sector: "Corporate Bonds",
    },
    {
      id: "h12",
      accountId: "inv3",
      name: "Utilities Sector ETF",
      ticker: "XLU",
      shares: 80,
      purchasePrice: 65.25,
      currentPrice: 68.90,
      allocation: 10,
      category: "Equity",
      sector: "Utilities",
    },
  ],
  transactions: [
    {
      id: "it1",
      accountId: "inv1",
      type: "buy",
      ticker: "SPY",
      shares: 20,
      price: 445.75,
      amount: 8915.00,
      date: "2025-02-15T10:30:00",
      status: "completed",
      fee: 4.95,
    },
    {
      id: "it2",
      accountId: "inv1",
      type: "dividend",
      ticker: "SPY",
      shares: 0,
      price: 0,
      amount: 245.50,
      date: "2025-02-10T00:00:00",
      status: "completed",
      fee: 0,
    },
    {
      id: "it3",
      accountId: "inv2",
      type: "buy",
      ticker: "XLK",
      shares: 15,
      price: 175.30,
      amount: 2629.50,
      date: "2025-02-08T14:15:00",
      status: "completed",
      fee: 4.95,
    },
    {
      id: "it4",
      accountId: "inv2",
      type: "sell",
      ticker: "VWO",
      shares: 25,
      price: 47.85,
      amount: 1196.25,
      date: "2025-02-05T11:45:00",
      status: "completed",
      fee: 4.95,
    },
    {
      id: "it5",
      accountId: "inv3",
      type: "dividend",
      ticker: "VIG",
      shares: 0,
      price: 0,
      amount: 135.60,
      date: "2025-02-01T00:00:00",
      status: "completed",
      fee: 0,
    },
    {
      id: "it6",
      accountId: "inv1",
      type: "deposit",
      ticker: "",
      shares: 0,
      price: 0,
      amount: 5000.00,
      date: "2025-01-25T09:00:00",
      status: "completed",
      fee: 0,
    },
    {
      id: "it7",
      accountId: "inv3",
      type: "buy",
      ticker: "TLT",
      shares: 30,
      price: 140.25,
      amount: 4207.50,
      date: "2025-01-20T13:30:00",
      status: "completed",
      fee: 4.95,
    },
    {
      id: "it8",
      accountId: "inv2",
      type: "deposit",
      ticker: "",
      shares: 0,
      price: 0,
      amount: 10000.00,
      date: "2025-01-15T10:00:00",
      status: "completed",
      fee: 0,
    },
  ],
  performance: {
    "inv1": [
      { date: "2025-01-01", value: 118250.35 },
      { date: "2025-01-08", value: 119750.80 },
      { date: "2025-01-15", value: 120500.25 },
      { date: "2025-01-22", value: 121750.60 },
      { date: "2025-01-29", value: 123250.75 },
      { date: "2025-02-05", value: 124500.30 },
      { date: "2025-02-12", value: 125750.42 },
    ],
    "inv2": [
      { date: "2025-01-01", value: 40250.15 },
      { date: "2025-01-08", value: 41500.30 },
      { date: "2025-01-15", value: 42750.45 },
      { date: "2025-01-22", value: 43250.60 },
      { date: "2025-01-29", value: 44000.75 },
      { date: "2025-02-05", value: 44750.90 },
      { date: "2025-02-12", value: 45250.18 },
    ],
    "inv3": [
      { date: "2025-01-01", value: 72500.25 },
      { date: "2025-01-08", value: 73000.50 },
      { date: "2025-01-15", value: 73500.75 },
      { date: "2025-01-22", value: 74000.10 },
      { date: "2025-01-29", value: 74500.35 },
      { date: "2025-02-05", value: 75000.60 },
      { date: "2025-02-12", value: 75325.65 },
    ],
  }
}

export default function InvestmentsPage() {
  // Use localStorage to persist investments data
  const [investmentsData, setInvestmentsData] = useLocalStorage('nextgen-atm-investments', initialInvestmentsData)
  const [selectedAccount, setSelectedAccount] = useState(investmentsData.accounts[0])
  const [showBalances, setShowBalances] = useState(true)
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false)
  const [isTradeDialogOpen, setIsTradeDialogOpen] = useState(false)
  
  // New account form state
  const [newAccountName, setNewAccountName] = useState("")
  const [newAccountType, setNewAccountType] = useState("Brokerage")
  const [newAccountRisk, setNewAccountRisk] = useState("Moderate")
  const [initialDeposit, setInitialDeposit] = useState("")
  
  // Trade form state
  const [tradeType, setTradeType] = useState("buy")
  const [tradeTicker, setTradeTicker] = useState("")
  const [tradeShares, setTradeShares] = useState("")
  const [tradePrice, setTradePrice] = useState("")
  
  // Get holdings for the selected account
  const accountHoldings = investmentsData.holdings.filter(holding => holding.accountId === selectedAccount.id)
  
  // Get performance data for the selected account
  const accountPerformance = investmentsData.performance[selectedAccount.id] || []
  
  // Calculate total value of holdings
  const totalHoldingsValue = accountHoldings.reduce((sum, holding) => {
    return sum + (holding.shares * holding.currentPrice)
  }, 0)
  
  // Calculate total return
  const totalReturn = selectedAccount.balance - selectedAccount.initialInvestment
  const totalReturnPercentage = (totalReturn / selectedAccount.initialInvestment) * 100
  
  // Handle creating a new investment account
  const handleCreateAccount = () => {
    if (!newAccountName || !initialDeposit) return
    
    const depositAmount = parseFloat(initialDeposit)
    if (isNaN(depositAmount) || depositAmount <= 0) return
    
    const newAccount = {
      id: `inv${investmentsData.accounts.length + 1}`,
      name: newAccountName,
      number: `**** ${Math.floor(1000 + Math.random() * 9000)}`,
      balance: depositAmount,
      initialInvestment: depositAmount,
      currency: "USD",
      status: "active",
      openDate: new Date().toISOString(),
      accountType: newAccountType,
      riskProfile: newAccountRisk,
      feeStructure: "0.25% annual",
      lastRebalanced: new Date().toISOString(),
    }
    
    // Create initial deposit transaction
    const depositTransaction = {
      id: `it${investmentsData.transactions.length + 1}`,
      accountId: newAccount.id,
      type: "deposit",
      ticker: "",
      shares: 0,
      price: 0,
      amount: depositAmount,
      date: new Date().toISOString(),
      status: "completed",
      fee: 0,
    }
    
    // Create initial performance data
    const today = new Date().toISOString().split('T')[0]
    const newPerformance = {
      ...investmentsData.performance,
      [newAccount.id]: [
        { date: today, value: depositAmount }
      ]
    }
    
    setInvestmentsData({
      ...investmentsData,
      accounts: [...investmentsData.accounts, newAccount],
      transactions: [...investmentsData.transactions, depositTransaction],
      performance: newPerformance
    })
    
    setSelectedAccount(newAccount)
    setIsNewAccountDialogOpen(false)
    resetNewAccountForm()
  }
  
  // Handle executing a trade
  const handleTrade = () => {
    const shares = parseInt(tradeShares)
    const price = parseFloat(tradePrice)
    const amount = shares * price
    const fee = 4.95 // Standard trading fee
    
    if (isNaN(shares) || isNaN(price) || shares <= 0 || price <= 0 || !tradeTicker) return
    
    // For sell orders, check if the user has enough shares
    if (tradeType === "sell") {
      const holding = accountHoldings.find(h => h.ticker === tradeTicker)
      if (!holding || holding.shares < shares) {
        alert("You don't have enough shares to sell.")
        return
      }
    }
    
    // For buy orders, check if the user has enough funds
    if (tradeType === "buy") {
      const totalCost = amount + fee
      if (selectedAccount.balance < totalCost) {
        alert("Insufficient funds for this trade.")
        return
      }
    }
    
    // Create new transaction
    const newTransaction = {
      id: `it${investmentsData.transactions.length + 1}`,
      accountId: selectedAccount.id,
      type: tradeType,
      ticker: tradeTicker,
      shares: shares,
      price: price,
      amount: amount,
      date: new Date().toISOString(),
      status: "completed",
      fee: fee,
    }
    
    // Update account balance
    const updatedAccounts = investmentsData.accounts.map(account => {
      if (account.id === selectedAccount.id) {
        let newBalance = account.balance
        if (tradeType === "buy") {
          newBalance -= (amount + fee)
        } else if (tradeType === "sell") {
          newBalance += (amount - fee)
        }
        return {
          ...account,
          balance: newBalance
        }
      }
      return account
    })
    
    // Update or create holding
    let updatedHoldings = [...investmentsData.holdings]
    const existingHoldingIndex = updatedHoldings.findIndex(h => 
      h.accountId === selectedAccount.id && h.ticker === tradeTicker
    )
    
    if (existingHoldingIndex >= 0) {
      // Update existing holding
      const existingHolding = updatedHoldings[existingHoldingIndex]
      if (tradeType === "buy") {
        // Calculate new average purchase price
        const totalShares = existingHolding.shares + shares
        const totalCost = (existingHolding.shares * existingHolding.purchasePrice) + amount
        const newAvgPrice = totalCost / totalShares
        
        updatedHoldings[existingHoldingIndex] = {
          ...existingHolding,
          shares: totalShares,
          purchasePrice: newAvgPrice,
          currentPrice: price // Assume current price is the trade price
        }
      } else if (tradeType === "sell") {
        const remainingShares = existingHolding.shares - shares
        if (remainingShares > 0) {
          updatedHoldings[existingHoldingIndex] = {
            ...existingHolding,
            shares: remainingShares,
            currentPrice: price // Update current price
          }
        } else {
          // Remove holding if no shares left
          updatedHoldings = updatedHoldings.filter((_, index) => index !== existingHoldingIndex)
        }
      }
    } else if (tradeType === "buy") {
      // Create new holding
      const newHolding = {
        id: `h${investmentsData.holdings.length + 1}`,
        accountId: selectedAccount.id,
        name: tradeTicker, // Use ticker as name for now
        ticker: tradeTicker,
        shares: shares,
        purchasePrice: price,
        currentPrice: price,
        allocation: 0, // Will need to recalculate allocations
        category: "Equity", // Default category
        sector: "Other", // Default sector
      }
      updatedHoldings.push(newHolding)
    }
    
    // Recalculate allocations for all holdings in this account
    const accountHoldingsUpdated = updatedHoldings.filter(h => h.accountId === selectedAccount.id)
    const totalValue = accountHoldingsUpdated.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0)
    
    updatedHoldings = updatedHoldings.map(holding => {
      if (holding.accountId === selectedAccount.id) {
        const holdingValue = holding.shares * holding.currentPrice
        const allocation = totalValue > 0 ? Math.round((holdingValue / totalValue) * 100) : 0
        return {
          ...holding,
          allocation
        }
      }
      return holding
    })
    
    // Update performance data
    const today = new Date().toISOString().split('T')[0]
    const accountPerf = investmentsData.performance[selectedAccount.id] || []
    const updatedPerformance = {
      ...investmentsData.performance,
      [selectedAccount.id]: [
        ...accountPerf,
        { 
          date: today, 
          value: (updatedAccounts.find(a => a.id === selectedAccount.id) || selectedAccount).balance + totalValue
        }
      ]
    }
    
    // Update state
    setInvestmentsData({
      ...investmentsData,
      accounts: updatedAccounts,
      holdings: updatedHoldings,
      transactions: [...investmentsData.transactions, newTransaction],
      performance: updatedPerformance
    })
    
    // Update selected account reference
    setSelectedAccount(updatedAccounts.find(acc => acc.id === selectedAccount.id)!)
    
    // Close dialog and reset form
    setIsTradeDialogOpen(false)
    resetTradeForm()
  }
  
  // Reset form states
  const resetNewAccountForm = () => {
    setNewAccountName("")
    setNewAccountType("Brokerage")
    setNewAccountRisk("Moderate")
    setInitialDeposit("")
  }
  
  const resetTradeForm = () => {
    setTradeType("buy")
    setTradeTicker("")
    setTradeShares("")
    setTradePrice("")
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Investments</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your investment portfolios and track performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowBalances(!showBalances)}>
              {showBalances ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {showBalances ? "Hide Balances" : "Show Balances"}
            </Button>
            <Button size="sm" onClick={() => setIsNewAccountDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Account
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {investmentsData.accounts.map((account) => (
            <Card 
              key={account.id} 
              className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedAccount.id === account.id ? "border-blue-500 dark:border-blue-400" : ""
              }`}
              onClick={() => setSelectedAccount(account)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{account.name}</CardTitle>
                    <CardDescription>{account.number}</CardDescription>
                  </div>
                  <div className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {account.riskProfile}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {showBalances 
                    ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(account.balance)
                    : "••••••"
                  }
                </div>
                <div className="flex items-center pt-1 text-xs">
                  <span className={totalReturn >= 0 ? "text-green-500" : "text-red-500"}>
                    {showBalances 
                      ? `${totalReturn >= 0 ? "+" : ""}${new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(totalReturn)} (${totalReturnPercentage.toFixed(2)}%)`
                      : "••••••"
                    }
                  </span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">total return</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex gap-2 text-xs">
                  <span className="capitalize text-gray-500 dark:text-gray-400">{account.accountType}</span>
                  <span className="text-gray-400 dark:text-gray-600">•</span>
                  <span className="capitalize text-gray-500 dark:text-gray-400">{account.status}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>{selectedAccount.name}</CardTitle>
                <CardDescription>
                  Account {selectedAccount.number} • {selectedAccount.accountType}
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsTradeDialogOpen(true)}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trade
                </Button>
                <Button variant="outline" size="sm">
                  <LineChart className="mr-2 h-4 w-4" />
                  Analyze
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="portfolio" className="space-y-4">
              <TabsList>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="details">Account Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="portfolio" className="space-y-4">
                <InvestmentPortfolio 
                  account={selectedAccount}
                  holdings={accountHoldings}
                  performance={accountPerformance}
                  showBalances={showBalances}
                />
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-4">
                <InvestmentActivity 
                  accountId={selectedAccount.id}
                  transactions={investmentsData.transactions}
                  showBalances={showBalances}
                  currency={selectedAccount.currency}
                />
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <InvestmentDetails 
                  account={selectedAccount}
                  showBalances={showBalances}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* New Investment Account Dialog */}
      <Dialog open={isNewAccountDialogOpen} onOpenChange={setIsNewAccountDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Open New Investment Account</DialogTitle>
            <DialogDescription>
              Create a new investment account to diversify your portfolio.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input
                id="accountName"
                placeholder="e.g., Retirement Fund"
                value={newAccountName}
                onChange={(e) => setNewAccountName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accountType">Account Type</Label>
              <Select value={newAccountType} onValueChange={setNewAccountType}>
                <SelectTrigger id="accountType">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brokerage">Brokerage</SelectItem>
                  <SelectItem value="IRA">IRA</SelectItem>
                  <SelectItem value="401(k)">401(k)</SelectItem>
                  <SelectItem value="Roth IRA">Roth IRA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="riskProfile">Risk Profile</Label>
              <Select value={newAccountRisk} onValueChange={setNewAccountRisk}>
                <SelectTrigger id="riskProfile">
                  <SelectValue placeholder="Select risk profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conservative">Conservative</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="initialDeposit">Initial Deposit ($)</Label>
              <Input
                id="initialDeposit"
                type="number"
                placeholder="0.00"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                min="0"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAccountDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleCreateAccount} 
              disabled={!newAccountName || !initialDeposit || parseFloat(initialDeposit) <= 0}
            >
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Trade Dialog */}
      <Dialog open={isTradeDialogOpen} onOpenChange={setIsTradeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Execute Trade</DialogTitle>
            <DialogDescription>
              Buy or sell securities in your {selectedAccount.name} account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tradeType">Trade Type</Label>
              <Select value={tradeType} onValueChange={setTradeType}>
                <SelectTrigger id="tradeType">
                  <SelectValue placeholder="Select trade type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ticker">Ticker Symbol</Label>
              {tradeType === "sell" ? (
                <Select value={tradeTicker} onValueChange={setTradeTicker}>
                  <SelectTrigger id="ticker">
                    <SelectValue placeholder="Select security" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountHoldings.map(holding => (
                      <SelectItem key={holding.id} value={holding.ticker}>
                        {holding.ticker} - {holding.name} ({holding.shares} shares)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="ticker"
                  placeholder="e.g., AAPL"
                  value={tradeTicker}
                  onChange={(e) => setTradeTicker(e.target.value.toUpperCase())}
                />
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shares">Number of Shares</Label>
              <Input
                id="shares"
                type="number"
                placeholder="0"
                value={tradeShares}
                onChange={(e) => setTradeShares(e.target.value)}
                min="1"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price per Share ($)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={tradePrice}
                onChange={(e) => setTradePrice(e.target.value)}
                min="0.01"
                step="0.01"
              />
            </div>
            
            {tradeType === "buy" && tradeShares && tradePrice && (
              <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                    }).format(parseFloat(tradeShares) * parseFloat(tradePrice))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Trading Fee:</span>
                  <span>$4.95</span>
                </div>
                <div className="flex justify-between font-medium mt-1 pt-1 border-t">
                  <span>Total:</span>
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                    }).format((parseFloat(tradeShares) * parseFloat(tradePrice)) + 4.95)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Available Cash: {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                  }).format(selectedAccount.balance)}
                </div>
              </div>
            )}
            
            {tradeType === "sell" && tradeShares && tradePrice && (
              <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                    }).format(parseFloat(tradeShares) * parseFloat(tradePrice))}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Trading Fee:</span>
                  <span>$4.95</span>
                </div>
                <div className="flex justify-between font-medium mt-1 pt-1 border-t">
                  <span>Net Proceeds:</span>
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD"
                    }).format((parseFloat(tradeShares) * parseFloat(tradePrice)) - 4.95)}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTradeDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleTrade} 
              disabled={!tradeTicker || !tradeShares || !tradePrice || 
                parseInt(tradeShares) <= 0 || parseFloat(tradePrice) <= 0}
            >
              {tradeType === "buy" ? "Buy" : "Sell"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}
