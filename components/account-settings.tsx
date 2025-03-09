"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { AlertTriangle, Bell, Check, Lock, Mail, Smartphone, Star } from "lucide-react"

interface AccountSettingsProps {
  account: {
    id: string
    name: string
    number: string
    type: string
    balance: number
    available: number
    currency: string
    status: string
    isDefault: boolean
  }
  onUpdate: (updates: Partial<AccountSettingsProps["account"]>) => void
}

export function AccountSettings({ account, onUpdate }: AccountSettingsProps) {
  const [accountName, setAccountName] = useState(account.name)
  const [isDefault, setIsDefault] = useState(account.isDefault)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    lowBalance: true,
    largeDeposits: true,
    largeWithdrawals: true,
    weeklyStatement: true,
  })

  const handleSaveAccountName = () => {
    // Update account name in parent component
    onUpdate({ name: accountName })
  }

  const handleSetDefault = () => {
    setIsDefault(true)
    // Update default status in parent component
    onUpdate({ isDefault: true })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Preferences</CardTitle>
          <CardDescription>Customize how this account appears and behaves</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountName">Account Nickname</Label>
            <div className="flex gap-2">
              <Input
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="flex-1 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              />
              <Button onClick={handleSaveAccountName}>Save</Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              This name is only visible to you and helps you identify your accounts
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="defaultAccount">Default Account</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Make this your primary account for transactions
              </p>
            </div>
            {isDefault ? (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <Check className="mr-1 h-4 w-4" />
                <span className="text-sm font-medium">Default</span>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={handleSetDefault}>
                <Star className="mr-2 h-4 w-4" />
                Set as Default
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Notifications</CardTitle>
          <CardDescription>Choose how you want to be notified about this account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Notification Channels</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Label htmlFor="emailNotifications" className="text-sm">
                    Email Notifications
                  </Label>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Label htmlFor="pushNotifications" className="text-sm">
                    Push Notifications
                  </Label>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Label htmlFor="smsNotifications" className="text-sm">
                    SMS Notifications
                  </Label>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Notification Types</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="lowBalance" className="text-sm">
                  Low Balance Alerts
                </Label>
                <Switch
                  id="lowBalance"
                  checked={notifications.lowBalance}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, lowBalance: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="largeDeposits" className="text-sm">
                  Large Deposits
                </Label>
                <Switch
                  id="largeDeposits"
                  checked={notifications.largeDeposits}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, largeDeposits: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="largeWithdrawals" className="text-sm">
                  Large Withdrawals
                </Label>
                <Switch
                  id="largeWithdrawals"
                  checked={notifications.largeWithdrawals}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, largeWithdrawals: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyStatement" className="text-sm">
                  Weekly Statement Summary
                </Label>
                <Switch
                  id="weeklyStatement"
                  checked={notifications.weeklyStatement}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyStatement: checked })}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security Settings</CardTitle>
          <CardDescription>Manage security options for this account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div>
                <Label className="text-sm">Two-Factor Authentication for Transfers</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Require 2FA for all transfers from this account
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-lg text-red-600 dark:text-red-400 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>These actions cannot be undone</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Close Account</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Permanently close this account and withdraw all funds
              </p>
            </div>
            <Button variant="destructive">Close Account</Button>
          </div>
        </CardContent>
      </Card>

      {/* Update notifications when they change */}
      {/* In a real app, this would save to the backend */}
      {/* Here we're just logging the changes */}
      {/* useEffect(() => {
        console.log("Notification settings updated:", notifications)
      }, [notifications]) */}
    </div>
  )
}

