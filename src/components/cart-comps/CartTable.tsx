"use client";
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {useCart} from "@/app/context/CartContext";

function CartTable() {
    const {cartDetails} = useCart();
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
                                        <div className="absolute top-[-10] left-[-10px]"><Badge>X</Badge></div>
                                        <Image src={product.product.imageCover} alt={product.product.title} width={60}
                                               height={60}/>
                                    </div>
                                    <h2>{product.product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                </div>
                            </TableCell>
                            <TableCell className="p-6 text-center">{product.price} EGP</TableCell>
                            <TableCell className="p-6 text-center">
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        className={`border-1 px-2 py-1 rounded-md cursor-pointer border-slate-500`}>-
                                    </button>
                                    <span>{product.count}</span>
                                    <button
                                        className={`border-1 px-2 py-1 rounded-md cursor-pointer border-slate-500`}>+
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
                            className={`px-10 py-5 cursor-pointer`}>Checkout</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default CartTable;