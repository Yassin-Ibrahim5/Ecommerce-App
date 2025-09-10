"use client";
import React from 'react';
import {useWishlist} from "@/app/context/WishlistContext";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {useCart} from "@/app/context/CartContext";
import {addToCart} from "@/actions/cart.action";
import toast from "react-hot-toast";
import {removeFromWishlist} from "@/actions/wishlist.action";
import {HeartOff} from "lucide-react";

export default function WishlistTable() {
    const {wishlist, fetchWishlist} = useWishlist();
    const {fetchCart} = useCart();

    async function handleAddToCart(productId: string) {
        try {
            const response = await addToCart(productId);
            toast.success("Product added successfully to your cart");
            await fetchCart();
            return response;
        } catch (error) {
            console.log(error, "error onclick add to product");
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
            console.log(error, "error onclick add to product");
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            {wishlist?.count !== 0 ?
                (<div className={`w-3/4 mx-auto`}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className={`p-6 text-center`}>Product</TableHead>
                                <TableHead className={`p-6 text-center`}>Price</TableHead>
                                <TableHead className={`p-6 text-center`}>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className={`text-center`}>
                            {wishlist?.data?.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell className={`p-6 text-center`}>
                                        <div className="flex items-center justify-center gap-4">
                                            <div className="relative">
                                                <Badge onClick={() => {
                                                    handleRemoveFromWishlist(product._id);
                                                }} className={`absolute top-[-8] left-[-16px] cursor-pointer`}>X</Badge>
                                                <Image src={product.imageCover} alt={product.title} width={60}
                                                       height={60}/>
                                            </div>
                                            <Link href={`/products/${product._id}`}>
                                                <h2>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                            </Link>
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-6 text-center">{product.price} EGP</TableCell>
                                    <TableCell className="p-6 text-center">
                                        <button onClick={() => {
                                            handleAddToCart(product._id);
                                        }}
                                                className={`font-medium hover:bg-black hover:border-black hover:text-white transition-all duration-200 border-1 px-5 py-2 rounded-md cursor-pointer border-slate-200`}>
                                            Add to Cart
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>) :
                <div className={`w-1/2 mx-auto flex flex-col items-center justify-center gap-5 my-10`}>
                    <div className={`flex items-center justify-center rounded-full bg-slate-100 p-10`}>
                        <HeartOff className={`text-6xl text-black`} size={62}/>
                    </div>
                    <h2 className={`text-3xl font-bold`}>Your wishlist is empty!</h2>
                    <p className={`text-md w-[75%] text-center text-slate-500`}>Found something you like? Tap on the heart shaped icon next
                        to the item to add it to your wishlist! All your saved items will appear here.</p>
                    <Link href={`/`}
                          className={`px-8 py-4 hover:bg-black hover:text-white cursor-pointer rounded-lg border-1 transition-all duration-300 border-black`}>
                        Continue Shopping
                    </Link>
                </div>
            }
        </>
    );
}

