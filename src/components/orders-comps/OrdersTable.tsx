"use client";
import React from 'react';
import {useOrders} from "@/app/context/OrdersContext";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import Link from "next/link";
import {Logs} from "lucide-react";
import LoadingPage from "@/app/allorders/loading";

export default function OrdersTable() {
    const {orders, loading} = useOrders();
    console.log(orders, "orders");
    return (
        <>
            {loading ? <LoadingPage/> :
                (orders?.length !== 0 ?
                        (<div className={`w-3/4 mx-auto`}>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className={`p-6 text-center`}>Order Number</TableHead>
                                        <TableHead className={`p-6 text-center`}>Status</TableHead>
                                        <TableHead className={`p-6 text-center`}>Total Price</TableHead>
                                        <TableHead className={`p-6 text-center`}>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className={`text-center`}>
                                    {orders?.map((order) => (
                                        <TableRow key={order._id}>
                                            <TableCell className={`p-6 text-center text-gray-500`}>
                                                {order.id}
                                            </TableCell>
                                            <TableCell
                                                className={`p-6 text-center flex items-center justify-center gap-2`}>
                                                {order.isPaid ?
                                                    <p className={`bg-green-500 rounded-lg py-2 px-2 w-[75px] text-white`}>Paid</p> :
                                                    <p className={`bg-orange-500 rounded-lg w-[75px] py-2 px-2 text-white`}>Pending</p>}
                                            </TableCell>
                                            <TableCell className={`p-6 text-center`}>
                                                {order.totalOrderPrice} EGP
                                            </TableCell>
                                            <TableCell className={`p-6 text-center`}>
                                                <Link href={`/allorders`}
                                                      className={`font-medium hover:bg-black hover:border-black hover:text-white transition-all duration-200 border-1 px-5 py-2 rounded-md cursor-pointer border-slate-200`}>
                                                    View Order
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>) :
                        <div className={`w-1/2 mx-auto flex flex-col items-center justify-center gap-5 my-10`}>
                            <div className={`flex items-center justify-center rounded-full bg-slate-100 p-10`}>
                                <Logs className={`text-6xl text-black`} size={62}/>
                            </div>
                            <h2 className={`text-3xl font-bold`}>Your orders are empty!</h2>
                            <p className={`text-md w-[75%] text-center text-slate-500`}>Found something you like? Tap on
                                the
                                cart shaped icon next
                                to the item to add it to your cart and complete your first order! All your orders will
                                appear
                                here.</p>
                            <Link href={`/cart`}
                                  className={`px-8 py-4 hover:bg-black hover:text-white cursor-pointer rounded-lg border-1 transition-all duration-300 border-black`}>
                                Go to Cart
                            </Link>
                        </div>
                )
            }
        </>
    );
}