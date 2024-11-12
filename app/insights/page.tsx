'use client'

import React from 'react'
import { Bar, BarChart, Line, LineChart, Pie, PieChart } from "recharts"
import {  DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const salesData = [
  { day: 'Mon', sales: 120 },
  { day: 'Tue', sales: 190 },
  { day: 'Wed', sales: 130 },
  { day: 'Thu', sales: 150 },
  { day: 'Fri', sales: 220 },
  { day: 'Sat', sales: 300 },
  { day: 'Sun', sales: 190 },
]

const categoryData = [
  { category: 'Headphones', value: 300 },
  { category: 'Speakers', value: 200 },
  { category: 'Microphones', value: 150 },
  { category: 'Accessories', value: 100 },
]

const visitorData = [
  { day: 'Mon', visitors: 650 },
  { day: 'Tue', visitors: 590 },
  { day: 'Wed', visitors: 800 },
  { day: 'Thu', visitors: 810 },
  { day: 'Fri', visitors: 560 },
  { day: 'Sat', visitors: 550 },
  { day: 'Sun', visitors: 400 },
]

const recentOrders = [
  { id: '1234', customer: 'John Doe', product: 'Wireless Headphones', amount: 129.99, status: 'Shipped' },
  { id: '1235', customer: 'Jane Smith', product: 'Bluetooth Speaker', amount: 79.99, status: 'Processing' },
  { id: '1236', customer: 'Bob Johnson', product: 'Studio Microphone', amount: 199.99, status: 'Delivered' },
  { id: '1237', customer: 'Alice Brown', product: 'Audio Interface', amount: 149.99, status: 'Shipped' },
  { id: '1238', customer: 'Charlie Davis', product: 'DJ Controller', amount: 299.99, status: 'Processing' },
]

export default function EnhancedInsightsPage() {
  // const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Beatsflex Insights</h1>
        <div className="flex space-x-4">
          {/* <DatePickerWithRange date={dateRange} setDate={setDateRange} /> */}
          <Button variant="outline">
             Refresh
          </Button>
          <Button>
            <DownloadIcon className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={salesData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Value",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <PieChart data={categoryData}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie dataKey="value" nameKey="category" fill="var(--color-value)" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visitor Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              visitors: {
                label: "Visitors",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <LineChart data={visitorData}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="visitors" stroke="var(--color-visitors)" />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
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