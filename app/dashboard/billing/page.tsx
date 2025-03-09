"use client"

import { useState } from "react"
import { Layout } from "../../../components/layout"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../../components/ui/table"
import { Badge } from "../../../components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../../components/ui/select"
import { CreditCard, Download, Plus, Calendar, DollarSign, CheckCircle2, AlertCircle, Clock, Trash2 } from 'lucide-react'

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("payment-methods")
  const [showAddCard, setShowAddCard] = useState(false)

  const paymentMethods = [
    {
      id: "pm1",
      type: "Visa",
      last4: "4242",
      expiry: "04/26",
      isDefault: true,
    },
    {
      id: "pm2",
      type: "Mastercard",
      last4: "5555",
      expiry: "08/25",
      isDefault: false,
    },
  ]

  const upcomingBills = [
    {
      id: "bill1",
      name: "Mortgage Payment",
      amount: 1250.00,
      dueDate: "2025-04-01",
      status: "upcoming",
      autopay: true,
    },
    {
      id: "bill2",
      name: "Car Loan",
      amount: 350.75,
      dueDate: "2025-04-05",
      status: "upcoming",
      autopay: true,
    },
    {
      id: "bill3",
      name: "Credit Card Payment",
      amount: 450.33,
      dueDate: "2025-04-15",
      status: "upcoming",
      autopay: false,
    },
    {
      id: "bill4",
      name: "Utility Bill",
      amount: 125.50,
      dueDate: "2025-04-20",
      status: "upcoming",
      autopay: true,
    },
  ]

  const recentPayments = [
    {
      id: "pay1",
      name: "Mortgage Payment",
      amount: 1250.00,
      date: "2025-03-01",
      status: "completed",
      method: "Visa •••• 4242",
    },
    {
      id: "pay2",
      name: "Car Loan",
      amount: 350.75,
      date: "2025-03-05",
      status: "completed",
      method: "Visa •••• 4242",
    },
    {
      id: "pay3",
      name: "Credit Card Payment",
      amount: 425.50,
      date: "2025-03-15",
      status: "completed",
      method: "Mastercard •••• 5555",
    },
    {
      id: "pay4",
      name: "Utility Bill",
      amount: 118.25,
      date: "2025-03-20",
      status: "completed",
      method: "Visa •••• 4242",
    },
    {
      id: "pay5",
      name: "Internet Service",
      amount: 79.99,
      date: "2025-03-22",
      status: "completed",
      method: "Mastercard •••• 5555",
    },
  ]

  const statements = [
    {
      id: "stmt1",
      period: "March 2025",
      dateIssued: "2025-03-31",
      totalDebits: 2245.49,
      totalCredits: 3500.00,
    },
    {
      id: "stmt2",
      period: "February 2025",
      dateIssued: "2025-02-28",
      totalDebits: 2100.75,
      totalCredits: 3500.00,
    },
    {
      id: "stmt3",
      period: "January 2025",
      dateIssued: "2025-01-31",
      totalDebits: 2350.25,
      totalCredits: 3500.00,
    },
    {
      id: "stmt4",
      period: "December 2024",
      dateIssued: "2024-12-31",
      totalDebits: 3100.50,
      totalCredits: 3500.00,
    },
  ]

  return (
    <Layout>
      <div className="flex flex-col space-y-6 max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Billing</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your payment methods, bills, and statements
          </p>
        </div>

        <Tabs defaultValue="payment-methods" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-[600px]">
            <TabsTrigger value="payment-methods">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger value="upcoming-bills">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming Bills
            </TabsTrigger>
            <TabsTrigger value="payment-history">
              <Clock className="h-4 w-4 mr-2" />
              Payment History
            </TabsTrigger>
            <TabsTrigger value="statements">
              <Download className="h-4 w-4 mr-2" />
              Statements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payment-methods" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Payment Methods</h2>
              <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-gray-900 dark:text-white">Add Payment Method</DialogTitle>
                    <DialogDescription className="text-gray-500 dark:text-gray-400">
                      Enter your card details to add a new payment method.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardName" className="text-gray-700 dark:text-gray-300">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        placeholder="John Doe" 
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber" className="text-gray-700 dark:text-gray-300">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        placeholder="•••• •••• •••• ••••" 
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry" className="text-gray-700 dark:text-gray-300">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY" 
                          className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvc" className="text-gray-700 dark:text-gray-300">CVC</Label>
                        <Input 
                          id="cvc" 
                          placeholder="•••" 
                          className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700" 
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddCard(false)}>Cancel</Button>
                    <Button onClick={() => setShowAddCard(false)}>Add Card</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {paymentMethods.map((method) => (
                <Card key={method.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                          <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {method.type} •••• {method.last4}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Expires {method.expiry}
                          </p>
                          {method.isDefault && (
                            <Badge variant="outline" className="mt-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-500 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">Set as Default</Button>
                      )}
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upcoming-bills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Upcoming Bills</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  View and manage your upcoming bill payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bill</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>AutoPay</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingBills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell className="font-medium text-gray-900 dark:text-white">{bill.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span>{bill.amount.toFixed(2)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(bill.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">
                            Upcoming
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {bill.autopay ? (
                            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">
                              Enabled
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800">
                              Disabled
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            Pay Now
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment-history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Payment History</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  View your recent payment activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium text-gray-900 dark:text-white">{payment.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="mr-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
                            <span>{payment.amount.toFixed(2)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(payment.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                            <span>Completed</span>
                          </div>
                        </TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Payments</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="statements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Account Statements</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  View and download your monthly account statements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Date Issued</TableHead>
                      <TableHead>Total Debits</TableHead>
                      <TableHead>Total Credits</TableHead>
                      <TableHead className="text-right">Download</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statements.map((statement) => (
                      <TableRow key={statement.id}>
                        <TableCell className="font-medium text-gray-900 dark:text-white">{statement.period}</TableCell>
                        <TableCell>
                          {new Date(statement.dateIssued).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-red-600 dark:text-red-400">
                          -${statement.totalDebits.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-green-600 dark:text-green-400">
                          +${statement.totalCredits.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Statements</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
