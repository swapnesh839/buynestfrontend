"use client"
import { useState } from 'react'
import { ChevronDown, ChevronUp, Download, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PurchaseHistoryPage() {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  return (
    <div className="bg-white p-3 border shadow rounded-md">
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

      <main className="">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Purchase History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center w-full sm:w-auto">
                <Input 
                  placeholder="Search orders" 
                  className="mr-2"
                />
                <Button className="bg-[#00B8A9] hover:bg-[#00A799] text-white">
                  Search
                </Button>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="30">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="180">Last 6 months</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <>
                    <TableRow key={order.id} className="cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
                          {expandedOrder === order.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedOrder === order.id && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Order Details</h4>
                            <ul className="space-y-2">
                              {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                  <span>{item.name}</span>
                                  <span>${item.price.toFixed(2)}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 flex justify-between">
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-1" /> Download Invoice
                              </Button>
                              <Button variant="outline" size="sm">Track Shipment</Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

const orders = [
  {
    id: "ORD-001",
    date: "2023-10-15",
    total: 299.99,
    status: "Delivered",
    items: [
      { name: "Wireless Headphones", price: 199.99 },
      { name: "Charging Case", price: 49.99 },
      { name: "Extended Warranty", price: 50.01 }
    ]
  },
  {
    id: "ORD-002",
    date: "2023-10-22",
    total: 159.99,
    status: "Shipped",
    items: [
      { name: "Bluetooth Speaker", price: 129.99 },
      { name: "Carrying Case", price: 30.00 }
    ]
  },
  {
    id: "ORD-003",
    date: "2023-10-28",
    total: 89.99,
    status: "Processing",
    items: [
      { name: "Earbuds", price: 79.99 },
      { name: "Silicone Tips Set", price: 10.00 }
    ]
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800'
    case 'Shipped':
      return 'bg-blue-100 text-blue-800'
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}