"use client"
import React, { useState } from 'react'
import { Search, MoreVertical, AlertTriangle, CheckCircle, Edit, Eye, RefreshCw, Upload } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
// import { toast } from "@/components/ui/use-toast"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Pagination } from "@/components/ui/pagination";

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Changes Requested' | 'Rejected'
  lastUpdated: string
  adminFeedback?: string
}

const mockProducts: Product[] = [
  { id: 'PRD001', name: 'Wireless Earbuds', category: 'Audio', price: 79.99, stock: 100, status: 'Approved', lastUpdated: '2023-11-01' },
  { id: 'PRD002', name: 'Smart Watch', category: 'Wearables', price: 199.99, stock: 50, status: 'Pending Approval', lastUpdated: '2023-11-02' },
  { id: 'PRD003', name: 'Bluetooth Speaker', category: 'Audio', price: 59.99, stock: 75, status: 'Changes Requested', lastUpdated: '2023-11-03', adminFeedback: 'Please provide more detailed product specifications.' },
  { id: 'PRD004', name: 'Noise-Cancelling Headphones', category: 'Audio', price: 249.99, stock: 30, status: 'Rejected', lastUpdated: '2023-11-04', adminFeedback: 'Product does not meet our quality standards.' },
  { id: 'PRD005', name: 'Fitness Tracker', category: 'Wearables', price: 89.99, stock: 120, status: 'Draft', lastUpdated: '2023-11-05' },
]

