"use client"

import { useState } from "react"
import { Layout } from "../../../components/layout"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../../components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../../../components/ui/tabs"
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Switch } from "../../../components/ui/switch"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../../components/ui/select"
import { Slider } from "../../../components/ui/slider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Bell, Lock, Globe, Eye, Smartphone, Fingerprint, Accessibility } from 'lucide-react'

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  securityAlerts: z.boolean().default(true),
})

const securityFormSchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  biometricLogin: z.boolean().default(true),
  loginNotifications: z.boolean().default(true),
  sessionTimeout: z.string().default("30"),
})

const appearanceFormSchema = z.object({
  language: z.string().default("en"),
  theme: z.string().default("system"),
  fontSize: z.array(z.number()).default([16]),
  highContrast: z.boolean().default(false),
  reducedMotion: z.boolean().default(false),
})

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications")

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      marketingEmails: false,
      securityAlerts: true,
    },
  })

  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      twoFactorAuth: false,
      biometricLogin: true,
      loginNotifications: true,
      sessionTimeout: "30",
    },
  })

  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      language: "en",
      theme: "system",
      fontSize: [16],
      highContrast: false,
      reducedMotion: false,
    },
  })

  function onNotificationSubmit(data: z.infer<typeof notificationFormSchema>) {
    console.log(data)
    // In a real app, this would save the notification settings
  }

  function onSecuritySubmit(data: z.infer<typeof securityFormSchema>) {
    console.log(data)
    // In a real app, this would save the security settings
  }

  function onAppearanceSubmit(data: z.infer<typeof appearanceFormSchema>) {
    console.log(data)
    // In a real app, this would save the appearance settings
  }

  return (
    <Layout>
      <div className="flex flex-col space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance">
              <Eye className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Notification Preferences</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Choose how you want to be notified about account activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationForm}>
                  <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">Email Notifications</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Receive notifications via email
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">Push Notifications</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Receive notifications on your device
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="smsNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">SMS Notifications</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Receive notifications via text message
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">Marketing Emails</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Receive emails about new features and offers
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationForm.control}
                      name="securityAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">Security Alerts</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Receive alerts about suspicious activity
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Notification Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Security Settings</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Manage your account security preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...securityForm}>
                  <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                    <FormField
                      control={securityForm.control}
                      name="twoFactorAuth"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <div className="flex items-center">
                              <FormLabel className="text-base text-gray-900 dark:text-white">Two-Factor Authentication</FormLabel>
                              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Recommended
                              </span>
                            </div>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Add an extra layer of security to your account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="biometricLogin"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">Biometric Login</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Use fingerprint or face recognition to log in
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="loginNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">Login Notifications</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Get notified when someone logs into your account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={securityForm.control}
                      name="sessionTimeout"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base text-gray-900 dark:text-white">Session Timeout (minutes)</FormLabel>
                          <FormDescription className="text-gray-500 dark:text-gray-400">
                            Automatically log out after a period of inactivity
                          </FormDescription>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                                <SelectValue placeholder="Select timeout duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5">5 minutes</SelectItem>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="never">Never</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Security Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Appearance Settings</CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Customize how the application looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...appearanceForm}>
                  <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                    <FormField
                      control={appearanceForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base text-gray-900 dark:text-white">Language</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                              <SelectItem value="zh">中文</SelectItem>
                              <SelectItem value="ja">日本語</SelectItem>
                              <SelectItem value="ar">العربية</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base text-gray-900 dark:text-white">Theme</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                                <SelectValue placeholder="Select theme" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="fontSize"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base text-gray-900 dark:text-white">Font Size: {field.value}px</FormLabel>
                          <FormControl>
                            <Slider
                              min={12}
                              max={24}
                              step={1}
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="highContrast"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">High Contrast</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Increase contrast for better visibility
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={appearanceForm.control}
                      name="reducedMotion"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base text-gray-900 dark:text-white">Reduced Motion</FormLabel>
                            <FormDescription className="text-gray-500 dark:text-gray-400">
                              Minimize animations and transitions
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save Appearance Settings</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
