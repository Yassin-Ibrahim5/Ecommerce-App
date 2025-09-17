"use client";
import React from 'react';
import {ProductDetail} from "@/app/types/productDetails.model";
import {Star} from "lucide-react";
import Image from "next/image";
import {addToCart} from "@/actions/cart.action";
import toast from "react-hot-toast";
import {useCart} from "@/app/context/CartContext";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {Button} from "@/components/ui/button";
import {getUserToken} from "@/lib/token.utils";

export default function ProductDetailsComp({productDetails}: { productDetails: ProductDetail }) {
    const {fetchCart} = useCart();

    async function handleAddToCart(productId: string) {
        try {
            const token = await getUserToken();
            if (!token) {
                toast.error("You need to login to add products to your cart");
                return;
            }
            const response = await addToCart(productId);
            toast.success("Product added successfully to your cart");
            await fetchCart();
            return response;
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className={`flex flex-col lg:flex-row justify-between sm:justify-center items-center font-[Poppins] `}>
            <div className="w-full lg:w-1/2 py-5 transition-all duration-400">
                <Carousel className={`w-full`} opts={
                    {
                        align: "start",
                        loop: true,
                    }
                } plugins={
                    [
                        Autoplay({
                            delay: 3500
                        }),
                        Fade()
                    ]
                }>
                    <CarouselContent>
                        {productDetails?.images.map((src, index) => (
                            <CarouselItem className={`relative basis-full`} key={index}>
                                <div className={`relative lg:h-[600px] md:h-[450px] h-[300px] w-full`}>
                                    <Image src={src} alt={`slider-images`} fill
                                           sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25"
                                           priority
                                           loading={"eager"}
                                           className={`object-contain`}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious
                        className={`w-10 h-10 bg-[#00000080] border-none text-white rounded-none [&_svg]:!size-6 cursor-pointer hover:bg-black hover:text-white transition-all duration-400`}/>
                    <CarouselNext
                        className={`w-10 h-10 bg-[#00000080] border-none text-white rounded-none [&_svg]:!size-6 cursor-pointer hover:bg-black hover:text-white transition-all duration-400`}/>
                </Carousel>
            </div>
            <div className="w-full lg:w-1/2 ml-10 px-10 transition-all duration-400">
                <h4 className="text-2xl text-[#333] leading-9 font-medium">{productDetails?.title}</h4>
                <p className={`text-lg mt-3 leading-6 font-semibold`}>{productDetails?.price} EGP</p>
                <p className={`text-[#666] mt-6 text-sm`}>{productDetails?.description}</p>

                <div className="flex justify-between items-center">
                    <div className="catPrice">
                        <p className={`text-sm text-[#666] my-4`}>{productDetails?.category?.name}</p>
                    </div>
                    <div className={`flex gap-2 text-sm items-center`}>
                        <Star className="text-[#ffff01] fill-[#ffff01]" size={20}/>
                        <span className={`text-[#666]`}>{productDetails.ratingsAverage}</span>
                    </div>
                </div>
                <Button onClick={() => {
                    handleAddToCart(productDetails._id).then();
                }}
                        className={`rounded-[23px] bg-[#717FE0] min-w-40 h-11 font-medium text-[15px] uppercase text-white flex items-center justify-center transition-all duration-400 hover:bg-[#222222] px-[15px] cursor-pointer`}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}
