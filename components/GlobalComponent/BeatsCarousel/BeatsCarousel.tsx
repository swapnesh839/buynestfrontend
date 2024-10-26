'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, Plus } from "lucide-react"
import Image from "next/image"

// Sample product data
const products = [
  { id: 1, name: "Original Beats Solo Pro", price: 333.20, rating: 4.9, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Beats Studio3 Bluetooth", price: 119.88, rating: 5.0, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Beats Solo3 Wireless", price: 199.95, rating: 4.8, image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Beats Solo Pro", price: 169.99, rating: 5.0, image: "/placeholder.svg?height=200&width=200" },
]

export default function BeatsCarousel() {
  return (
    <Carousel className="w-full max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const [isAdded, setIsAdded] = React.useState(false)

  const handleAddToCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000) 
  }

  return (
    <Card className="w-[200px] mx-auto">
      <CardContent className="flex flex-col items-center p-4">
        <Image width={200} height={200} src={product.image} alt={product.name} className="w-full h-auto mb-4" />
        <h3 className="font-semibold text-sm mb-1 text-center">{product.name}</h3>
        <p className="text-sm mb-2">Price ${product.price.toFixed(2)}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className={`rounded-full p-1 transition-colors ${
            isAdded ? 'bg-green-500 text-white' : 'bg-teal-500 text-white hover:bg-teal-600'
          }`}
          disabled={isAdded}
        >
          <Plus className="w-6 h-6" />
        </button>
      </CardContent>
    </Card>
  )
}