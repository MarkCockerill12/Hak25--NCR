"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Bell, CreditCard, HelpCircle, LogOut, Settings, User, X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

export function UserNav() {
  const [notificationCount, setNotificationCount] = useState(3)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const router = useRouter()

  const notifications = [
    { id: 1, text: "Your bill payment is due tomorrow", read: false },
    { id: 2, text: "New account statement is available", read: false },
    { id: 3, text: "Security alert: New device login", read: false },
  ]

  const markAllRead = () => {
    setNotificationCount(0)
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    // Simulate logout
    setTimeout(() => {
      router.push("/")
    }, 500)
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
              <h3 className="font-medium text-gray-900 dark:text-white">Notifications</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-blue-600 dark:text-blue-400"
                onClick={markAllRead}
              >
                Mark all read
              </Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length > 0 ? (
                <div>
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className="p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                      <div className="flex gap-2">
                        {!notification.read && (
                          <div className="h-2 w-2 mt-1 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0"></div>
                        )}
                        <p className="text-sm text-gray-700 dark:text-gray-300">{notification.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                  No new notifications
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setShowHelpDialog(true)}
      >
        <HelpCircle className="h-5 w-5" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-gray-900 dark:text-white">John Doe</p>
              <p className="text-xs leading-none text-gray-500 dark:text-gray-400">john.doe@example.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/billing")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
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

      {/* Help Dialog */}
      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Help Center</DialogTitle>
            <DialogDescription>
              How can we assist you today?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Common Questions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Button variant="link" className="h-auto p-0 text-left justify-start">
                    How do I transfer money between accounts?
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-left justify-start">
                    How can I change my security settings?
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-left justify-start">
                    Where can I find my account statements?
                  </Button>
                </li>
              </ul>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Need more help? Contact customer support:</p>
              <p className="mt-1 font-medium text-gray-900 dark:text-white">1-800-123-4567</p>
              <p>Available 24/7</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of your account?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              Logout
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}