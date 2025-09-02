"use client";
import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Product} from "@/app/types/product.model";
import Image from "next/image";
import {StarRating} from "react-flexible-star-rating";
import {Heart, ShoppingCart, ZoomIn} from "lucide-react";
import Link from "next/link";

export default function ProductCard({product}: { product: Product }) {
    return (
        <>
            <Card className={`relative group overflow-hidden`}>
                <div
                    className={`flex flex-col absolute z-20 top-[150px] right-[-100px] group-hover:right-[10px] transition-all duration-500`}>
                    <button className="p-2 text-black bg-slate-200 hover:text-blue-700 cursor-pointer z">
                        <ShoppingCart/>
                    </button>
                    <button className="p-2 text-black bg-slate-200 hover:text-blue-700 cursor-pointer z">
                        <Heart/>
                    </button>
                    <button className="p-2 text-black bg-slate-200 hover:text-blue-700 cursor-pointer z">
                        <Link href={`/products/${product._id}`}>
                            <ZoomIn/>
                        </Link>
                    </button>

                </div>
                <CardHeader>
                    <CardTitle>{product.title.split(" ").slice(0, 2).join(" ")}</CardTitle>
                    <CardDescription>{product.description.split(" ").slice(0, 4).join(" ")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full h-[300px]">
                        <Image src={product.imageCover} alt={product.title} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25vw" priority loading={"eager"}
                               className="object-cover"/>
                    </div>
                </CardContent>
                <CardFooter className={`flex-col items-start`}>
                    <h2 className="text-lg font-bold">Price: <span>{product.price}</span> EGP</h2>
                    <StarRating initialRating={Math.floor(product.ratingsAverage)} dimension={10}
                                isHalfRatingEnabled={true}/>
                </CardFooter>
            </Card>
        </>
    );
}
