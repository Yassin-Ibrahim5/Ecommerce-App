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
import {ShoppingBag, Trash2} from "lucide-react";
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
                        (<div className={`w-full lg:w-3/4 mx-auto px-4 lg:px-0`}>
                            <h2 className="text-2xl md:text-4xl mb-5 md:text-start font-bold uppercase font-[Poppins] text-[#222222]">Cart</h2>

                            {/*Desktop View Table*/}
                            <Table className={`w-full border-2 hidden md:table`}>
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
                                                               className={`absolute bottom-[calc(50%-18px)] left-[-63px] w-9 h-9 [&_svg]:!size-8 cursor-pointer rounded-full hover:bg-[#717FE0] transition-all duration-400`}>
                                                            <Trash2/>
                                                        </Badge>
                                                        <Image src={product.product.imageCover}
                                                               alt={product.product.title}
                                                               width={60}
                                                               height={60}/>
                                                    </div>
                                                    <Link href={`/products/${product.product._id}`}>
                                                        <h2 className={`text-[#555] text-start font-[Poppins] hover:text-[#717FE0] transition-all duration-300 w-25`}>{product.product.title.split(" ").slice(0, 2).join(" ")}</h2>
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

                            {/*Mobile View Table*/}
                            <div className="md:hidden font-[Poppins]">
                                {cartDetails?.data.products.map((product) => (
                                    <div key={product._id}
                                         className={`bg-white border-2 rounded-lg p-4 p-4 mb-4 shadow-sm`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <Image src={product.product.imageCover} alt={product.product.title}
                                                       width={80} height={80} className={`rounded-md`}/>
                                                <Link href={`/products/${product.product._id}`}>
                                                    <h3 className="text-base font-bold text-[#555] hover:text-[#717FE0]">
                                                        {product.product.title.split(" ").slice(0, 3).join(" ")}
                                                    </h3>
                                                </Link>
                                            </div>
                                            <button onClick={() => {
                                                handleRemoveFromCart(product.product._id).then()
                                            }}
                                                    className={`text-gray-500 hover:text-red-500 transition-all duration-400 cursor-pointer`}>
                                                <Trash2 size={24}/>
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                            <div className="font-semibold">Price:</div>
                                            <div>{product.price} EGP</div>
                                            <div className="flex items-center justify-start">
                                                <button
                                                    onClick={() => handleUpdateCart(product.product._id, product.count - 1)}
                                                    className="w-8 h-8 flex items-center justify-center border hover:bg-[#717FE0] hover:text-white transition-all duration-400 cursor-pointer">-
                                                </button>
                                                <span
                                                    className="w-8 h-8 flex items-center justify-center border-t border-b bg-gray-100">{product.count}</span>
                                                <button
                                                    onClick={() => handleUpdateCart(product.product._id, product.count + 1)}
                                                    className="w-8 h-8 flex items-center justify-center border hover:bg-[#717FE0] hover:text-white transition-all duration-400 cursor-pointer">+
                                                </button>
                                            </div>
                                            <div className={`flex`}>

                                                <div className="font-semibold">Subtotal: &nbsp;</div>
                                                <div>{product.price * product.count} EGP</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="bg-white p-4 rounded-lg shadow-sm text-right font-bold mt-4">
                                    <h4 className="text-xl">Total: {cartDetails?.data.totalCartPrice} EGP</h4>
                                    <Button
                                        className="mt-4 w-full px-10 py-5 cursor-pointer bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]">
                                        <Link href={"/checkout"}>
                                            Checkout
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>) :
                        <div
                            className={`w-11/12 md:w-1/2 mx-auto flex flex-col items-center justify-center gap-5 font-[Poppins]`}>
                            <div
                                className={`flex items-center justify-center rounded-full bg-slate-100 p-10 group hover:bg-[#717FE0] transition-all duration-400`}>
                                <ShoppingBag
                                    className={`text-6xl text-black group-hover:text-white transition-all duration-400`}
                                    size={62}/>
                            </div>
                            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>Your cart is empty!</h2>
                            <p className={`text-sm md:text-md w-full text-center text-[#888]`}>Found something you like?
                                Tap on
                                the
                                add to cart button on the item to add it to your cart!</p>
                            <Link href={`/products`}
                                  className={`px-6 py-3 md:px-8 md:py-4 cursor-pointer my-5 bg-black rounded-[22px] hover:bg-[#717FE0] border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                                Continue Shopping
                            </Link>
                        </div>
                )
            }
        </>
    );
}
