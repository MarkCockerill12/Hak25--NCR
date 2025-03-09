"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  CreditCard,
  Clock,
  AlertCircle,
  Download,
  Plus,
  CheckCircle2,
  Calendar,
  Receipt,
  Filter
} from "lucide-react"
import { TransactionHistory } from "@/components/transaction-history"

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false)

  // Mock data for payment methods
  const paymentMethods = [
    {
      id: "card1",
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true
    },
    {
      id: "card2",
      type: "Mastercard",
      last4: "8888",
      expiry: "09/24",
      isDefault: false
    }
  ]

  // Mock data for upcoming bills
  const upcomingBills = [
    {
      id: "bill1",
      name: "Internet Service",
      amount: 79.99,
      dueDate: "2024-03-15",
      status: "upcoming",
      autopay: true
    },
    {
      id: "bill2",
      name: "Phone Bill",
      amount: 65.00,
      dueDate: "2024-03-18",
      status: "upcoming",
      autopay: true
    },
    {
      id: "bill3",
      name: "Streaming Service",
      amount: 14.99,
      dueDate: "2024-03-20",
      status: "upcoming",
      autopay: false
    }
  ]

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Billing & Payments</h1>
          <p className="text-gray-500">Manage your payment methods and view transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={() => setShowAddPaymentDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="bills">Bills & Autopay</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Upcoming Bills</p>
                    <h3 className="text-2xl font-bold">$159.98</h3>
                    <p className="text-sm text-gray-500">Due this month</p>
                  </div>
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Last Month Spending</p>
                    <h3 className="text-2xl font-bold">$2,156.85</h3>
                    <p className="text-sm text-red-500">+12% from last month</p>
                  </div>
                  <Receipt className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Autopay</p>
                    <h3 className="text-2xl font-bold">5</h3>
                    <p className="text-sm text-gray-500">Bills on autopay</p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent transactions and bill payments</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionHistory limit={5} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-methods">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Your saved payment methods and cards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {method.type} ending in {method.last4}
                      </p>
                      <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                    </div>
                    {method.isDefault && (
                      <Badge variant="secondary" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bills">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bills</CardTitle>
              <CardDescription>Manage your bills and autopay settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-sm text-gray-500">
                        Due {new Date(bill.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    {bill.autopay && (
                      <Badge variant="secondary" className="ml-2">
                        AutoPay
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-medium">${bill.amount}</p>
                    <Button variant="outline" size="sm">
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>View and download your transaction history</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <TransactionHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Payment Method Dialog */}
      <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
            <DialogDescription>
              Add a new card or payment method to your account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label>Card Number</label>
              <Input placeholder="**** **** **** ****" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label>Expiry Date</label>
                <Input placeholder="MM/YY" />
              </div>
              <div className="grid gap-2">
                <label>CVV</label>
                <Input placeholder="***" />
              </div>
            </div>
            <div className="grid gap-2">
              <label>Cardholder Name</label>
              <Input placeholder="Name on card" />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setShowAddPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAddPaymentDialog(false)}>
              Add Payment Method
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
