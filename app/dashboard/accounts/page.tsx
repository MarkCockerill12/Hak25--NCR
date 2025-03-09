"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { TransactionHistory } from "../../../components/transaction-history"
import { AccountSummary } from "../../../components/account-summary"
import { 
  ArrowLeftRight, 
  CreditCard, 
  Download,
  Plus,
  Send
} from "lucide-react"

export default function AccountsPage() {
  const [activeTab, setActiveTab] = useState("accounts")

  const accounts = [
    {
      title: "Checking Account",
      accountNumber: "**** 1234",
      balance: 2543.87,
      change: +125.24
    },
    {
      title: "Savings Account",
      accountNumber: "**** 5678",
      balance: 15750.52,
      change: +350.12
    },
    {
      title: "Investment Portfolio",
      accountNumber: "**** 9012",
      balance: 32150.75,
      change: -125.65
    },
    {
      title: "Credit Card",
      accountNumber: "**** 3456",
      balance: -450.33,
      change: +50.0,
      isCredit: true
    }
  ]

  const quickActions = [
    {
      title: "Transfer Money",
      icon: <ArrowLeftRight className="h-4 w-4" />,
      action: () => {}
    },
    {
      title: "Add Account",
      icon: <Plus className="h-4 w-4" />,
      action: () => {}
    },
    {
      title: "Send Money",
      icon: <Send className="h-4 w-4" />,
      action: () => {}
    },
    {
      title: "Manage Cards",
      icon: <CreditCard className="h-4 w-4" />,
      action: () => {}
    }
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Accounts Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your accounts, view balances, and track transactions
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action, index) => (
          <Card key={index} className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mb-3">
                {action.icon}
              </div>
              <span className="text-sm font-medium">{action.title}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">All Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {accounts.map((account, index) => (
              <AccountSummary key={index} {...account} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>View and manage your recent transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <TransactionHistory limit={10} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statements">
          <Card>
            <CardHeader>
              <CardTitle>Account Statements</CardTitle>
              <CardDescription>Download your monthly statements</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add statements list here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}