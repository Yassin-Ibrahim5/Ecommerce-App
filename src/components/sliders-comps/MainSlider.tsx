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
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority loading={"eager"}
                               className={`object-cover`}/>
                        <div className="absolute top-[37%] left-[200px]">
                            <span className={`text-[28px] font-[Poppins] mb-4`}>Women's Collection 2025</span>
                            <h2 className={`text-[60px] font-semibold text-[#333333] mb-4 font-[Playfair_Display]`}>NEW SEASON</h2>
                            <Button
                                className={`bg-[#717fe0] transition-all duration-300 hover:bg-[#222222] text-[15px] text-white px-9 rounded-full font-poppins py-6 cursor-pointer`}>SHOP
                                NOW</Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`relative h-[100vh] w-full`}>
                        <Image src="/slider-imgs/slider-02.jpg" alt={`slider-images`} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority loading={"eager"}
                               className={`object-cover`}/>
                        <div className="absolute top-[37%] left-[200px]">
                            <span className={`text-[28px] font-[Poppins] mb-4`}>Men's New-Season</span>
                            <h2 className={`text-[60px] font-semibold text-[#333333] mb-4 font-[Playfair_Display]`}>JACKETS & COATS</h2>
                            <Button
                                className={`bg-[#717fe0] transition-all duration-300 hover:bg-[#222222] text-[15px] text-white px-9 rounded-full font-poppins py-6 cursor-pointer`}>SHOP
                                NOW</Button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={`relative h-[100vh] w-full`}>
                        <Image src="/slider-imgs/slider-03.jpg" alt={`slider-images`} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority loading={"eager"}
                               className={`object-cover`}/>
                        <div className="absolute top-[37%] left-[200px]">
                            <span className={`text-[28px] font-[Poppins] mb-4`}>Men's Collection 2025</span>
                            <h2 className={`text-[60px] font-semibold text-[#333333] mb-4 font-[Playfair_Display]`}>NEW ARRIVALS</h2>
                            <Button
                                className={`bg-[#717fe0] transition-all duration-300 hover:bg-[#222222] text-[15px] text-white px-9 rounded-full font-poppins py-6 cursor-pointer`}>SHOP
                                NOW</Button>
                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
}
