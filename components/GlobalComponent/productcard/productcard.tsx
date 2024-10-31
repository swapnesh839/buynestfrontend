"use client"
import Link from "next/link";
import dynamic from "next/dynamic";
import useHover from "@/hooks/useHover/useHover";
import React from "react";
const Hovermodelview = dynamic(() => import("../hovermodelview/hovermodelview"), { ssr: false });

interface ProductCard { id: number, name: string, price: number, rating: number, color: string, src: string }
const ProductCard = ({ product }: { product: ProductCard }) => {
    const { isHovering, hoverProps } = useHover({ delay: 900 })

    return (
        <Link style={{ textDecoration: "none" }} href={"/glview/78790"} className="w-full h-full">
            <div {...hoverProps} className="bg-white rounded-lg shadow-lg mt-1 p-4 z-10 text-center h-full">
                {/* <div
            style={{ backgroundColor: product.color }}
            className="rounded-full w-16 h-16 mx-auto mb-4"
        ></div> */}
                <div className='flex justify-center mb-2 items-center w-full aspect-square relative'>
                    {isHovering ?
                        <Hovermodelview id={1} />:
                        <div style={{ backgroundImage: `url(${product.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className='w-full max-w-[360px] md:max-w-[160px] aspect-square p-8 mb-7'></div>
                    }
                </div>
                {/* <Image src={headephone1} alt={product.name} width={200} height={200} className="w-full max-w-[200px] aspect-square p-4 rounded-s-full mb-4" /> */}
                <h3 className="font-bold text-sm text-gray-700">{product.name}</h3>
                <p className="text-gray-500">Price ${product.price.toFixed(2)}</p>
                <div className="flex items-center justify-center mt-2 text-green-500 font-semibold">
                    <span>★ {product.rating}</span>
                </div>
                <div className='flex items-center justify-center w-full mt-3'>
                    <button className='bg-[#0F766E] text-white px-3 py-1 rounded-md flex justify-center align-middle'>
                        <span>Add to cart</span>
                        {/* <span
                    className="h-4 ms-1 w-4 m-auto rounded-full text-white flex items-center justify-center"
                    aria-label="Add to cart"
                >
                    +
                </span> */}
                    </button>
                </div>
            </div>
        </Link>
    )
};

export default React.memo(ProductCard)