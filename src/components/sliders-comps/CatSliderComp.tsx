"use client";
"use client"
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";
import {Category} from "@/app/types/category.model";
import Link from "next/link";

function CatSliderComp({category}: { category: Category[] }) {
    return (
        <div className={`container mx-auto`}>
            <Swiper
                slidesPerView={4}
                spaceBetween={4}
                navigation={true}
                loop={true}
                modules={[Navigation,]}
                className="mySwiper mt-10">
                {category.map((cat) =>
                    <SwiperSlide key={cat._id}>
                        <div className={`relative h-[450px] w-full group`}>
                            <Image src={cat.image} alt={`slider-images`} fill
                                   sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority
                                   loading={"eager"}
                                   className={`object-cover`}/>
                            <div className={`absolute top-[0] left-[0] w-full h-full bg-[#6775d6cc] opacity-0 group-hover:opacity-100 transition-all duration-500`}>
                            </div>
                            <div className={`absolute -bottom-[500px] w-full h-[450px] text-white group-hover:-bottom-[390px] text-center transition-all duration-600`}>
                                <Link href={"/products"} className={`text-2xl font-[Poppins] hover:underline text-center font-semibold`}>Shop Now</Link>
                            </div>
                        </div>
                        <p className={`text-2xl text-center font-[Poppins] font-semibold`}>{cat.name}</p>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}

export default CatSliderComp;