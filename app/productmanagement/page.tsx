"use client"
import React, { useState } from 'react'
import { Plus, Search, Edit, Trash2, MoreVertical, ArrowUpDown, AlertTriangle, Package, DollarSign, Star, Download, Upload, Tag, Zap, Activity, RefreshCw } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, Line, Tooltip, PieChart, Pie, Cell } from 'recharts'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  sales: number
  rating: number
  performanceScore: number
  variants: string[]
  tags: string[]
}

const mockProducts: Product[] = [
  { id: 'P001', name: 'Wireless Headphones', category: 'Audio', price: 199.99, stock: 50, sales: 120, rating: 4.5, performanceScore: 85, variants: ['Black', 'White', 'Rose Gold'], tags: ['wireless', 'noise-cancelling'] },
  { id: 'P002', name: 'Bluetooth Speaker', category: 'Audio', price: 89.99, stock: 30, sales: 75, rating: 4.2, performanceScore: 72, variants: ['Black', 'Blue'], tags: ['portable', 'waterproof'] },
  { id: 'P003', name: 'Smartwatch', category: 'Wearables', price: 159.98, stock: 25, sales: 60, rating: 4.0, performanceScore: 68, variants: ['Black', 'Silver'], tags: ['fitness', 'heart-rate-monitor'] },
  { id: 'P004', name: 'Fitness Tracker', category: 'Wearables', price: 49.99, stock: 100, sales: 200, rating: 4.3, performanceScore: 78, variants: ['Black', 'Blue', 'Pink'], tags: ['sleep-tracking', 'waterproof'] },
  { id: 'P005', name: 'Wireless Earbuds', category: 'Audio', price: 129.99, stock: 40, sales: 150, rating: 4.7, performanceScore: 90, variants: ['White', 'Black'], tags: ['true-wireless', 'touch-control'] },
]

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
]

const seasonalTrendData = [
  { name: 'Spring', value: 400 },
  { name: 'Summer', value: 300 },
  { name: 'Fall', value: 500 },
  { name: 'Winter', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function EnhancedSellerProductManagement() {
  const [products] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: 'ascending' | 'descending' } | null>(null)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleSort = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedProducts = React.useMemo(() => {
    const sortableProducts = [...products]
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableProducts
  }, [products, sortConfig])

  const filteredProducts = sortedProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || product.category === categoryFilter)
  )

  const topSellingProducts = [...products].sort((a, b) => b.sales - a.sales).slice(0, 5)

  const totalRevenue = products.reduce((sum, product) => sum + product.price * product.sales, 0)
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0)
  const lowStockProducts = products.filter(product => product.stock < 10).length

  const handleBulkAction = (e:string) => {
    console.log(e);
    setSelectedProducts([])
  }

  const handleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  // const handleSelectAllProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     setSelectedProducts(filteredProducts.map(p => p.id))
  //   } else {
  //     setSelectedProducts([])
  //   }
  // }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      
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
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">Products below 10 units</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#00A19C" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topSellingProducts}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="sales" fill="#00A19C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Seasonal Trends</CardTitle>
          <CardDescription>Product performance across seasons</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={seasonalTrendData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {seasonalTrendData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Manage your product inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Wearables">Wearables</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#00A19C] hover:bg-[#008B87]">
                    <Plus className="mr-2 h-4 w-4" /> Add New Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new product here. Click save when you&appos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  {/* Add product form would go here */}
                  <DialogFooter>
                    <Button type="submit">Save Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Bulk Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => handleBulkAction('Update Price')}>Update Price</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleBulkAction('Update Stock')}>Update Stock</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() =>   handleBulkAction('Delete')}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Import
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedProducts.length === filteredProducts.length}
                    // onCheckedChange={handleSelectAllProducts}
                  />
                </TableHead>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('price')}>
                  Price
                  {sortConfig?.key === 'price' && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('stock')}>
                  Stock
                  {sortConfig?.key === 'stock' && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => handleSort('sales')}>
                  Sales
                  {sortConfig?.key === 'sales' && (
                    <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                  )}
                </TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Performance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => handleProductSelection(product.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {product.stock}
                    {product.stock < 10 && (
                      <Badge variant="destructive" className="ml-2">Low</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{product.sales}</TableCell>
                  <TableCell className="text-right">
                    {product.rating} <Star className="h-4 w-4 inline text-yellow-400" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Progress value={product.performanceScore} className="w-[60px] inline-block mr-2" />
                    {product.performanceScore}%
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" /> Update Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Tag className="mr-2 h-4 w-4" /> Manage Tags
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Zap className="mr-2 h-4 w-4" /> Boost Listing
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Forecast</CardTitle>
            <CardDescription>Predicted stock levels for the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={[
                { day: 1, stock: 100 },
                { day: 15, stock: 75 },
                { day: 30, stock: 50 },
              ]}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stock" stroke="#00A19C" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">
              <RefreshCw className="mr-2 h-4 w-4" /> Update Forecast
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pricing Strategy</CardTitle>
            <CardDescription>Suggested price adjustments based on market trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {products.slice(0, 3).map(product => (
                <li key={product.id} className="flex justify-between items-center">
                  <span>{product.name}</span>
                  <span className="font-semibold text-green-500">+5% ↑</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">
              <Activity className="mr-2 h-4 w-4" /> View All Suggestions
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Reviews</CardTitle>
          <CardDescription>Recent customer feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {products.slice(0, 3).map(product => (
              <li key={product.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-500">Great product, love the sound quality!</p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Reviews</Button>
        </CardFooter>
      </Card>
    </div>
  )
}