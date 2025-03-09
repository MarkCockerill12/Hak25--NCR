"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowDownLeft, Coffee, CreditCard, FileText, Home, ShoppingCart, Smartphone, Utensils } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

// Mock transaction data
const transactions = [
  {
    id: "t1",
    type: "debit",
    description: "Grocery Store",
    category: "Shopping",
    amount: 78.45,
    date: "2025-03-07T14:30:00",
    icon: <ShoppingCart className="h-4 w-4" />,
    merchant: "Whole Foods Market",
    status: "Completed",
    details: "Weekly grocery shopping"
  },
  {
    id: "t2",
    type: "credit",
    description: "Salary Deposit",
    category: "Income",
    amount: 2500.0,
    date: "2025-03-05T09:15:00",
    icon: <ArrowDownLeft className="h-4 w-4" />,
    merchant: "ABC Corporation",
    status: "Completed",
    details: "Monthly salary payment"
  },
  {
    id: "t3",
    type: "debit",
    description: "Coffee Shop",
    category: "Food & Drink",
    amount: 4.5,
    date: "2025-03-04T08:20:00",
    icon: <Coffee className="h-4 w-4" />,
  },
  {
    id: "t4",
    type: "debit",
    description: "Monthly Rent",
    category: "Housing",
    amount: 1200.0,
    date: "2025-03-03T00:00:00",
    icon: <Home className="h-4 w-4" />,
  },
  {
    id: "t5",
    type: "debit",
    description: "Phone Bill",
    category: "Utilities",
    amount: 65.99,
    date: "2025-03-02T12:45:00",
    icon: <Smartphone className="h-4 w-4" />,
  },
  {
    id: "t6",
    type: "debit",
    description: "Restaurant Dinner",
    category: "Food & Drink",
    amount: 42.75,
    date: "2025-03-01T19:30:00",
    icon: <Utensils className="h-4 w-4" />,
  },
  {
    id: "t7",
    type: "debit",
    description: "Online Purchase",
    category: "Shopping",
    amount: 29.99,
    date: "2025-02-28T15:20:00",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    id: "t8",
    type: "credit",
    description: "Refund",
    category: "Income",
    amount: 19.99,
    date: "2025-02-27T10:15:00",
    icon: <ArrowDownLeft className="h-4 w-4" />,
  },
]

interface TransactionHistoryProps {
  limit?: number
}

export function TransactionHistory({ limit }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const [showAllTransactions, setShowAllTransactions] = useState(false)
  const router = useRouter()

  const handleViewAll = () => {
    if (limit) {
      // If we're in a limited view, set state to show all
      setShowAllTransactions(true)
    } else {
      // If we're already on the transactions page, navigate to a more detailed view
      router.push("/dashboard/transactions/all")
    }
  }

  const handleExportData = () => {
    // Simulate downloading a CSV
    alert("Exporting transaction data as CSV...")
    // In a real app, this would trigger a download
  }

  const handleTransactionClick = (transaction: typeof transactions[0]) => {
    setSelectedTransaction(transaction)
  }

  const handleViewReceipt = () => {
    setShowReceipt(true)
  }

  const handleDisputeTransaction = () => {
    alert(`Dispute filed for transaction: ${selectedTransaction?.description}`)
    setSelectedTransaction(null)
  }
  
  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filter === "income" && transaction.type !== "credit") return false
      if (filter === "expenses" && transaction.type !== "debit") return false
      return transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .slice(0, showAllTransactions ? undefined : limit || transactions.length)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <div className="flex flex-1 gap-2">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="income">Income Only</SelectItem>
              <SelectItem value="expenses">Expenses Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="sm" onClick={handleExportData}>
          <FileText className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="space-y-2">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
              onClick={() => handleTransactionClick(transaction)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "credit"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {transaction.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{transaction.description}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
                  </div>
                </div>
              </div>
              <div
                className={`font-medium ${transaction.type === "credit" ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}
              >
                {transaction.type === "credit" ? "+" : "-"}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(transaction.amount)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">No transactions found</div>
        )}
      </div>

      {limit && transactions.length > limit && !showAllTransactions && (
        <div className="text-center">
          <Button variant="outline" onClick={handleViewAll}>View All Transactions</Button>
        </div>
      )}

      {/* Transaction Details Dialog */}
      <Dialog open={selectedTransaction !== null} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Information about this transaction
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Merchant</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedTransaction.merchant}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                  <p className={`font-medium ${selectedTransaction.type === "credit" ? "text-green-600 dark:text-green-400" : "text-gray-900 dark:text-white"}`}>
                    {selectedTransaction.type === "credit" ? "+" : "-"}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(selectedTransaction.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedTransaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(selectedTransaction.date).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedTransaction.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-medium text-green-600 dark:text-green-400">{selectedTransaction.status}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Details</p>
                <p className="font-medium text-gray-900 dark:text-white">{selectedTransaction.details}</p>
              </div>

              <div className="flex justify-between pt-4 gap-2">
                <Button variant="outline" size="sm" onClick={handleViewReceipt}>View Receipt</Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDisputeTransaction}
                  disabled={selectedTransaction.type === "credit"}
                >
                  Dispute Transaction
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Transaction Receipt</DialogTitle>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="space-y-6 py-4 flex flex-col items-center">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedTransaction.merchant}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receipt #{selectedTransaction.id}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(selectedTransaction.date).toLocaleString()}
                </p>
              </div>
              
              <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${(selectedTransaction.amount * 0.9).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${(selectedTransaction.amount * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total:</span>
                  <span>${selectedTransaction.amount.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <Button onClick={() => alert("Receipt downloaded")}>
                  Download Receipt
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}