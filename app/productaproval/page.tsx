"use client"
import React, { useState } from 'react'
import { Search,  Package, AlertTriangle, XCircle,Eye, RefreshCw } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Product {
  id: string
  name: string
  seller: string
  category: string
  price: number
  status: 'Pending' | 'Changes Requested' | 'Rejected'
  submittedDate: string
}

const mockProducts: Product[] = [
  { id: 'PRD001', name: 'Wireless Earbuds', seller: 'TechGear', category: 'Audio', price: 79.99, status: 'Pending', submittedDate: '2023-11-01' },
  { id: 'PRD002', name: 'Smart Watch', seller: 'WearableTech', category: 'Wearables', price: 199.99, status: 'Pending', submittedDate: '2023-11-02' },
  { id: 'PRD003', name: 'Bluetooth Speaker', seller: 'SoundMasters', category: 'Audio', price: 59.99, status: 'Changes Requested', submittedDate: '2023-11-03' },
  { id: 'PRD004', name: 'Noise-Cancelling Headphones', seller: 'AudioPro', category: 'Audio', price: 249.99, status: 'Rejected', submittedDate: '2023-11-04' },
  { id: 'PRD005', name: 'Fitness Tracker', seller: 'HealthTech', category: 'Wearables', price: 89.99, status: 'Pending', submittedDate: '2023-11-05' },
]

export default function AdminProductApproval() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [adminFeedback, setAdminFeedback] = useState('')

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || product.category === categoryFilter)
  )

  const handleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSelectAllProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(filteredProducts.map(p => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleBulkAction = (action: 'Approve' | 'Request Changes' | 'Reject') => {
    alert(action)
    setSelectedProducts([])
  }

  const handleProductAction = (productId: string, action: 'Approve' | 'Request Changes' | 'Reject') => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId
          ? { ...product, status: action === 'Approve' ? 'Pending' : action === 'Request Changes' ? 'Changes Requested' : 'Rejected' }
          : product
      )
    )
    setSelectedProduct(null)
    setAdminFeedback('')
  }

  const pendingCount = products.filter(p => p.status === 'Pending').length
  const changesRequestedCount = products.filter(p => p.status === 'Changes Requested').length
  const rejectedCount = products.filter(p => p.status === 'Rejected').length

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Product Approval Dashboard</h1>
      
      <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Changes Requested</CardTitle>
            <RefreshCw className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{changesRequestedCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting seller updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Products</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedCount}</div>
            <p className="text-xs text-muted-foreground">Not meeting standards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Product Approval Queue</CardTitle>
          <CardDescription>Review and manage product submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="changes">Changes Requested</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <ProductTable 
                products={products.filter(p => p.status === 'Pending')}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                selectedProducts={selectedProducts}
                handleProductSelection={handleProductSelection}
                handleSelectAllProducts={handleSelectAllProducts}
                handleBulkAction={handleBulkAction}
                setSelectedProduct={setSelectedProduct}
              />
            </TabsContent>
            <TabsContent value="changes">
              <ProductTable 
                products={products.filter(p => p.status === 'Changes Requested')}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                selectedProducts={selectedProducts}
                handleProductSelection={handleProductSelection}
                handleSelectAllProducts={handleSelectAllProducts}
                handleBulkAction={handleBulkAction}
                setSelectedProduct={setSelectedProduct}
              />
            </TabsContent>
            <TabsContent value="rejected">
              <ProductTable 
                products={products.filter(p => p.status === 'Rejected')}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                selectedProducts={selectedProducts}
                handleProductSelection={handleProductSelection}
                handleSelectAllProducts={handleSelectAllProducts}
                handleBulkAction={handleBulkAction}
                setSelectedProduct={setSelectedProduct}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Product Review</DialogTitle>
            <DialogDescription>
              Review and take action on this product submission
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Product:</span>
              <span className="col-span-3">{selectedProduct?.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Seller:</span>
              <span className="col-span-3">{selectedProduct?.seller}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Category:</span>
              <span className="col-span-3">{selectedProduct?.category}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Price:</span>
              <span className="col-span-3">${selectedProduct?.price.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Status:</span>
              <span className="col-span-3">{selectedProduct?.status}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-bold">Submitted:</span>
              <span className="col-span-3">{selectedProduct?.submittedDate}</span>
            </div>
            <Textarea
              placeholder="Enter feedback or reasons for rejection here..."
              value={adminFeedback}
              onChange={(e) => setAdminFeedback(e.target.value)}
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="secondary"
              onClick={() => selectedProduct && handleProductAction(selectedProduct.id, 'Approve')}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Approve
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => selectedProduct && handleProductAction(selectedProduct.id, 'Request Changes')}
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Request Changes
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => selectedProduct && handleProductAction(selectedProduct.id, 'Reject')}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface ProductTableProps {
  products: Product[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  selectedProducts: string[]
  handleProductSelection: (productId: string) => void
  handleSelectAllProducts: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBulkAction: (action: 'Approve' | 'Request Changes' | 'Reject') => void
  setSelectedProduct: (product: Product | null) => void
}

function ProductTable({
  products,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  selectedProducts,
  handleProductSelection,
//   handleSelectAllProducts,
  handleBulkAction,
  setSelectedProduct
}: ProductTableProps) {
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || product.category === categoryFilter)
  )

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4  text-muted-foreground" />
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Bulk Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleBulkAction('Approve')}>Approve Selected</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleBulkAction('Request Changes')}>Request Changes</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleBulkAction('Reject')}>Reject Selected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedProducts.length === filteredProducts.length}
                // onCheckedChange={(e)=>{handleSelectAllProducts()}}
              />
            </TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Seller</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead>Submitted Date</TableHead>
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
              <TableCell>{product.seller}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.submittedDate}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setSelectedProduct(product)}>
                  <span className="sr-only">Open menu</span>
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}