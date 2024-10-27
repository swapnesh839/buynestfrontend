"use client"
import React, { useState } from 'react'
import {Plus, CreditCard, Edit, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal-info")

  return (
    <div className="flex">
      <main className="flex-1 ">
        <div className=" mx-auto p-3">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-6 mb-4">
              <div className="relative">
                {/* <Image width={100} height={100} src="/placeholder.svg" alt="Profile" className="w-24 h-24 rounded-full" /> */}
                <Avatar className="cursor-pointer w-32 h-32">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-[#00B8A9] text-white p-1 rounded-full">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-semibold">John Doe</h3>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="personal-info">
                <Card>
                  <CardHeader>
                    <CardTitle className='text-3xl font-bold text-gray-900 mb-6'>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-[#00B8A9] hover:bg-[#00A799]">Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and manage your orders.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <OrderItem
                        id="ORD-001"
                        date="2023-05-15"
                        status="Delivered"
                        total="$129.99"
                      />
                      <OrderItem
                        id="ORD-002"
                        date="2023-06-02"
                        status="Processing"
                        total="$79.99"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payment">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <PaymentMethod
                      type="Visa"
                      last4="4242"
                      expiry="12/24"
                    />
                    <PaymentMethod
                      type="Mastercard"
                      last4="5555"
                      expiry="09/25"
                    />
                    <Button className="w-full bg-[#00B8A9] hover:bg-[#00A799]">
                      <Plus className="w-4 h-4 mr-2" /> Add New Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Receive email updates about your account activity</p>
                      </div>
                      <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="destructive">Delete Account</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}


function OrderItem({ id, date, status, total }: { id: string, date: string, status: string, total: string }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <h4 className="font-semibold">{id}</h4>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${status === 'Delivered' ? 'text-green-600' : 'text-orange-600'}`}>{status}</p>
        <p className="text-sm">{total}</p>
      </div>
    </div>
  )
}

function PaymentMethod({ type, last4, expiry }: { type: string, last4: string, expiry: string }) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <CreditCard className="w-8 h-8 text-[#00B8A9]" />
        <div>
          <h4 className="font-semibold">{type} ending in {last4}</h4>
          <p className="text-sm text-gray-500">Expires {expiry}</p>
        </div>
      </div>
      <Button variant="ghost" size="sm">
        <Edit className="w-4 h-4" />
      </Button>
    </div>
  )
}