import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Summerheadphhones from "@/assets/Home/headephone1.png"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Product {
  name: string
  price: number
  reviews: number
  orders: number
  image: string
}

const products: Product[] = [
  {
    name: "beats new studio blue headset",
    price: 320,
    reviews: 256,
    orders: 1528,
    image: Summerheadphhones.src
  },
  {
    name: "beats pro wireless Headset",
    price: 199,
    reviews: 205,
    orders: 1906,
    image: Summerheadphhones.src
  },
  {
    name: "Apple AirPods Pro",
    price: 249,
    reviews: 991,
    orders: 8682,
    image: Summerheadphhones.src
  },
  {
    name: "Lenovo Wired Headphone",
    price: 95,
    reviews: 364,
    orders: 2791,
    image: Summerheadphhones.src
  },
  {
    name: "Logic3 Cavallino T250 Headset",
    price: 100,
    reviews: 128,
    orders: 850,
    image: Summerheadphhones.src
  },
  {
    name: "Musicians Choice Stereo",
    price: 22,
    reviews: 116,
    orders: 640,
    image: Summerheadphhones.src
  }
]

export default function SummerHeadphesones() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold text-teal-700">Daily Deals</CardTitle>
        <Button variant="link" className="text-sm text-gray-500 font-normal">
          View all
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full">
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li key={index} className="flex items-center space-x-4">
              <Image
                width={100}
                height={100}
                src={product.image}
                alt={product.name}
                className="w-11 aspect-square p-1 rounded-full object-cover bg-slate-400/30"
              />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{product.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{product.reviews} Reviews</span>
                  <span className="mx-2">•</span>
                  <span>{product.orders} orders</span>
                </div>
              </div>
              <div className="text-sm font-medium">Price ${product.price}</div>
            </li>
          ))}
        </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}