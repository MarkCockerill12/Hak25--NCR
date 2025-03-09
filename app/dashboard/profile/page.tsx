"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Switch } from "../../../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { DashboardShell } from "../../../components/dashboard-shell"
import { Key, Mail, MessageSquare, Phone, User, UserCircle } from "lucide-react"
import { useLocalStorage } from "../../hooks/use-local-storage"
import { initialProfileData } from "../../../lib/initial-data"

export default function ProfilePage() {
  // Use localStorage to persist profile data
  const [profileData, setProfileData] = useLocalStorage("nextgen-atm-profile", initialProfileData)
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(profileData)

  // Update formData when profileData changes
  useEffect(() => {
    setFormData(profileData)
  }, [profileData])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handlePreferenceChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          [field]: value,
        },
      },
    }))
  }

  const handleSave = () => {
    setProfileData(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(profileData)
    setIsEditing(false)
  }

  return (
    <DashboardShell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your personal information and preferences</p>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <Card className="w-full md:w-64 lg:w-80">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                <UserCircle className="w-16 h-16" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{profileData.email}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{profileData.phone}</p>
              {isEditing && (
                <Button className="mt-4 w-full" variant="outline">
                  Change Profile Picture
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="flex-1">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">
                  <User className="w-4 h-4 mr-2" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </TabsTrigger>
                <TabsTrigger value="preferences">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profileEmail">Email Address</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <Input
                          id="profileEmail"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="profilePhone">Phone Number</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <Input
                          id="profilePhone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Your address and contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={formData.address.street}
                        onChange={(e) => handleAddressChange("street", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.address.city}
                          onChange={(e) => handleAddressChange("city", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.address.state}
                          onChange={(e) => handleAddressChange("state", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.address.zipCode}
                          onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.address.country}
                          onChange={(e) => handleAddressChange("country", e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Notification Preferences</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="emailNotifications" className="flex items-center gap-2 cursor-pointer">
                            <Mail className="w-4 h-4 text-gray-500" />
                            <span>Email Notifications</span>
                          </Label>
                          <Switch
                            id="emailNotifications"
                            checked={formData.preferences.notifications.email}
                            onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="smsNotifications" className="flex items-center gap-2 cursor-pointer">
                            <MessageSquare className="w-4 h-4 text-gray-500" />
                            <span>SMS Notifications</span>
                          </Label>
                          <Switch
                            id="smsNotifications"
                            checked={formData.preferences.notifications.sms}
                            onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="pushNotifications" className="flex items-center gap-2 cursor-pointer">
                            <MessageSquare className="w-4 h-4 text-gray-500" />
                            <span>Push Notifications</span>
                          </Label>
                          <Switch
                            id="pushNotifications"
                            checked={formData.preferences.notifications.push}
                            onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Security Settings</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="twoFactorAuth" className="flex items-center gap-2 cursor-pointer">
                            <Key className="w-4 h-4 text-gray-500" />
                            <span>Two-Factor Authentication</span>
                          </Label>
                          <Switch
                            id="twoFactorAuth"
                            checked={formData.preferences.twoFactorAuth}
                            onCheckedChange={(checked) => handlePreferenceChange("twoFactorAuth", checked)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">App Preferences</h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <select
                              id="language"
                              value={formData.preferences.language}
                              onChange={(e) => handlePreferenceChange("language", e.target.value)}
                              className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                              disabled={!isEditing}
                            >
                              <option value="en">English</option>
                              <option value="es">Español</option>
                              <option value="fr">Français</option>
                              <option value="de">Deutsch</option>
                              <option value="zh">中文</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <select
                              id="currency"
                              value={formData.preferences.currency}
                              onChange={(e) => handlePreferenceChange("currency", e.target.value)}
                              className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                              disabled={!isEditing}
                            >
                              <option value="USD">USD ($)</option>
                              <option value="EUR">EUR (€)</option>
                              <option value="GBP">GBP (£)</option>
                              <option value="JPY">JPY (¥)</option>
                              <option value="CAD">CAD ($)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

