"use client"
import React, { useState } from 'react'
import { Heart, ShoppingCart, Trash2, ChevronLeft, Star, Share2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell,  TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import Summerheadphhones from "@/assets/Home/Summerheadphhones.png"
export default function SavedItemsPage() {
  const [savedItems, setSavedItems] = useState([
    { id: 1, name: "Beatsflex Pro Wireless", price: 299.99, image: Summerheadphhones.src, inStock: true, discount: 10, quantity: 1, color: "Black", estimatedDelivery: "2-3 business days" },
    { id: 2, name: "Beatsflex Studio 3", price: 349.99, image: Summerheadphhones.src, inStock: true, discount: 0, quantity: 1, color: "Red", estimatedDelivery: "3-5 business days" },
    { id: 3, name: "Beatsflex Solo Pro", price: 249.99, image: Summerheadphhones.src, inStock: false, discount: 0, quantity: 1, color: "White", estimatedDelivery: "Out of stock" },
    { id: 4, name: "Beatsflex Pill+", price: 179.99, image: Summerheadphhones.src, inStock: true, discount: 15, quantity: 1, color: "Blue", estimatedDelivery: "1-2 business days" },
  ])

  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [sortOption, setSortOption] = useState("newest")
  const [showOutOfStock, setShowOutOfStock] = useState(true)

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === savedItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(savedItems.filter(item => item.inStock || showOutOfStock).map(item => item.id))
    }
  }

  const handleRemoveItem = (id: number) => {
    setSavedItems(prev => prev.filter(item => item.id !== id))
    setSelectedItems(prev => prev.filter(item => item !== id))
    // toast({
    //   title: "Item removed",
    //   description: "The item has been removed from your saved items.",
    // })
  }

  // const handleMoveToCart = () => {
  //   In a real app, this would call an API to add items to the cart
  //   toast({
  //     title: "Items added to cart",
  //     description: `${ids.length} item(s) have been added to your cart.`,
  //   })
  // }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setSavedItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const handleSort = (option: string) => {
    setSortOption(option)
    const sortedItems = [...savedItems]
    switch (option) {
      case "price-low-high":
        sortedItems.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        sortedItems.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // Assuming the current order is from newest to oldest
        break
      default:
        break
    }
    setSavedItems(sortedItems)
  }

  const filteredItems = showOutOfStock ? savedItems : savedItems.filter(item => item.inStock)

  const recommendedProducts = [
    { id: 5, name: "Beatsflex AirPods Pro", price: 249.99, image: Summerheadphhones.src, rating: 4.8 },
    { id: 6, name: "Beatsflex HomePod Mini", price: 99.99, image: Summerheadphhones.src, rating: 4.6 },
    { id: 7, name: "Beatsflex Sport Earbuds", price: 179.99, image: Summerheadphhones.src, rating: 4.7 },
    { id: 8, name: "Beatsflex Soundbar", price: 399.99, image: Summerheadphhones.src, rating: 4.9 },
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Saved Items</h1>

      {savedItems.length > 0 ? (
        <>
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id="select-all"
                    checked={selectedItems.length === filteredItems.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <Label htmlFor="select-all" className="font-medium">
                    Select All ({filteredItems.length} items)
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-out-of-stock"
                      checked={showOutOfStock}
                      onCheckedChange={setShowOutOfStock}
                    />
                    <Label htmlFor="show-out-of-stock">Show out of stock items</Label>
                  </div>
                </div>
                <Select value={sortOption} onValueChange={handleSort}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="w-[50px]">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleSelectItem(item.id)}
                          disabled={!item.inStock}
                        />
                      </TableCell>
                      <TableCell className="w-[100px]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Color: {item.color}</p>
                        <p className="text-sm text-gray-500">
                          {item.inStock ? (
                            <span className="text-green-600">In Stock - {item.estimatedDelivery}</span>
                          ) : (
                            <span className="text-red-600">Out of Stock</span>
                          )}
                        </p>
                      </TableCell>
                      <TableCell className="min-w-[200px]">
                        {item.discount > 0 ? (
                          <div>
                            <span className="text-lg font-bold text-red-600">
                              ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${item.price.toFixed(2)}
                            </span>
                            <Badge className="ml-2 bg-red-100 text-red-800">
                              {item.discount}% OFF
                            </Badge>
                          </div>
                        ) : (
                          <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.quantity.toString()}
                          onValueChange={(value) => handleQuantityChange(item.id, parseInt(value))}
                          disabled={!item.inStock}
                        >
                          <SelectTrigger className="w-[80px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  // onClick={() => handleMoveToCart([item.id])}
                                  disabled={!item.inStock}
                                >
                                  <ShoppingCart className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Add to Cart</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Share</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Remove</p>
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
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/explore">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              <Button
                className="bg-[#00A19C] hover:bg-[#008B87]"
                // onClick={() => handleMoveToCart(selectedItems)}
                disabled={selectedItems.length === 0}
              >
                Add Selected to Cart ({selectedItems.length})
              </Button>
            </CardFooter>
          </Card>

          <h2 className="text-2xl font-bold mb-4">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="relative aspect-square mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your Saved Items list is empty</h2>
            <p className="text-gray-600 mb-4">Start adding items you love to your wishlist</p>
            <Button asChild className="bg-[#00A19C] hover:bg-[#008B87]">
              <Link href="/explore">
                Explore Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog>
        
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-8">
            <AlertCircle className="h-4 w-4 mr-2" />
            Learn about Saved Items
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>About Saved Items</DialogTitle>
            <DialogDescription>
              Saved Items allows you to keep track of products your&appos;e interested in. You can add them to your cart later or share them with friends. Items in your list will be saved for 60 days.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}