"use client"
import React, { useState } from 'react'
import {
    Search, MoreVertical, ArrowUpDown,  DollarSign,
    TrendingUp
    , AlertTriangle, ShoppingCart
} from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, Line, Tooltip } from 'recharts'

interface Order {
    id: string
    date: string
    customer: string
    total: number
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
    items: { name: string; quantity: number; price: number }[]
}

const mockOrders: Order[] = [
    { id: 'ORD001', date: '2023-11-01', customer: 'John Doe', total: 299.99, status: 'Delivered', items: [{ name: 'Wireless Headphones', quantity: 1, price: 199.99 }, { name: 'Phone Case', quantity: 2, price: 49.99 }] },
    { id: 'ORD002', date: '2023-11-02', customer: 'Jane Smith', total: 89.99, status: 'Processing', items: [{ name: 'Bluetooth Speaker', quantity: 1, price: 89.99 }] },
    { id: 'ORD003', date: '2023-11-03', customer: 'Bob Johnson', total: 159.98, status: 'Shipped', items: [{ name: 'Smartwatch', quantity: 1, price: 159.98 }] },
    { id: 'ORD004', date: '2023-11-04', customer: 'Alice Brown', total: 49.99, status: 'Pending', items: [{ name: 'Fitness Tracker', quantity: 1, price: 49.99 }] },
    { id: 'ORD005', date: '2023-11-05', customer: 'Charlie Wilson', total: 129.99, status: 'Cancelled', items: [{ name: 'Wireless Earbuds', quantity: 1, price: 129.99 }] },
]

const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 4500 },
    { name: 'Fri', sales: 6000 },
    { name: 'Sat', sales: 5500 },
    { name: 'Sun', sales: 4800 },
]

const topProducts = [
    { name: 'Wireless Headphones', sales: 120 },
    { name: 'Bluetooth Speaker', sales: 95 },
    { name: 'Smartwatch', sales: 80 },
    { name: 'Fitness Tracker', sales: 75 },
    { name: 'Wireless Earbuds', sales: 70 },
]

export default function SellerOrderManagement() {
    const [orders, setOrders] = useState<Order[]>(mockOrders)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: 'ascending' | 'descending' } | null>(null)
    const [selectedOrders, setSelectedOrders] = useState<string[]>([])
    const [currentPage] = useState(1)
    const ordersPerPage = 5

    const handleSort = (key: keyof Order) => {
        let direction: 'ascending' | 'descending' = 'ascending'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const sortedOrders = React.useMemo(() => {
        const sortableOrders = [...orders]
        if (sortConfig !== null) {
            sortableOrders.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortableOrders
    }, [orders, sortConfig])

    const filteredOrders = sortedOrders.filter(order =>
        (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || order.status === statusFilter)
    )

    const indexOfLastOrder = currentPage * ordersPerPage
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

    const handleOrderSelection = (orderId: string) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        )
    }

    // const handleSelectAllOrders = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.checked) {
    //         setSelectedOrders(currentOrders.map(o => o.id))
    //     } else {
    //         setSelectedOrders([])
    //     }
    // }

    //   const handleBulkAction = (action: string) => {
    //     alert(action)
    //     setSelectedOrders([])
    //   }

    const handleStatusUpdate = (orderId: string, newStatus: Order['status']) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        )
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    const pendingOrders = orders.filter(order => order.status === 'Pending').length

    const getStatusBadge = (status: Order['status']) => {
        switch (status) {
            case 'Pending':
                return <Badge variant="secondary">Pending</Badge>
            case 'Processing':
                return <Badge variant="secondary" className="bg-blue-500">Processing</Badge>
            case 'Shipped':
                return <Badge variant="secondary" className="bg-yellow-500">Shipped</Badge>
            case 'Delivered':
                return <Badge variant="secondary" className="bg-green-500">Delivered</Badge>
            case 'Cancelled':
                return <Badge variant="destructive">Cancelled</Badge>
        }
    }

    return (
        <div className="container mx-auto p-3">
            <div className='p-4 bg-white'>
            <h1 className="text-3xl font-bold mb-6">Order Management</h1>

<div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Action required</p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Seller</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">Wireless Headphones</div>
            <p className="text-xs text-muted-foreground">Best-selling product</p>
        </CardContent>
    </Card>
</div>

<div className="flex items-center gap-2 mb-6">
    <Input placeholder="Search orders..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
    <Select onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
    </Select>
    <Button><Search className="w-4 h-4 mr-2" />Search</Button>
</div>

<Table>
    <TableHeader>
        <TableRow>
            <TableHead><Checkbox checked={selectedOrders.length === currentOrders.length}  /></TableHead>
            <TableHead onClick={() => handleSort('id')}>Order ID <ArrowUpDown /></TableHead>
            <TableHead onClick={() => handleSort('date')}>Date <ArrowUpDown /></TableHead>
            <TableHead>Customer</TableHead>
            <TableHead onClick={() => handleSort('total')}>Total <ArrowUpDown /></TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {currentOrders.map(order => (
            <TableRow key={order.id}>
                <TableCell><Checkbox checked={selectedOrders.includes(order.id)} onCheckedChange={() => handleOrderSelection(order.id)} /></TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0"><span className="sr-only">Open menu</span><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'Processing')}>Mark as Processing</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'Shipped')}>Mark as Shipped</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'Delivered')}>Mark as Delivered</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, 'Cancelled')} className="text-red-600">Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <Card>
        <CardHeader><CardTitle>Sales Trend</CardTitle></CardHeader>
        <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="sales" stroke="#8884d8" /></LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
    <Card>
        <CardHeader><CardTitle>Top Selling Products</CardTitle></CardHeader>
        <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="sales" fill="#82ca9d" /></BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
</div>
            </div>
        </div>
    )
}
