"use client"
import React, { useState } from 'react'
import { Send, PlusCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Supportdesk() {
    const [activeChat, setActiveChat] = useState<string | null>(null)
    const [chatMessage, setChatMessage] = useState('')

    const chats = [
        { id: '1', name: 'John Doe', message: 'I need help with my order', time: '5m ago', unread: true },
        { id: '2', name: 'Jane Smith', message: 'How do I return an item?', time: '15m ago', unread: false },
        { id: '3', name: 'Bob Johnson', message: 'My payment failed', time: '1h ago', unread: true },
    ]

    const tickets = [
        { id: '1', subject: 'Defective product', status: 'Open', priority: 'High', created: '2023-10-31' },
        { id: '2', subject: 'Shipping delay', status: 'In Progress', priority: 'Medium', created: '2023-10-30' },
        { id: '3', subject: 'Refund request', status: 'Closed', priority: 'Low', created: '2023-10-29' },
    ]

    const faqs = [
        { id: '1', question: 'How long does shipping take?', answer: 'Shipping typically takes 3-5 business days.' },
        { id: '2', question: 'What is your return policy?', answer: 'We offer a 30-day return policy for all items.' },
        { id: '3', question: 'Do you offer international shipping?', answer: 'Yes, we ship to most countries worldwide.' },
    ]

    const handleSendMessage = () => {
        if (chatMessage.trim()) {
            // Here you would typically send the message to the backend
            console.log('Sending message:', chatMessage)
            setChatMessage('')
        }
    }

    return (
        <div className=' p-3'>
            <div className="p-3 shadow border bg-white rounded">
                <h1 className="text-3xl font-bold mb-6">Support Dashboard</h1>
                <div className="grid grid-cols-1 gap-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Customer Support</CardTitle>
                            <CardDescription>Manage chats, tickets, and FAQs</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="chats">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="chats">Live Chats</TabsTrigger>
                                    <TabsTrigger value="tickets">Tickets</TabsTrigger>
                                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
                                </TabsList>
                                <TabsContent value="chats">
                                    <div className="grid grid-cols-3 gap-4 h-[400px]">
                                        <Card className="col-span-1">
                                            <CardHeader>
                                                <CardTitle>Active Chats</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ScrollArea className="h-[300px]">
                                                    {chats.map((chat) => (
                                                        <div
                                                            key={chat.id}
                                                            className={`flex items-center space-x-4 p-2 hover:bg-gray-100 cursor-pointer ${activeChat === chat.id ? 'bg-gray-100' : ''
                                                                }`}
                                                            onClick={() => setActiveChat(chat.id)}
                                                        >
                                                            <Avatar>
                                                                <AvatarFallback>{chat.name[0]}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                                                                <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                                                            </div>
                                                            <div className="flex flex-col items-end">
                                                                <p className="text-xs text-gray-400">{chat.time}</p>
                                                                {chat.unread && <Badge variant="destructive">New</Badge>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </ScrollArea>
                                            </CardContent>
                                        </Card>
                                        <Card className="col-span-2">
                                            <CardHeader>
                                                <CardTitle>Chat</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <ScrollArea className="h-[240px] mb-4">
                                                    {/* Chat messages would go here */}
                                                </ScrollArea>
                                                <div className="flex space-x-2">
                                                    <Input
                                                        placeholder="Type your message..."
                                                        value={chatMessage}
                                                        onChange={(e) => setChatMessage(e.target.value)}
                                                    />
                                                    <Button onClick={handleSendMessage} className="bg-[#00A19C] hover:bg-[#008B87]">
                                                        <Send className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                                <TabsContent value="tickets">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>ID</TableHead>
                                                <TableHead>Subject</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Priority</TableHead>
                                                <TableHead>Created</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {tickets.map((ticket) => (
                                                <TableRow key={ticket.id}>
                                                    <TableCell>{ticket.id}</TableCell>
                                                    <TableCell>{ticket.subject}</TableCell>
                                                    <TableCell>{ticket.status}</TableCell>
                                                    <TableCell>{ticket.priority}</TableCell>
                                                    <TableCell>{ticket.created}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TabsContent>
                                <TabsContent value="faqs">
                                    <div className="space-y-4">
                                        {faqs.map((faq) => (
                                            <Card key={faq.id}>
                                                <CardHeader>
                                                    <CardTitle>{faq.question}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p>{faq.answer}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">
                                            <PlusCircle className="mr-2 h-4 w-4" /> Add New FAQ
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                    {/* <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#00A19C]">15</p>
                  <p className="text-sm text-gray-500">Open Tickets</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#00A19C]">3</p>
                  <p className="text-sm text-gray-500">Active Chats</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#00A19C]">95%</p>
                  <p className="text-sm text-gray-500">Resolution Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#00A19C]">4.8</p>
                  <p className="text-sm text-gray-500">Avg. Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Input placeholder="Search knowledge base..." />
                <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div> */}
                </div>
            </div>
        </div>
    )
}