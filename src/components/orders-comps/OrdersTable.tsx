"use client";
import React from 'react';
import {useOrders} from "@/app/context/OrdersContext";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";
import {Logs} from "lucide-react";
import LoadingPage from "@/app/orders/loading";
import {Button} from "@/components/ui/button";

export default function OrdersTable() {
    const {orders, loading} = useOrders();
    return (
        <>
            {loading ? <LoadingPage/> :
                (orders?.length !== 0 ?
                        (<div className={`w-3/4 mx-auto`}>
                            <h2 className="text-4xl mb-5 text-start font-bold uppercase font-[Poppins] text-[#222222]">Orders</h2>
                            <Table className={`w-full border-2 font-[Poppins]`}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className={`p-6 text-center uppercase font-bold text-[#555]`}>Order
                                            Number</TableHead>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-bold text-[#555]`}>Status</TableHead>
                                        <TableHead className={`p-6 text-center uppercase font-bold text-[#555]`}>Total
                                            Price</TableHead>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-bold text-[#555]`}>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders?.map((order) => (
                                        <TableRow key={order._id} className={`hover:bg-white`}>
                                            <TableCell className={`p-6 text-center`}>
                                                <h2 className={`text-[#555] font-bold font-[Poppins] hover:text-[#717FE0] transition-all duration-300`}>{order.id}</h2>
                                            </TableCell>
                                            <TableCell
                                                className={`p-6 text-center flex items-center justify-center gap-2`}>
                                                {order.isPaid ?
                                                    <p className={`bg-green-500 rounded-lg py-2 px-2 w-[75px] text-white`}>Paid</p> :
                                                    <p className={`bg-orange-500 rounded-lg w-[75px] py-2 px-2 text-white`}>Pending</p>}
                                            </TableCell>
                                            <TableCell className={`p-6 text-center text-[#555]`}>
                                                {order.totalOrderPrice} EGP
                                            </TableCell>
                                            <TableCell className={`p-6 text-center`}>
                                                <Button
                                                    className={`px-8 py-5 cursor-pointer bg-black rounded-[22px] hover:bg-[#717FE0] border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                                                    <Link href={`/orders`}>
                                                        View Order
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>) :
                        <div className={`w-1/2 mx-auto flex flex-col items-center justify-center gap-5 font-[Poppins]`}>
                            <div
                                className={`flex items-center justify-center rounded-full bg-slate-100 p-10 group hover:bg-[#717FE0] transition-all duration-400`}>
                                <Logs
                                    className={`text-6xl text-black group-hover:text-white transition-all duration-400`}
                                    size={62}/>
                            </div>
                            <h2 className={`text-3xl font-bold`}>Your orders are empty!</h2>
                            <p className={`text-md w-[75%] text-center text-slate-500`}>Found something you like? Tap on
                                the
                                add to cart button on the item to add it to your cart and complete your first order! All
                                your orders will
                                appear
                                here.</p>
                            <Link href={`/cart`}
                                  className={`px-8 py-4 cursor-pointer my-5 bg-black rounded-[22px] hover:bg-[#717FE0] border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                                Go to Cart
                            </Link>
                        </div>
                )
            }
        </>
    );
}