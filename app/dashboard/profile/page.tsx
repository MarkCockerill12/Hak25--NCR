"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { UserNav } from "@/components/user-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Shield,
  Smartphone,
  Key,
  Mail,
  UserCircle,
  Fingerprint,
  Bell,
  Globe,
  Lock,
  History
} from "lucide-react"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showDeviceDialog, setShowDeviceDialog] = useState(false)
  const [userDetails, setUserDetails] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    language: "English",
    timezone: "EST"
  })

  const [securityPreferences, setSecurityPreferences] = useState({
    twoFactor: true,
    biometric: true,
    notifyNewDevices: true,
    notifyLargeTransactions: true
  })

  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
    sms: false,
    transactionAlerts: true,
    securityAlerts: true,
    marketingUpdates: false
  })

  const recentDevices = [
    {
      name: "iPhone 13 Pro",
      location: "New York, USA",
      lastAccess: "2 hours ago",
      browser: "Safari",
      status: "active"
    },
    {
      name: "Windows PC",
      location: "London, UK",
      lastAccess: "1 day ago",
      browser: "Chrome",
      status: "active"
    },
    {
      name: "MacBook Pro",
      location: "Paris, France",
      lastAccess: "3 days ago",
      browser: "Firefox",
      status: "inactive"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex h-16 items-center px-4 md:px-6">
          <h2 className="text-lg font-semibold">NextGen ATM</h2>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Profile Settings</h1>
              <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline">Cancel Changes</Button>
              <Button>Save Changes</Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your personal details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <UserCircle className="h-12 w-12 text-gray-400" />
                    </div>
                    <Button>Change Photo</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input 
                        value={userDetails.firstName}
                        onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input 
                        value={userDetails.lastName}
                        onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input 
                        value={userDetails.phone}
                        onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Set your language and regional preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Language</label>
                      <Input 
                        value={userDetails.language}
                        onChange={(e) => setUserDetails({ ...userDetails, language: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Time Zone</label>
                      <Input 
                        value={userDetails.timezone}
                        onChange={(e) => setUserDetails({ ...userDetails, timezone: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(securityPreferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-3">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <p className="text-sm text-gray-500">
                            {key === 'twoFactor' ? 'Require 2FA for all transactions' :
                             key === 'biometric' ? 'Use fingerprint or face recognition' :
                             key === 'notifyNewDevices' ? 'Get alerts for new device logins' :
                             'Get alerts for large transactions'}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setSecurityPreferences(prev => ({
                              ...prev,
                              [key]: checked
                            }))
                          }
                        />
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => setShowPasswordDialog(true)}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Devices Tab Content */}
            <TabsContent value="devices" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Connected Devices</CardTitle>
                      <CardDescription>Manage devices that have access to your account</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setShowDeviceDialog(true)}>
                      <History className="mr-2 h-4 w-4" />
                      View Activity
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDevices.map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`h-2 w-2 rounded-full ${device.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <p className="text-sm text-gray-500">{device.location} • {device.browser}</p>
                            <p className="text-xs text-gray-400">Last accessed {device.lastAccess}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Remove</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab Content */}
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to be notified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(notificationPreferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between py-3">
                        <div className="space-y-0.5">
                          <label className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <p className="text-sm text-gray-500">
                            Receive notifications for {key.toLowerCase().replace(/([A-Z])/g, ' $1')}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotificationPreferences(prev => ({
                              ...prev,
                              [key]: checked
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label>Current Password</label>
              <Input type="password" />
            </div>
            <div className="grid gap-2">
              <label>New Password</label>
              <Input type="password" />
            </div>
            <div className="grid gap-2">
              <label>Confirm New Password</label>
              <Input type="password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowPasswordDialog(false)}>
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}