"use client";
import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Product} from "@/app/types/product.model";
import Image from "next/image";
import {StarRating} from "react-flexible-star-rating";
import {Heart, ShoppingCart, ZoomIn} from "lucide-react";
import Link from "next/link";
import {addToCart} from "@/actions/cart.action";
import toast from "react-hot-toast";
import {useCart} from "@/app/context/CartContext";
import {addToWishlist, removeFromWishlist} from "@/actions/wishlist.action";
import {useWishlist} from "@/app/context/WishlistContext";

export default function ProductCard({product}: { product: Product }) {

    const {fetchCart} = useCart();
    const {wishlist, fetchWishlist} = useWishlist();

    async function handleAddToCart(productId: string) {
        try {
            const response = await addToCart(productId);
            toast.success("Product added successfully to your cart");
            await fetchCart();
            return response;
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    async function handleAddToWishlist(productId: string) {
        try {
            const response = await addToWishlist(productId);
            toast.success("Product added successfully to your wishlist");
            await fetchWishlist()
            return response;
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    async function handleRemoveFromWishlist(productId: string) {
        try {
            const response = await removeFromWishlist(productId);
            toast.success("Product removed successfully from your wishlist");
            await fetchWishlist()
            return response;
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <Card className={`relative group overflow-hidden`}>
                <div
                    className={`flex flex-col absolute z-20 top-[150px] right-[-100px] group-hover:right-[10px] transition-all duration-500`}>
                    <button onClick={() => {
                        handleAddToCart(product._id);
                    }} className="p-2 text-black bg-slate-200 hover:text-[#717fe0] cursor-pointer z">
                        <ShoppingCart/>
                    </button>
                    <button onClick={() => {
                        if (wishlist?.data?.some((item) => item._id === product._id)) {
                            handleRemoveFromWishlist(product._id);
                        } else {
                            handleAddToWishlist(product._id);
                        }
                    }} className="p-2 text-black bg-slate-200 hover:text-[#717fe0] cursor-pointer z">
                        <Heart fill={wishlist?.data?.some((item) => item._id === product._id) ? "#717fe0" : "none"}
                               className={wishlist?.data?.some((item) => item._id === product._id) ? "text-[#717fe0]" : ""}
                        />
                    </button>
                    <button className="p-2 text-black bg-slate-200 hover:text-[#717fe0] cursor-pointer z">
                        <Link href={`/products/${product._id}`}>
                            <ZoomIn/>
                        </Link>
                    </button>
                </div>
                <CardContent>
                    <div className="relative w-full h-[300px]">
                        <Image src={product.imageCover} alt={product.title} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25vw" priority loading={"eager"}
                               className="object-cover"/>
                    </div>
                </CardContent>
                <CardHeader>
                    <CardTitle>{product.title.split(" ").slice(0, 2).join(" ")}</CardTitle>
                    {/*<CardDescription>{product.description.split(" ").slice(0, 4).join(" ")}</CardDescription>*/}
                </CardHeader>
                <CardFooter className={`flex-col items-start`}>
                    <h2 className="text-lg font-bold"><span>{product.price}</span> EGP</h2>
                    {/*<StarRating initialRating={Math.floor(product.ratingsAverage)} dimension={7}*/}
                    {/*            isHalfRatingEnabled={true}/>*/}
                </CardFooter>
            </Card>
        </>
    );
}
