"use client";
import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

function CartTable() {
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
                    <TableRow>
                        <TableCell className="p-6 text-center">
                            <div className="flex items-center justify-center gap-4">
                                <div className="relative">
                                    <div className={`absolute top-[-10] left-[-10px]`}><Badge>X</Badge></div>
                                    <Image priority
                                           src={"https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg"}
                                           alt={"product"} width={60} height={60}/>
                                </div>
                                <h2>Title</h2>
                            </div>
                        </TableCell>
                        <TableCell className={`p-6 text-center`}>10 EGP</TableCell>
                        <TableCell className={`p-6 text-center`}>
                            <div className="flex items-center justify-center gap-3">
                                <button className={`border-1 px-2 py-1 rounded-md cursor-pointer border-slate-500`}>-
                                </button>
                                <span>1</span>
                                <button className={`border-1 px-2 py-1 rounded-md cursor-pointer border-slate-500`}>+
                                </button>
                            </div>
                        </TableCell>
                        <TableCell className="text-center">$250.00</TableCell>
                    </TableRow>
                    <TableRow className={`bg-slate-300`}>
                        <TableCell className={`p-6 text-center`}>Total</TableCell>
                        <TableCell className={`p-6 text-center`} colSpan={2}>1000 EGP</TableCell>
                        <TableCell className={`p-6 text-center`}><Button
                            className={`px-10 py-5 cursor-pointer`}>Checkout</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default CartTable;