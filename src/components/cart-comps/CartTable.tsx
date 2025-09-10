"use client";
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useCart} from "@/app/context/CartContext";
import {removeFromCart, updateCart} from "@/actions/cart.action";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CartTable() {
    const {cartDetails, fetchCart} = useCart();

    async function handleRemoveFromCart(productId: string) {
        try {
            const response = await removeFromCart(productId);
            console.log(response, "remove product from cart")
            await fetchCart();
            toast.success("Product removed successfully from your cart");
            return response;
        } catch (error) {
            console.log(error, "error remove product from cart");
            toast.error("Something went wrong");
        }
    }

    async function handleUpdateCart(productId: string, count: number) {
        try {
            const response = await updateCart(productId, count);
            console.log(response, "update product from cart")
            await fetchCart();
            toast.success("Cart updated successfully");
            return response;
        } catch (error) {
            console.log(error, "error updating cart");
            toast.error("Something went wrong");
        }
    }

    return (
        <div className={`w-3/4 mx-auto`}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={`p-6 text-center`}>Product</TableHead>
                        <TableHead className={`p-6 text-center`}>Price</TableHead>
                        <TableHead className={`p-6 text-center`}>Quantity</TableHead>
                        <TableHead className={`p-6 text-center`}>Subtotal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartDetails?.data.products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell className={`p-6 text-center`}>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="relative">
                                        <Badge onClick={() => {
                                            handleRemoveFromCart(product.product._id);
                                        }} className="absolute top-[-10] left-[-10px] cursor-pointer">X</Badge>
                                        <Image src={product.product.imageCover} alt={product.product.title} width={60}
                                               height={60}/>
                                    </div>
                                    <Link href={`/products/${product.product._id}`}>
                                        <h2>{product.product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell className="p-6 text-center">{product.price} EGP</TableCell>
                            <TableCell className="p-6 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button onClick={() => {
                                        handleUpdateCart(product.product._id, product.count - 1);
                                    }}
                                            className={`hover:bg-black hover:border-black hover:text-white transition-all duration-200 border-1 px-2 py-1 rounded-md cursor-pointer border-slate-500`}>-
                                    </button>
                                    <span>{product.count}</span>
                                    <button onClick={() => {
                                        handleUpdateCart(product.product._id, product.count + 1);
                                    }}
                                            className={`hover:bg-black hover:border-black hover:text-white transition-all duration-200 border-1 px-2 py-1 rounded-md cursor-pointer border-slate-500`}>+
                                    </button>
                                </div>
                            </TableCell>
                            <TableCell className="text-center">{product.price * product.count} EGP</TableCell>
                        </TableRow>
                    ))}
                    <TableRow className={`bg-slate-300`}>
                        <TableCell className={`p-6 text-center`}>Total</TableCell>
                        <TableCell className={`p-6 text-center`}
                                   colSpan={2}>{cartDetails?.data.totalCartPrice} EGP</TableCell>
                        <TableCell className={`p-6 text-center`}><Button
                            className={`px-10 py-5 cursor-pointer hover:bg-white hover:text-black border-1 transition-all duration-300 border-black`}>Checkout</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
