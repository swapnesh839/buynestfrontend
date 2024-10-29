"use client"
import { useState } from 'react'
import { Globe, CreditCard, Smartphone, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="p-3">
      {/* <header className="bg-[#00B8A9] shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white mr-2 text-2xl">🎧</span>
            <h1 className="text-2xl font-bold text-white">Beatsflex.</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="bg-white text-[#00B8A9] hover:bg-gray-100">Become a Seller</Button>
            <Mail className="w-6 h-6 text-white" />
            <Bell className="w-6 h-6 text-white" />
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>
      </header> */}

      <main className="bg-white p-3 border shadow rounded-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Settings</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="johndoe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="marketing">Receive marketing emails</Label>
                  <Switch id="marketing" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00B8A9] hover:bg-[#00A799] text-white">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your privacy and security preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-visibility">Profile visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger id="profile-visibility" className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-factor authentication</Label>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-sharing">Data sharing with partners</Label>
                  <Switch id="data-sharing" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00B8A9] hover:bg-[#00A799] text-white">Update Privacy Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Customize how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email notifications</Label>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push notifications</Label>
                  <Switch id="push-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="order-updates">Order updates</Label>
                  <Switch id="order-updates" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="promotional">Promotional offers</Label>
                  <Switch id="promotional" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00B8A9] hover:bg-[#00A799] text-white">Save Notification Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options and billing information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center">
                    <CreditCard className="w-6 h-6 mr-2 text-[#00B8A9]" />
                    <span>Visa ending in 4242</span>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center">
                    <CreditCard className="w-6 h-6 mr-2 text-[#00B8A9]" />
                    <span>Mastercard ending in 5555</span>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <Button className="w-full">Add New Payment Method</Button>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00B8A9] hover:bg-[#00A799] text-white">Update Billing Address</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
                <CardDescription>Manage devices connected to your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center">
                    <Smartphone className="w-6 h-6 mr-2 text-[#00B8A9]" />
                    <div>
                      <p className="font-medium">iPhone 12</p>
                      <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
                <div className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-[#00B8A9]" />
                    <div>
                      <p className="font-medium">Chrome - Windows</p>
                      <p className="text-sm text-gray-500">Last active: 1 day ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00B8A9] hover:bg-[#00A799] text-white">Manage All Devices</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex">
          <Button variant="destructive" className="ml-auto min-w-20">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out of All Devices
          </Button>
        </div>
      </main>
    </div>
  )
}