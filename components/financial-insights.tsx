"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"
import { 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  Settings, 
  User, 
  X, 
  Wallet, 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  Download 
} from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

export function FinancialInsights() {
  const [activeTab, setActiveTab] = useState("spending")
  const [timeRange, setTimeRange] = useState("month")
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [detailType, setDetailType] = useState<string | null>(null)
  const [downloadFormat, setDownloadFormat] = useState("pdf")

  // Mock data for spending distribution with proper color values for Chart.js
  const spendingData = [
    { category: "Housing", amount: 1250, percentage: 35, color: "rgb(59, 130, 246)" },
    { category: "Food", amount: 650, percentage: 18, color: "rgb(34, 197, 94)" },
    { category: "Transportation", amount: 450, percentage: 13, color: "rgb(234, 179, 8)" },
    { category: "Entertainment", amount: 350, percentage: 10, color: "rgb(168, 85, 247)" },
    { category: "Utilities", amount: 300, percentage: 8, color: "rgb(239, 68, 68)" },
    { category: "Shopping", amount: 250, percentage: 7, color: "rgb(99, 102, 241)" },
    { category: "Health", amount: 200, percentage: 6, color: "rgb(236, 72, 153)" },
    { category: "Other", amount: 120, percentage: 3, color: "rgb(107, 114, 128)" },
  ]

  // Configure Chart.js data
  const chartData = {
    labels: spendingData.map(item => item.category),
    datasets: [{
      data: spendingData.map(item => item.amount),
      backgroundColor: spendingData.map(item => item.color),
      borderColor: spendingData.map(item => item.color),
      borderWidth: 1,
    }],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.raw
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `$${value.toLocaleString()} (${percentage}%)`
          }
        }
      }
    }
  }

  // Mock data for savings insights
  const savingsData = {
    currentMonth: 550,
    lastMonth: 430,
    average: 475,
    yearToDate: 2750,
    savingsRate: 15,
    targetRate: 20,
  }
  
  // Mock data for income insights
  const incomeData = {
    currentMonth: 3650,
    lastMonth: 3650,
    average: 3600,
    yearToDate: 21600,
    sources: [
      { name: "Primary Job", amount: 3200, percentage: 88 },
      { name: "Side Hustle", amount: 350, percentage: 9 },
      { name: "Investments", amount: 100, percentage: 3 },
    ]
  }

  const handleShowDetail = (type: string) => {
    setDetailType(type)
    setShowDetailDialog(true)
  }

  const handleDownloadReport = () => {
    // Simulate download process
    alert(`Downloading ${timeRange} report in ${downloadFormat.toUpperCase()} format...`)
  }

  return (
    <div className="space-y-8">
      {/* Time range and export controls */}
      <div className="flex justify-between items-center mb-6">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-2">
          <Select value={downloadFormat} onValueChange={setDownloadFormat}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleDownloadReport} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>
        
        {/* Spending Tab */}
        <TabsContent value="spending" className="space-y-6">
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Spending Distribution</h3>
            
            {/* Pie Chart */}
            <div className="relative h-[400px] w-full mb-8">
              <Pie data={chartData} options={chartOptions} />
            </div>

            {/* Spending breakdown list */}
            <div className="space-y-4">
              {spendingData.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.category}</span>
                    </div>
                    <span>${item.amount.toLocaleString()} ({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => handleShowDetail('spending')}
              >
                <PieChart className="mr-2 h-4 w-4" />
                View Detailed Breakdown
              </Button>
            </div>
          </div>
          
          {/* Spending insights */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Spending Insights</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 dark:text-blue-400">•</span>
                Your spending on Food increased by 12% compared to last month.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 dark:text-green-400">•</span>
                You've reduced Transportation expenses by 8% - good job!
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 dark:text-purple-400">•</span>
                Consider reviewing your Entertainment budget which is 15% higher than similar users.
              </li>
            </ul>
          </div>
        </TabsContent>

        {/* Income Tab */}
        <TabsContent value="income" className="space-y-6">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 mt-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Current Month</div>
              <div className="text-2xl font-bold">${incomeData.currentMonth}</div>
              <div className="text-xs text-gray-400 mt-1">vs ${incomeData.lastMonth} last month</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Average</div>
              <div className="text-2xl font-bold">${incomeData.average}</div>
              <div className="text-xs text-gray-400 mt-1">based on last 6 months</div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Year to Date</div>
              <div className="text-2xl font-bold">${incomeData.yearToDate}</div>
              <div className="text-xs text-gray-400 mt-1">total income this year</div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Income Sources</h3>
            <div className="space-y-4">
              {incomeData.sources.map((source) => (
                <div key={source.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{source.name}</span>
                    <span>${source.amount} ({source.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Savings Tab */}
        <TabsContent value="savings" className="space-y-6">
          {/* ... existing savings tab content ... */}
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {detailType === 'spending' && 'Detailed Spending Analysis'}
              {detailType === 'income' && 'Income Trends & Analysis'}
              {detailType === 'savings' && 'Savings Opportunities'}
            </DialogTitle>
            <DialogDescription>
              {detailType === 'spending' && 'In-depth breakdown of your spending patterns'}
              {detailType === 'income' && 'Detailed view of your income sources and trends'}
              {detailType === 'savings' && 'Personalized recommendations to increase your savings'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {/* ... existing dialog content ... */}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowDetailDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function UserNav() {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Your bill payment is due tomorrow", read: false },
    { id: 2, text: "New account statement is available", read: false },
    { id: 3, text: "Security alert: New device login", read: false },
  ])
  const [notificationCount, setNotificationCount] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const router = useRouter()

  const markAllRead = () => {
    setNotificationCount(0)
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
    setNotificationCount(prev => Math.max(0, prev - 1))
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    router.push("/")
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium">Notifications</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllRead}
              >
                Mark all read
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className="p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 relative group"
                >
                  <p className="text-sm pr-8">{notification.text}</p>
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-500">john.doe@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FinancialInsights