export default function SellerProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [currentPage] = useState(1)
  const productsPerPage = 10

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === 'all' || product.category === categoryFilter) &&
    (statusFilter === 'all' || product.status === statusFilter)
  )

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const handleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const handleSelectAllProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedProducts(currentProducts.map(p => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleBulkAction = (action: 'Delete' | 'Mark as Draft') => {
    setSelectedProducts([])
    alert(action)
  }

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )
    setSelectedProduct(null)
    setEditMode(false)
  }

  const handleProductSubmit = (productId: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, status: 'Pending Approval', lastUpdated: new Date().toISOString().split('T')[0] }
          : product
      )
    )
  }

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'Draft':
        return <Badge variant="secondary">Draft</Badge>
      case 'Pending Approval':
        return <Badge variant="outline">Pending Approval</Badge>
      case 'Approved':
        return <Badge variant="secondary">Approved</Badge>
      case 'Changes Requested':
        return <Badge variant="outline">Changes Requested</Badge>
      case 'Rejected':
        return <Badge variant="destructive">Rejected</Badge>
    }
  }

  const draftCount = products.filter(p => p.status === 'Draft').length
  const pendingCount = products.filter(p => p.status === 'Pending Approval').length
  const changesRequestedCount = products.filter(p => p.status === 'Changes Requested').length
  const approvedCount = products.filter(p => p.status === 'Approved').length

  return (
    <div className="container mx-auto p-3">
      <div className='p-3 bg-white rounded-md shadow-md border'>
        <h1 className="text-3xl font-bold mb-6">Seller Product Management</h1>

        <div className="grid gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Products</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftCount}</div>
              <p className="text-xs text-muted-foreground">Ready to submit</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting admin review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Changes Requested</CardTitle>
              <RefreshCw className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{changesRequestedCount}</div>
              <p className="text-xs text-muted-foreground">Require updates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Products</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedCount}</div>
              <p className="text-xs text-muted-foreground">Live on the platform</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>Manage and update your product listings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="changes">Changes Requested</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <ProductTable
                  products={currentProducts}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  categoryFilter={categoryFilter}
                  setCategoryFilter={setCategoryFilter}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  selectedProducts={selectedProducts}
                  handleProductSelection={handleProductSelection}
                  handleSelectAllProducts={handleSelectAllProducts}
                  handleBulkAction={handleBulkAction}
                  setSelectedProduct={setSelectedProduct}
                  handleProductSubmit={handleProductSubmit}
                  getStatusBadge={getStatusBadge}
                />
              </TabsContent>
              {/* Repeat similar TabsContent for other tabs, filtering products by status */}
            </Tabs>
            <div className="mt-4 flex justify-center">
              {/* <Pagination
              totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
              onPageChange={setCurrentPage}
            /> */}
            </div>
          </CardContent>
        </Card>

        <Dialog open={!!selectedProduct} onOpenChange={() => { setSelectedProduct(null); setEditMode(false); }}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit Product' : 'Product Details'}</DialogTitle>
              <DialogDescription>
                {editMode ? 'Make changes to your product here.' : 'Review your product details and admin feedback.'}
              </DialogDescription>
            </DialogHeader>
            {selectedProduct && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right font-bold">Name:</label>
                  {editMode ? (
                    <Input
                      id="name"
                      value={selectedProduct.name}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                      className="col-span-3"
                    />
                  ) : (
                    <span className="col-span-3">{selectedProduct.name}</span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="category" className="text-right font-bold">Category:</label>
                  {editMode ? (
                    <Select
                      value={selectedProduct.category}
                      onValueChange={(value) => setSelectedProduct({ ...selectedProduct, category: value })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Audio">Audio</SelectItem>
                        <SelectItem value="Wearables">Wearables</SelectItem>
                        {/* Add more categories as needed */}
                      </SelectContent>
                    </Select>
                  ) : (
                    <span className="col-span-3">{selectedProduct.category}</span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="price" className="text-right font-bold">Price:</label>
                  {editMode ? (
                    <Input
                      id="price"
                      type="number"
                      value={selectedProduct.price}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
                      className="col-span-3"
                    />
                  ) : (
                    <span className="col-span-3">${selectedProduct.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="stock" className="text-right font-bold">Stock:</label>
                  {editMode ? (
                    <Input
                      id="stock"
                      type="number"
                      value={selectedProduct.stock}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) })}
                      className="col-span-3"
                    />
                  ) : (
                    <span className="col-span-3">{selectedProduct.stock}</span>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right  font-bold">Status:</span>
                  <span className="col-span-3">{getStatusBadge(selectedProduct.status)}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-bold">Last Updated:</span>
                  <span className="col-span-3">{selectedProduct.lastUpdated}</span>
                </div>
                {selectedProduct.adminFeedback && (
                  <div className="grid grid-cols-4 items-start gap-4">
                    <span className="text-right font-bold">Admin Feedback:</span>
                    <p className="col-span-3 text-sm text-muted-foreground">{selectedProduct.adminFeedback}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter className="sm:justify-start">
              {editMode ? (
                <>
                  <Button
                    type="button"
                    onClick={() => handleProductUpdate(selectedProduct!)}
                    className="bg-[#00A19C] hover:bg-[#008B87] text-white"
                  >
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={() => setEditMode(true)}
                    className="bg-[#00A19C] hover:bg-[#008B87] text-white"
                  >
                    Edit Product
                  </Button>
                  {selectedProduct?.status !== 'Approved' && (
                    <Button
                      type="button"
                      onClick={() => handleProductSubmit(selectedProduct!.id)}
                      variant="outline"
                    >
                      Submit for Approval
                    </Button>
                  )}
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

interface ProductTableProps {
  products: Product[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  selectedProducts: string[]
  handleProductSelection: (productId: string) => void
  handleSelectAllProducts: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBulkAction: (action: 'Delete' | 'Mark as Draft') => void
  setSelectedProduct: (product: Product | null) => void
  handleProductSubmit: (productId: string) => void
  getStatusBadge: (status: Product['status']) => React.ReactNode
}

function ProductTable({
  products,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  selectedProducts,
  handleProductSelection,
  handleBulkAction,
  setSelectedProduct,
  handleProductSubmit,
  getStatusBadge
}: ProductTableProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-full md:w-[300px]"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Wearables">Wearables</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Pending Approval">Pending Approval</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Changes Requested">Changes Requested</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-1 p-2 w-full ">
          <Button className=" bg-[#00A19C] hover:bg-[#008B87]">
             Add Product
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="">Bulk Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => handleBulkAction('Delete')}>Delete Selected</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => handleBulkAction('Mark as Draft')}>Mark as Draft</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedProducts.length === products.length}
                //   onCheckedChange={handleSelectAllProducts}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
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
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>{getStatusBadge(product.status)}</TableCell>
                <TableCell>{product.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => setSelectedProduct(product)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedProduct(product)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Product
                      </DropdownMenuItem>
                      {product.status !== 'Approved' && (
                        <DropdownMenuItem onSelect={() => handleProductSubmit(product.id)}>
                          <Upload className="mr-2 h-4 w-4" /> Submit for Approval
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}