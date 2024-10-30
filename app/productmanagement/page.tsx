"use client"
import { useState } from 'react'
import { Plus, Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminProductManagement() {
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  interface editingProduct {
    id:number
    name:string,
    sku:string,
    category:string,
    price:number,
    stock:number,
    status:"Active"|"Out of Stock"
  }

  const products:editingProduct[] = [
    { id: 1, name: "Beatsflex Pro Wireless", sku: "BF-001", category: "Headphones", price: 299.99, stock: 50, status: "Active" },
    { id: 2, name: "Beatsflex Studio 3", sku: "BF-002", category: "Headphones", price: 349.99, stock: 30, status: "Active" },
    { id: 3, name: "Beatsflex Solo Pro", sku: "BF-003", category: "Headphones", price: 249.99, stock: 0, status: "Out of Stock" },
    { id: 4, name: "Beatsflex Pill+", sku: "BF-004", category: "Speakers", price: 179.99, stock: 100, status: "Active" },
    { id: 5, name: "Beatsflex Flex", sku: "BF-005", category: "Earbuds", price: 69.99, stock: 200, status: "Active" },
  ]

  const categories = ["Headphones", "Speakers", "Earbuds", "Accessories"]

  return (
    <div className="p-3">
      <main className="bg-white p-3 shadow border rounded-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Product Management</h2>
          <Button onClick={() => setIsAddingProduct(true)} className="bg-[#00A19C] hover:bg-[#008B87]">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Input placeholder="Search products" className="w-64" />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox id="select-all" />
                  </TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox id={`select-product-${product.id}`} />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge className='text-center' variant={product.status === "Active" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {/* <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product)}>
                        <Edit className="h-4 w-4" />
                      </Button> */}
                      
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {(isAddingProduct || editingProduct) && (
          <Card>
            <CardHeader>
              <CardTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-sku">SKU</Label>
                    <Input id="product-sku" placeholder="Enter SKU" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Select >
                      <SelectTrigger id="product-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-price">Price</Label>
                    <Input id="product-price" type="number" placeholder="Enter price" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-stock">Stock</Label>
                    <Input id="product-stock" type="number" placeholder="Enter stock quantity" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-status">Status</Label>
                    <Select>
                      <SelectTrigger id="product-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea id="product-description" placeholder="Enter product description" />
                </div>
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Button variant="outline" className="w-full h-32">
                        <div className="flex flex-col items-center">
                          <Plus className="h-8 w-8 mb-2" />
                          <span>Add Image</span>
                        </div>
                      </Button>
                    </div>
                    {editingProduct && (
                      <div className="relative aspect-square">
                        <Image
                          src="/placeholder.svg"
                          alt="Product image"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => {
                    setIsAddingProduct(false)
                    setEditingProduct(null)
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#00A19C] hover:bg-[#008B87]">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}