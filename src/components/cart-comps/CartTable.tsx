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
import {ShoppingBag} from "lucide-react";
import LoadingPage from "@/app/cart/loading";

export default function CartTable() {
    const {cartDetails, fetchCart, loading} = useCart();

    async function handleRemoveFromCart(productId: string) {
        try {
            const response = await removeFromCart(productId);
            await fetchCart();
            toast.success("Product removed successfully from your cart");
            return response;
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    async function handleUpdateCart(productId: string, count: number) {
        try {
            const response = await updateCart(productId, count);
            await fetchCart();
            toast.success("Cart updated successfully");
            return response;
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            {loading ? <LoadingPage/> :
                (cartDetails?.numOfCartItems !== 0 ?
                        (<div className={`w-3/4 mx-auto`}>
                            <h2 className="text-4xl mb-5 text-start font-bold uppercase font-[Poppins] text-[#222222]">Cart</h2>
                            <Table className={`w-full border-2`}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-[Poppins] font-bold text-[#555]`}>Product</TableHead>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-[Poppins] font-bold text-[#555]`}>Price</TableHead>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-[Poppins] font-bold text-[#555]`}>Quantity</TableHead>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-[Poppins] font-bold text-[#555]`}>Subtotal</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cartDetails?.data.products.map((product) => (
                                        <TableRow key={product._id} className={`hover:bg-white`}>
                                            <TableCell className={`p-6 text-center`}>
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className="relative">
                                                        <Badge onClick={() => {
                                                            handleRemoveFromCart(product.product._id).then();
                                                        }}
                                                               className="absolute top-[-10] left-[-10px] cursor-pointer hover:bg-[#717FE0] transition-all duration-300">X</Badge>
                                                        <Image src={product.product.imageCover}
                                                               alt={product.product.title}
                                                               width={60}
                                                               height={60}/>
                                                    </div>
                                                    <Link href={`/products/${product.product._id}`}>
                                                        <h2 className={`text-[#555] font-[Poppins] hover:text-[#717FE0] transition-all duration-300`}>{product.product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className="p-6 text-center text-[#555] font-[Poppins]">{product.price} EGP</TableCell>
                                            <TableCell className="p-6 text-center text-[#555] font-[Poppins]">
                                                <div
                                                    className={`w-[135px] h-[45px] border-1 border-[#e6e6e6] rounded-[3px] overflow-hidden flex mx-auto`}>
                                                    <div onClick={() => {
                                                        handleUpdateCart(product.product._id, product.count - 1).then();
                                                    }}
                                                         className={`w-[45px] h-full cursor-pointer flex items-center justify-center transition-all duration-400 hover:bg-[#717FE0] text-[#555] group`}>
                                                        <button
                                                            className={`group-hover:text-white cursor-pointer transition-all duration-400`}>-
                                                        </button>
                                                    </div>

                                                    <div
                                                        className={`w-[45px] h-full flex items-center justify-center text-[#666] bg-[#F6F6F6]`}>
                                                        <span>{product.count}</span>
                                                    </div>
                                                    <div onClick={() => {
                                                        handleUpdateCart(product.product._id, product.count + 1).then();
                                                    }}
                                                         className={`w-[45px] h-full cursor-pointer flex items-center justify-center transition-all duration-400 hover:bg-[#717FE0] text-[#555] group`}>
                                                        <button
                                                            className={`group-hover:text-white cursor-pointer transition-all duration-400`}>+
                                                        </button>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className="text-center text-[#555] font-[Poppins]">{product.price * product.count} EGP</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow className={`font-[Poppins] text-[#555] hover:bg-white`}>
                                        <TableCell className={`p-6 text-center font-bold uppercase`}>Total</TableCell>
                                        <TableCell className={`p-6 text-center font-bold uppercase`}
                                                   colSpan={2}>{cartDetails?.data.totalCartPrice} EGP</TableCell>
                                        <TableCell className={`p-6 text-center`}>
                                            <Button
                                                className={`px-10 py-5 cursor-pointer bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                                                <Link href={"/checkout"}>
                                                    Checkout
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>) :
                        <div className={`w-1/2 mx-auto flex flex-col items-center justify-center gap-5 font-[Poppins]`}>
                            <div
                                className={`flex items-center justify-center rounded-full bg-slate-100 p-10 group hover:bg-[#717FE0] transition-all duration-400`}>
                                <ShoppingBag
                                    className={`text-6xl text-black group-hover:text-white transition-all duration-400`}
                                    size={62}/>
                            </div>
                            <h2 className={`text-3xl font-bold`}>Your cart is empty!</h2>
                            <p className={`text-md w-[75%] text-center text-slate-500`}>Found something you like? Tap on
                                the
                                add to cart button on the item to add it to your cart!</p>
                            <Link href={`/`}
                                  className={`px-8 py-4 cursor-pointer my-5 bg-black rounded-[22px] hover:bg-[#717FE0] border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                                Continue Shopping
                            </Link>
                        </div>
                )
            }
        </>
    );
}
