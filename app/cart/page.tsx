"use client"
import { Calendar, Heart, Info, Lock, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function EnhancedCartPage() {
  const cartItems = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 129.99,
      quantity: 1,
      image: "/placeholder.svg",
      estimatedDelivery: "May 15 - May 20",
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 79.99,
      quantity: 2,
      image: "/placeholder.svg",
      estimatedDelivery: "May 14 - May 18",
    },
  ]

  const relatedProducts = [
    { id: 3, name: "Headphones Stand", price: 24.99, image: "/placeholder.svg" },
    { id: 4, name: "Portable Charger", price: 39.99, image: "/placeholder.svg" },
  ]

  const recentlyViewed = [
    { id: 5, name: "Wireless Mouse", price: 29.99, image: "/placeholder.svg" },
    { id: 6, name: "Laptop Sleeve", price: 19.99, image: "/placeholder.svg" },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 9.99
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="p-3">
      <main className="bg-white grid gap-3 p-3 rounded border shadow">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="grid row-span-12 gap-3">
          <Card className="grid-cols-12">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" />
                          <div>
                            <span className="font-medium">{item.name}</span>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-4 w-4 " />
                              Estimated delivery: {item.estimatedDelivery}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            className="w-16 text-center"
                            min={1}
                            onChange={() => { }}
                          />
                          <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove from cart</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Save for later</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <Label htmlFor="cart-note">Add a note to your order</Label>
                <Textarea id="cart-note" placeholder="Special instructions for your order" className="mt-2" />
              </div>
            </CardFooter>
          </Card>
          <Card className="grid-cols-12">
            <CardHeader>
              <CardTitle>Related Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {relatedProducts.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4">
                    <Image src={product.image} alt={product.name} width={64} height={64} className="rounded-md" />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="grid-cols-12">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="">
                <Label>Shipping Options</Label>
                <RadioGroup defaultValue="standard" className="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Shipping (3-5 business days)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express Shipping (1-2 business days) +$15.00</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gift" id="gift" />
                    <Label htmlFor="gift">Add gift wrapping (+$5.00)</Label>
                  </div>
                </RadioGroup>
              </div>
              {/* <div className="">
                <div className="flex items-center space-x-2">
                  <Checkbox id="gift" />
                  <Label htmlFor="gift">Add gift wrapping (+$5.00)</Label>
                </div>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">
                <ShoppingCart className="mr-2 h-4 w-4" /> Proceed to Checkout
              </Button>
              <div className="flex justify-center space-x-4">
                <Badge variant="outline" className="text-xs">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure Checkout
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Info className="h-3 w-3 mr-1" />
                  30-Day Returns
                </Badge>
              </div>
            </CardFooter>
          </Card>
          <Card className="grid-cols-12">
            <CardHeader>
              <CardTitle>Have a promo code?</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex space-x-2">
                <Input placeholder="Enter promo code" />
                <Button type="submit" variant="outline">
                  Apply
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="grid-cols-12">
            <CardHeader>
              <CardTitle>Recently Viewed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {recentlyViewed.map((product) => (
                  <div key={product.id} className="text-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="rounded-md mx-auto"
                    />
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

    </div>
  )
}