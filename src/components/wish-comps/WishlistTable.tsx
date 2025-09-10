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
    const {cartDetails, fetchCart} = useCart();

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
            {wishlist?.data?.length !== 0 ?
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
                <div className={`w-3/4 mx-auto flex flex-col items-center justify-center gap-5`}>

                </div>
            }
        </>
    );
}

