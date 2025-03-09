"use client"

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { AlertCircle, Calendar, DollarSign, FileText, Info, Percent, TrendingUp, User } from 'lucide-react'

interface InvestmentDetailsProps {
  account: {
    id: string
    name: string
    number: string
    balance: number
    initialInvestment: number
    currency: string
    status: string
    openDate: string
    accountType: string
    riskProfile: string
    feeStructure: string
    lastRebalanced: string
  }
  showBalances: boolean
}

export function InvestmentDetails({ account, showBalances }: InvestmentDetailsProps) {
  // Calculate total return
  const totalReturn = account.balance - account.initialInvestment
  const totalReturnPercentage = (totalReturn / account.initialInvestment) * 100
  
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DetailCard
          icon={<User className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Account Type"
          value={account.accountType}
        />
        <DetailCard
          icon={<TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Risk Profile"
          value={account.riskProfile}
        />
        <DetailCard
          icon={<Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Opened On"
          value={new Date(account.openDate).toLocaleDateString()}
        />
        <DetailCard
          icon={<Percent className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Fee Structure"
          value={account.feeStructure}
        />
        <DetailCard
          icon={<Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Last Rebalanced"
          value={new Date(account.lastRebalanced).toLocaleDateString()}
        />
        <DetailCard
          icon={<DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Initial Investment"
          value={showBalances 
            ? new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(account.initialInvestment)
            : "••••••"
          }
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Performance Summary</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Return</p>
                <p className={`text-2xl font-bold ${totalReturn >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                  {showBalances 
                    ? `${totalReturn >= 0 ? "+" : ""}${new Intl.NumberFormat("en-US", { style: "currency", currency: account.currency }).format(totalReturn)}`
                    : "••••••"
                  }
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {showBalances 
                    ? `${totalReturn >= 0 ? "+" : ""}${totalReturnPercentage.toFixed(2)}%`
                    : "••••••"
                  }
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Annualized Return</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {showBalances ? "+8.45%" : "••••••"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Since inception
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">Benchmark Comparison</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {showBalances ? "+2.31%" : "••••••"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Outperforming S&P 500
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Features</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Tax-Advantaged
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Auto-Rebalancing
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Dividend Reinvestment
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Tax-Loss Harvesting
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Portfolio Analysis
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Important Information</h3>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Upcoming Rebalancing</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your portfolio is scheduled for automatic rebalancing on April 15, 2025 to maintain your target allocation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Tax Documents</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Your 2024 tax documents are now available. Please review them before filing your taxes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Market Volatility Alert</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Recent market conditions have increased volatility. Your diversified portfolio is designed to weather market fluctuations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DetailCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">{icon}</div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
