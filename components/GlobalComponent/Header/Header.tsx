'use client'

import { Bell, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  return (
    <header className="w-full sticky z-40 top-0 py-4 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900">Smart Accessories</h1>
          <p className="ml-1 text-sm text-gray-500">From top brands</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="bg-[#00a7a7] hover:bg-[#0bbfbf] text-bold hover:text-white text-white">Become a Seller</Button>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-2">
                  <h3 className="font-medium">Messages</h3>
                  <p className="text-sm text-gray-500">You have no new messages.</p>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Notifications</h4>
                    <Button variant="ghost" className="text-xs">Mark all as read</Button>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue-500 w-2 h-2 mt-2" />
                      <div>
                        <p className="text-sm font-medium">New product available</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue-500 w-2 h-2 mt-2" />
                      <div>
                        <p className="text-sm font-medium">Your order has been shipped</p>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Button variant="ghost" className="w-full justify-start">Profile</Button>
                    <Button variant="ghost" className="w-full justify-start">Settings</Button>
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  )
}