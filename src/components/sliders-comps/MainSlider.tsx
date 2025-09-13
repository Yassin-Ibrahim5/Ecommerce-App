"use client"
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {EffectFade, Navigation, Pagination} from 'swiper/modules';
import Image from "next/image";
import {Button} from "@/components/ui/button"
import {MoveRight} from "lucide-react";

export default function MainSlider() {
    return (
        <div className={`container mx-auto`}>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 200,
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper">
                <SwiperSlide>
                    <div className={`relative h-[100vh] w-full`}>
                        <Image src="/slider-imgs/slider-01.jpg" alt={`slider-images`} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority loading={"eager"} className={`object-cover`}/>
                        <div className="absolute top-[35%] left-[200px]">
                            <span className={`text-[28px] my-5`}>Women's Collection 2025</span>
                            <h2 className={`text-[60px] font-playfair font-semibold my-5`}>NEW SEASON</h2>
                            <Button className={`bg-[#717fe0] hover:bg-[#222222] text-[15px] text-white px-8 rounded-full font-poppins py-5`}>SHOP NOW</Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`relative h-[100vh] w-full`}>
                        <Image src={"/slider-imgs/slider-02.jpg"} alt={`slider-images`} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority loading={"eager"} className={`object-cover`}/>
                        <div className="absolute top-[200px] left-[70px]">
                            <h2 className={`text-md font-bold my-5`}>Summer Collection</h2>
                            <p className={`text-md my-5`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At,
                                est.</p>
                            <Button className={`bg-black text-white px-10`}>Shop Now<MoveRight/></Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`relative h-[100vh] w-full`}>
                        <Image src={"/slider-imgs/slider-03.jpg"} alt={`slider-images`} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority loading={"eager"} className={`object-cover`}/>
                        <div className="absolute top-[200px] left-[70px]">
                            <h2 className={`text-md font-bold my-5`}>Summer Collection</h2>
                            <p className={`text-md my-5`}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At,
                                est.</p>
                            <Button className={`bg-black text-white px-10`}>Shop Now<MoveRight/></Button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
