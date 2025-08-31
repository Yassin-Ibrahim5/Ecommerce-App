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
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper">
                <SwiperSlide>
                    <div className={`relative h-[600px] w-full`}>
                        <Image src={"/slider-imgs/slider-01.jpg"} alt={`slider-images`} fill
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
                    <div className={`relative h-[600px] w-full`}>
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
                    <div className={`relative h-[600px] w-full`}>
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
                <SwiperSlide>
                    <div className={`relative h-[600px] w-full`}>
                        <Image src={"/slider-imgs/slider-04.jpg"} alt={`slider-images`} fill
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
