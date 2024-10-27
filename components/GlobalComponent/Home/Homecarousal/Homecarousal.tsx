"use client";
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import headephone1 from "@/assets/Home/headephone1.png"
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import Image from 'next/image';

const responsive = {
    xl: { breakpoint: { max: 3000, min: 2000 }, items: 4 },
    lg: { breakpoint: { max: 2000, min: 1500 }, items: 3 },
    desktop: { breakpoint: { max: 1500, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const products = [
    { id: 1, name: 'Original Beats Solo Pro', price: 333.20, rating: 4.9, color: '#007AFF' },
    { id: 2, name: 'Beats Studio3 Bluetooth', price: 119.88, rating: 5.0, color: '#00C4CC' },
    { id: 3, name: 'Beats Solo3 Wireless', price: 199.95, rating: 4.8, color: '#333333' },
    { id: 4, name: 'Beats Solo3', price: 169.99, rating: 5.0, color: '#00C4CC' },
    { id: 4, name: 'Beats Solo3', price: 169.99, rating: 5.0, color: '#00C4CC' },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => (
    <div className="bg-white rounded-lg shadow-lg p-4 z-10 text-center h-full">
        {/* <div
            style={{ backgroundColor: product.color }}
            className="rounded-full w-16 h-16 mx-auto mb-4"
        ></div> */}
        <div className='flex justify-center items-center'>
            <div style={{ backgroundImage: `url(${headephone1.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='w-full max-w-[160px] aspect-square p-8 mb-7 rounded-s-full'></div>
        </div>
        {/* <Image src={headephone1} alt={product.name} width={200} height={200} className="w-full max-w-[200px] aspect-square p-4 rounded-s-full mb-4" /> */}
        <h3 className="font-bold text-sm text-gray-700">{product.name}</h3>
        <p className="text-gray-500">Price ${product.price.toFixed(2)}</p>
        <div className="flex items-center justify-center mt-2 text-green-500 font-semibold">
            <span>★ {product.rating}</span>
            <button
                className="h-4 ms-1 w-4 rounded-full bg-green-500 text-white flex items-center justify-center"
                aria-label="Add to cart"
            >
                +
            </button>
        </div>
    </div>
);

const Homecarousal = () => (
    <div className='w-full p-3 bg-white mt-3 rounded-lg border'>
        <h3 className='text-xl font-bold text-teal-700 my-4 ps-1'>Popular Headphones We Have</h3>
        <Carousel
            responsive={responsive}
            infinite={true}
            // customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="p-2"
            dotListClass="custom-dot-list-style"
            showDots={false}
        // arrows={false}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </Carousel>
        <div className='flex w-full mt-3'>
            <Button variant="link" className="text-sm text-gray-500 font-normal ml-auto">
                Explore More
                <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
        </div>
        {/* <h6 className='text-teal-700 font-bold hover:underline mt-5 flex justify-center align-middle ms-auto'>Explore More <ArrowRight size={13} /> </h6> */}
    </div>
);

export default Homecarousal;
