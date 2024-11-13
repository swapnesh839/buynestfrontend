import { Heart, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Summerheadphhones from "@/assets/Home/Summerheadphhones.png"

export default function ExplorePage() {
  const categories = [
    { name: "Headphones", icon: Summerheadphhones.src },
    { name: "Speakers", icon: Summerheadphhones.src },
    { name: "Earbuds", icon: Summerheadphhones.src },
    { name: "Accessories", icon: Summerheadphhones.src },
    { name: "Home Audio", icon: Summerheadphhones.src },
    { name: "DJ Equipment", icon: Summerheadphhones.src },
  ]

  const featuredProducts = [
    { id: 1, name: "Beatsflex Pro Wireless", price: 299.99, image: Summerheadphhones.src, rating: 4.8, reviews: 1024 },
    { id: 2, name: "Beatsflex Studio 3", price: 349.99, image: Summerheadphhones.src, rating: 4.7, reviews: 892 },
    { id: 3, name: "Beatsflex Solo Pro", price: 249.99, image: Summerheadphhones.src, rating: 4.6, reviews: 756 },
    { id: 4, name: "Beatsflex Pill+", price: 179.99, image: Summerheadphhones.src, rating: 4.5, reviews: 638 },
  ]

  const trendingProducts = [
    { id: 5, name: "Beatsflex Flex", price: 69.99, image: Summerheadphhones.src, rating: 4.4, reviews: 512 },
    { id: 6, name: "Beatsflex X", price: 299.99, image: Summerheadphhones.src, rating: 4.9, reviews: 1280 },
    { id: 7, name: "Beatsflex EP", price: 129.99, image: Summerheadphhones.src, rating: 4.3, reviews: 384 },
    { id: 8, name: "Beatsflex Powerbeats", price: 149.99, image: Summerheadphhones.src, rating: 4.6, reviews: 768 },
  ]

  return (
    <div className="p-3">
      <div className="min-h-screen bg-white p-2 shadow-md order rounded-md">
      {/* <header className="bg-[#00A19C] text-white p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Beatsflex
          </Link>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 bg-white text-gray-900"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/cart" className="text-white hover:text-gray-200">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link href="/profile" className="text-white hover:text-gray-200">
              My Account
            </Link>
          </nav>
        </div>
      </header> */}

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Explore Beatsflex</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={64}
                    height={64}
                    className="mb-2"
                  />
                  <span className="font-medium">{category.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <Link href="/products" className="text-[#00A19C] hover:underline">
              View all
            </Link>
          </div>
          <ScrollArea>
            <div className="flex space-x-4 pb-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <TrendingUp className="mr-2" /> Trending Now
            </h2>
            <Link href="/trending" className="text-[#00A19C] hover:underline">
              See more
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Explore Our Collections</h2>
          <Tabs defaultValue="new">
            <TabsList className="mb-4">
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
              <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
              <TabsTrigger value="sale">On Sale</TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="bestsellers">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="sale">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 2).concat(trendingProducts.slice(0, 2)).map((product) => (
                  <ProductCard key={product.id} product={product} isSale />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
    </div>
  )
}

// product: {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
//     rating: number;
//     reviews: number;
// }
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
}
  isSale?: boolean
}
function ProductCard({ product, isSale = false }:ProductCardProps) {
  return (
    <Card className=" flex flex-col">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          >
            <Heart className="h-5 w-5" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          {isSale && (
            <Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-[#00A19C] hover:bg-[#008B87]">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}