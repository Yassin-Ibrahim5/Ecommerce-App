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
import {HeartOff, Trash2} from "lucide-react";
import LoadingPage from "@/app/wishlist/loading";
import {Button} from "@/components/ui/button";

export default function WishlistTable() {
    const {wishlist, fetchWishlist, loading} = useWishlist();
    const {fetchCart} = useCart();

    async function handleAddToCart(productId: string) {
        try {
            const response = await addToCart(productId);
            toast.success("Product added successfully to your cart");
            await fetchCart();
            return response;
        } catch (error) {
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
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            {loading ? <LoadingPage/> :
                (wishlist?.count !== 0 ?
                        (<div className={`w-full lg:w-3/4 mx-auto px-4 lg:px-0`}>
                            <h2 className="text-2xl md:text-4xl mb-5 md:text-start font-bold uppercase font-[Poppins] text-[#222222]">Wishlist</h2>

                            {/*Desktop View Table*/}
                            <Table className={`w-full border-2 hidden md:table`}>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-[Poppins] font-bold text-[#555]`}>Product</TableHead>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-[Poppins] font-bold text-[#555]`}>Price</TableHead>
                                        <TableHead
                                            className={`p-6 text-center uppercase font-[Poppins] font-bold text-[#555]`}>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className={`text-center`}>
                                    {wishlist?.data?.map((product) => (
                                        <TableRow key={product._id} className={`hover:bg-white`}>
                                            <TableCell className={`p-6 text-center`}>
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className="relative">
                                                        <Badge onClick={() => {
                                                            handleRemoveFromWishlist(product._id).then();
                                                        }}
                                                               className={`absolute bottom-[calc(50%-18px)] left-[-63px] w-9 h-9 [&_svg]:!size-8 cursor-pointer rounded-full hover:bg-[#717FE0] transition-all duration-400`}>
                                                            <Trash2/>
                                                        </Badge>
                                                        <Image src={product.imageCover} alt={product.title} width={60}
                                                               height={60}/>
                                                    </div>
                                                    <Link href={`/products/${product._id}`}>
                                                        <h2 className={`text-[#555] text-start font-[Poppins] hover:text-[#717FE0] transition-all duration-400 w-25`}>{product.title.split(" ").slice(0, 2).join(" ")}</h2>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className="p-6 text-center text-[#555] font-[Poppins]">{product.price} EGP</TableCell>
                                            <TableCell className="p-6 text-center text-[#555] font-[Poppins]">
                                                <Button onClick={() => {
                                                    handleAddToCart(product._id).then();
                                                }}
                                                        className={`px-8 py-5 cursor-pointer bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                                                    Add to Cart
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/*Mobile View Table*/}
                            <div className="md:hidden font-[Poppins]">
                                {wishlist?.data?.map((product) => (
                                    <div key={product._id}
                                         className={`bg-white border-2 rounded-lg p-4 p-4 mb-4 shadow-sm`}>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <Image src={product.imageCover} alt={product.title} width={80}
                                                       height={80} className={`rounded-md`}/>
                                                <Link href={`/products/${product._id}`}>
                                                    <h3 className="text-base font-bold text-[#555] hover:text-[#717FE0] transition-all duration-400">
                                                        {product.title.split(" ").slice(0, 3).join(" ")}
                                                    </h3>
                                                </Link>
                                            </div>
                                            <button onClick={() => {
                                                handleRemoveFromWishlist(product._id).then()
                                            }}
                                                    className={`text-[#888] hover:text-red-500 transition-all duration-400 cursor-pointer`}>
                                                <Trash2 size={24}/>
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center text-[#555]">
                                            <div className={`flex items-center justify-start`}>
                                                <div className="font-semibold text-black">Price: &nbsp;</div>
                                                <div>{product.price} EGP</div>
                                            </div>
                                            <div className="">
                                                <Button onClick={() => {
                                                    handleAddToCart(product._id).then();
                                                }}
                                                        className={`px-5 py-3 cursor-pointer bg-black rounded-[22px] hover:bg-[#717FE0] hover:text-white border-1 transition-all duration-400 border-[#e6e6e6] text-white uppercase font-[Poppins]`}>
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>) :
                        <div className={`w-11/12 md:1/2 mx-auto flex flex-col items-center justify-center gap-5 font-[Poppins]`}>
                            <div
                                className={`flex items-center justify-center rounded-full bg-slate-100 p-10 group hover:bg-[#717FE0] transition-all duration-400`}>
                                <HeartOff
                                    className={`text-6xl text-black group-hover:text-white transition-all duration-400`}
                                    size={62}/>
                            </div>
                            <h2 className={`text-2xl md:text-3xl font-bold text-center`}>Your wishlist is empty!</h2>
                            <p className={`text-sm md:text-md w-full text-center text-[#888]`}>Found something you like? Tap on
                                the heart shaped icon next
                                to the item to add it to your wishlist! All your saved items will appear here.</p>
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

