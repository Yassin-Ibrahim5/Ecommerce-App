"use client";
import React from 'react';
import {ProductDetail} from "@/app/types/productDetails.model";
import {Star} from "lucide-react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";
import {addToCart} from "@/actions/cart.action";
import toast from "react-hot-toast";
import {useCart} from "@/app/context/CartContext";

export default function ProductDetailsComp({productDetails}: { productDetails: ProductDetail }) {
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

    return (
        <div className={`flex justify-between items-center`}>
            <div className="w-full md:w-1/2 py-5">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={3}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Navigation, Pagination]}>
                    {productDetails.images?.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div className={`relative lg:h-[600px] md:h-[450px] w-full`}>
                                <Image src={src} alt={`slider-images`} fill
                                       sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25"
                                       priority
                                       loading={"eager"}
                                       className={`object-contain`}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="w-full md:w-1/2 px-10 py-5">
                <h2 className="text-3xl font-bold my-7 tracking-tighter">{productDetails?.title}</h2>
                <p className={`text-slate-500 my-7 text-2xl tracking-tighter`}>{productDetails?.description}</p>

                <div className="flex justify-between items-center">
                    <div className="catPrice">
                        <p className={`text-lg my-4`}>{productDetails?.category?.name}</p>
                        <p className={`text-lg my-4`}>{productDetails?.price} EGP</p>
                    </div>
                    <div className={`flex gap-2`}>
                        <Star color="#ffff01"/>
                        <span>{productDetails.ratingsAverage}</span>
                    </div>
                </div>
                <button onClick={() => {
                    handleAddToCart(productDetails._id);
                }}
                        className={`bg-black text-white border-1 border-black w-full py-4 rounded-lg transition-all duration-300 hover:bg-white hover:text-black cursor-pointer`}>+
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
