"use client"
import React, { useState } from 'react'
import { Bell, ShoppingCart, Tag, Package, Trash2, Edit,  Calendar as CalendarIcon } from 'lucide-react'
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type NotificationType = 'cart' | 'offer' | 'order' | 'other'

interface Notification {
  id: string
  type: NotificationType
  message: string
  scheduledDate: Date
  targetGroup: string
}

export default function AdminNotificationsManagement() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'cart', message: 'Don\'t forget items in your cart!', scheduledDate: new Date(), targetGroup: 'all' },
    { id: '2', type: 'offer', message: 'Flash Sale! 50% off on all headphones', scheduledDate: new Date(Date.now() + 86400000), targetGroup: 'premium' },
    { id: '3', type: 'order', message: 'Free shipping on orders over $50', scheduledDate: new Date(Date.now() + 172800000), targetGroup: 'all' },
  ])

  const [newNotification, setNewNotification] = useState<Omit<Notification, 'id'>>({
    type: 'other',
    message: '',
    scheduledDate: new Date(),
    targetGroup: 'all'
  })

  const [editingNotification, setEditingNotification] = useState<Notification | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewNotification(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewNotification(prev => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setNewNotification(prev => ({ ...prev, scheduledDate: date }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingNotification) {
      setNotifications(notifications.map(n => n.id === editingNotification.id ? { ...editingNotification, ...newNotification } : n))
      setEditingNotification(null)
    } else {
      const id = Math.random().toString(36).substr(2, 9)
      setNotifications([...notifications, { id, ...newNotification }])
    }
    setNewNotification({
      type: 'other',
      message: '',
      scheduledDate: new Date(),
      targetGroup: 'all'
    })
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const editNotification = (notification: Notification) => {
    setEditingNotification(notification)
    setNewNotification(notification)
  }

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'cart': return <ShoppingCart className="h-5 w-5 text-[#00A19C]" />
      case 'offer': return <Tag className="h-5 w-5 text-[#00A19C]" />
      case 'order': return <Package className="h-5 w-5 text-[#00A19C]" />
      default: return <Bell className="h-5 w-5 text-[#00A19C]" />
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Notifications Management</CardTitle>
          <CardDescription>Create and manage notifications for your users</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <Select name="type" value={newNotification.type} onValueChange={(value) => handleSelectChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cart">Cart Reminder</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="order">Order Update</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="targetGroup" className="block text-sm font-medium text-gray-700 mb-1">Target Group</label>
                <Select name="targetGroup" value={newNotification.targetGroup} onValueChange={(value) => handleSelectChange('targetGroup', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="premium">Premium Users</SelectItem>
                    <SelectItem value="new">New Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <Textarea
                id="message"
                name="message"
                value={newNotification.message}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full"
                placeholder="Enter notification message"
              />
            </div>
            <div>
              <label htmlFor="scheduledDate" className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!newNotification.scheduledDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newNotification.scheduledDate ? format(newNotification.scheduledDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newNotification.scheduledDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Button type="submit" className="bg-[#00A19C] hover:bg-[#008B87]">
              {editingNotification ? 'Update Notification' : 'Create Notification'}
            </Button>
          </form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Scheduled Date</TableHead>
                <TableHead>Target Group</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell>{getIcon(notification.type)}</TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>{format(notification.scheduledDate, "PPP")}</TableCell>
                  <TableCell>{notification.targetGroup}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => editNotification(notification)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you sure you want to delete this notification?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will permanently delete the notification.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => deleteNotification(notification.id)}>
                              Yes, delete notification
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}