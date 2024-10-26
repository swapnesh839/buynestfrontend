'use client'

import { useState } from 'react'
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import headephone1 from "@/assets/Home/headephone1.png"
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const colorOptions = [
    { name: 'Blue', class: 'bg-blue-500', activeclass:"ring-blue-500" },
    { name: 'Teal', class: 'bg-teal-500', activeclass:"ring-teal-500" },
    { name: 'Pink', class: 'bg-pink-500', activeclass:"ring-pink-500" },
    { name: 'Green', class: 'bg-green-500', activeclass:"ring-green-500" },
]

interface StarRatingProps {
    rating: number;
    maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    return (
        <Rating style={{ maxWidth: "90px" }} value={rating} readOnly />
    );
};

export default function HomesectiononeCard() {
    const [quantity, setQuantity] = useState(1)
    const [selectedColor, setSelectedColor] = useState(colorOptions[1])
    const rating = 4.7; // Example rating

    return (
        <Card className="w-full max-w-4xl overflow-hidden">
            <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-row">
                    <div className="w-2/5 flex items-center justify-center">
                        <Image
                            width={400}
                            height={400}
                            src={headephone1}
                            alt="Beats Studio3 Wireless Headphone"
                            className="inset-0 w-full aspect-square object-contain"
                        />
                    </div>
                    <div className="w-3/5 space-y-2 sm:space-y-3 md:space-y-4">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">Beats Studio3 Wireless Headphone</h2>
                        <div className="flex align-middle">
                            <StarRating rating={rating} />
                            <span className="text-xs sm:text-sm text-gray-500">
                                ({rating.toFixed(1)}) (2000+ Reviews)
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">
                            Ergonomic ear cups with on-ear controls. Up to 22 hours of listening time. Apple W1 chip & Class 1 Wireless Bluetooth.
                        </p>
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-teal-600">Price $349.95</p>
                        <div>
                            {/* <p className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Color</p> */}
                            <div className="flex space-x-2 justify-between align-middle">
                                <div className='flex space-x-2 my-auto'>
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.name}
                                            className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${color.class} ${selectedColor.name === color.name ? "ring-2 ring-offset-2" : ""} ${color.activeclass}`}
                                            onClick={() => setSelectedColor(color)}
                                            aria-label={`Select ${color.name} color`}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center space-x-2 sm:space-x-4 my-auto">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 sm:h-10 sm:w-10"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </Button>
                                    <span className="text-base sm:text-lg font-semibold">{quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 sm:h-10 sm:w-10"
                                        onClick={() => setQuantity(quantity + 1)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2 sm:space-x-4">
                            <Button variant="outline" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" aria-label="Add to wishlist">
                                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                            <Button variant="outline" className="flex-1 text-xs sm:text-sm">Add to cart</Button>
                            <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-xs sm:text-sm">Buy now</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}