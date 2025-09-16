"use client";
import React from 'react';
import {Product} from "@/app/types/product.model";
import Image from "next/image";
import {addToCart} from "@/actions/cart.action";
import toast from "react-hot-toast";
import {useCart} from "@/app/context/CartContext";
import {addToWishlist, removeFromWishlist} from "@/actions/wishlist.action";
import {useWishlist} from "@/app/context/WishlistContext";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import {Heart} from "lucide-react";
import {getUserToken} from "@/lib/token.utils";

export default function ProductCard({product}: { product: Product }) {

    const {fetchCart} = useCart();
    const {wishlist, fetchWishlist} = useWishlist();

    async function handleAddToCart(productId: string) {
        try {
            const token = await getUserToken();
            if (!token) {
                toast.error("You need to login to add products to your cart. Please login to continue");
                return;
            }
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
            const token = await getUserToken();
            if (!token) {
                toast.error("You need to login to add products to your wishlist. Please login to continue");
                return;
            }
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
            const token = await getUserToken();
            if (!token) {
                toast.error("You need to login to remove products from your wishlist. Please login to continue");
                return;
            }
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
            <Card className="flex relative border-1 rounded-none">
                <CardContent>
                    <div className="overflow-hidden block relative group w-full h-[300px]">
                        <Image src={product.imageCover} alt={product.title} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25vw" priority loading="eager"
                               className="object-contain w-full h-full align-middle border-0 transition-all duration-900 group-hover:scale-110"/>
                        <Button onClick={() => {
                            handleAddToCart(product._id).then();
                        }}
                                className={`group-hover:bottom-[20px] hover:bg-[#717FE0] text-white absolute bottom-[-50px] left-[50%] transform -translate-x-1/2 cursor-pointer rounded-2xl text-[15px] h-[40px] min-w-[139px] transition-all duration-400 px-[15px]`}>
                            Add to Cart</Button>
                    </div>
                    <div className="flex flex-wrap items-start pt-[14px]">
                        <div className="w-[calc(100%-30px)] flex flex-col items-start gap-1 ms-5">
                            <div className="flex items-center gap-2 justidy-between">
                                <div>
                                    <Link
                                        className="w-[calc(100%-30px)] text-[14px] text-[#999] pb-[6px] transition-all duration-400 hover:text-[#717FE0] cursor-pointer font-[Poppins]"
                                        href={`/products/${product._id}`}>{product.title.split(" ").slice(0, 2).join(" ")}
                                    </Link>
                                </div>
                                <div className="flex w-[30px] pt-[3px] justify-end justify-self-end">
                                    <Button onClick={() => {
                                        if (wishlist?.data?.some((item) => item._id === product._id)) {
                                            handleRemoveFromWishlist(product._id).then();
                                        } else {
                                            handleAddToWishlist(product._id).then();
                                        }
                                    }} className={`bg-transparent group hover:bg-transparent cursor-pointer`}>
                                        <Heart
                                            fill={wishlist?.data?.some((item) => item._id === product._id) ? "#717fe0" : "none"}
                                            className={wishlist?.data?.some((item) => item._id === product._id) ? "text-[#717fe0]" : "text-[#999] group-hover:text-[#717fe0] transition-all duration-400 group-hover:fill-[#717fe0]"}/>
                                    </Button>
                                </div>
                            </div>
                            <span className="font-[Poppins] tracking-[1px] text-[#666]">{product.price} EGP</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>

    );
}
