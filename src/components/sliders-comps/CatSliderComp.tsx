"use client";
"use client"
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from "next/image";
import {Category} from "@/app/types/category.model";

function CatSliderComp({category}: { category: Category[] }) {
    return (
        <div className={`container mx-auto`}>
            <Swiper
                slidesPerView={4}
                spaceBetween={3}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation, Pagination]}
                className="mySwiper">
                {category.map((cat) =>
                    <SwiperSlide key={cat._id}>
                        <div className={`relative h-[250px] w-full`}>
                            <Image src={cat.image} alt={`slider-images`} fill
                                   sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority
                                   loading={"eager"}
                                   className={`object-cover`}/>
                        </div>
                        <p className={`text-2xl text-center`}>{cat.name}</p>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}

export default CatSliderComp;