import { Camera, DollarSign, HelpCircle, Upload, Search, MoreVertical } from "lucide-react"
import Image from "next/image"
// import Link from "next/link"
import Summerheadphhones from "@/assets/Home/Summerheadphhones.png"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function SellingPage() {
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports & Outdoors",
    "Toys & Games",
    "Books",
    "Beauty & Personal Care",
  ]

  const recentListings = [
    { id: 1, name: "Wireless Headphones", price: 89.99, status: "Active", sales: 12 },
    { id: 2, name: "Smart Watch", price: 199.99, status: "Pending Review", sales: 0 },
    { id: 3, name: "Bluetooth Speaker", price: 59.99, status: "Active", sales: 8 },
  ]

  const pastProducts = [
    { id: 1, name: "Wireless Earbuds", price: 79.99, dateAdded: "2024-03-15", status: "Active", image: Summerheadphhones.src, description: "High-quality wireless earbuds with noise cancellation." },
    { id: 2, name: "Portable Charger", price: 39.99, dateAdded: "2024-03-10", status: "Sold Out", image: Summerheadphhones.src, description: "10000mAh portable charger with fast charging capability." },
    { id: 3, name: "Smart Home Hub", price: 129.99, dateAdded: "2024-03-05", status: "Active", image: Summerheadphhones.src, description: "Central hub for controlling all your smart home devices." },
    { id: 4, name: "Fitness Tracker", price: 49.99, dateAdded: "2024-02-28", status: "Inactive", image: Summerheadphhones.src, description: "Track your steps, heart rate, and sleep patterns." },
    { id: 5, name: "Noise-Cancelling Headphones", price: 199.99, dateAdded: "2024-02-20", status: "Active", image: Summerheadphhones.src, description: "Over-ear headphones with advanced noise cancellation technology." },
  ]

  return (
    <div className="min-h-screen p-3">
      <main className="border shadow rounded p-3 bg-white">
        <h1 className="text-3xl font-bold mb-8">Sell on Beatsflex</h1>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>List a New Product</CardTitle>
                <CardDescription>Fill out the details below to list your product for sale.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="product-name">Product Name</Label>
                    <Input id="product-name" placeholder="Enter product name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-description">Product Description</Label>
                    <Textarea id="product-description" placeholder="Describe your product" />
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="product-price">Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input id="product-price" type="number" step="0.01" min="0" className="pl-8" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-quantity">Quantity</Label>
                      <Input id="product-quantity" type="number" min="1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product-category">Category</Label>
                    <Select>
                      <SelectTrigger id="product-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase().replace(" & ", "-")}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Product Images</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Button variant="outline" className="w-full h-32">
                          <div className="flex flex-col items-center">
                            <Upload className="h-8 w-8 mb-2" />
                            <span>Upload Image</span>
                          </div>
                        </Button>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Button variant="outline" className="w-full h-32">
                          <div className="flex flex-col items-center">
                            <Camera className="h-8 w-8 mb-2" />
                            <span>Take Photo</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">List Product</Button>
              </CardFooter>
            </Card>
          </div>
          <div className="grid grid-cols-1 auto-rows-min gap-3">
            <Card className="h-auto">
              <CardHeader>
                <CardTitle>Selling Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use high-quality photos</li>
                  <li>Write detailed descriptions</li>
                  <li>Set competitive prices</li>
                  <li>Offer fast shipping</li>
                  <li>Provide excellent customer service</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="h-auto">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-[#00A19C]" />
                  <span>Visit our Seller Help Center</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Separator className="my-8" />
        <h2 className="text-2xl font-bold mb-4">Your Recent Listings</h2>
        <Card>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="sold">Sold</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-2">Product</th>
                      <th className="text-left py-2">Price</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Sales</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentListings.map((listing) => (
                      <tr key={listing.id} className="border-t">
                        <td className="py-2">{listing.name}</td>
                        <td className="py-2">${listing.price.toFixed(2)}</td>
                        <td className="py-2">{listing.status}</td>
                        <td className="py-2">{listing.sales}</td>
                        <td className="py-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TabsContent>
              <TabsContent value="pending">
                <p>You have no pending listings.</p>
              </TabsContent>
              <TabsContent value="sold">
                <p>Your sold items will appear here.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Separator className="my-8" />
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Your Product Catalog</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input placeholder="Search products" className="pl-10 w-64" />
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-added">Date Added</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>${product.price.toFixed(2)}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Archive</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span>Added: {product.dateAdded}</span>
                  <Badge
                    variant={product.status === 'Active' ? 'default' : 'secondary'}
                  >
                    {product.status}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">
                  {product.status === 'Active' ? 'Edit Listing' : 'Relist'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      </main>
    </div>
  )
}