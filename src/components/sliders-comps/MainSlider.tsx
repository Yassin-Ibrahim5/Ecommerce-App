"use client"
import React from 'react';
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {Button} from "@/components/ui/button";
import Fade from "embla-carousel-fade";

export default function MainSlider() {
    return (
        <>
            <div className="w-full">
                <Carousel className={`w-full group`} opts={
                    {
                        align: "center",
                        loop: true,
                    }
                } plugins={
                    [
                        Autoplay({
                            delay: 3000
                        }),
                        Fade()
                    ]
                }>
                    <CarouselContent>
                        <CarouselItem>
                            <div className={`relative h-[100vh] w-full bg-[url(/slider-imgs/slider-01.jpg)] bg-cover bg-center`}>
                                <div
                                    className="absolute top-[37%] left-1/2 transform -translate-x-1/2 md:left-[200px] md:translate-x-0 text-center md:text-left p-4">
                                <span className={`text-lg md:text-[28px] font-[Poppins] mb-2 md:mb-4`}>Women's Collection</span>
                                    <h2 className={`text-3xl md:text-[60px] font-semibold text-[#333333] mb-2 md:mb-4 font-[Playfair_Display]`}>NEW
                                        SEASON</h2>
                                    <Button
                                        className={`bg-[#717fe0] transition-all duration-300 hover:bg-[#222222] text-[15px] text-white px-6 md:px-9 rounded-full font-[Poppins] py-4 md:py-6 cursor-pointer`}>SHOP
                                        NOW</Button>
                                </div>
                            </div>
                        </CarouselItem>

                        <CarouselItem>
                            <div className={`relative h-[100vh] w-full bg-[url(/slider-imgs/slider-02.jpg)] bg-cover bg-center`}>
                                <div
                                    className="absolute top-[37%] left-1/2 transform -translate-x-1/2 md:left-[200px] md:translate-x-0 text-center md:text-left p-4">
                                    <span className={`text-lg md:text-[28px] font-[Poppins] mb-2 md:mb-4`}>Men's New-Season</span>
                                    <h2 className={`text-3xl md:text-[60px] font-semibold text-[#333333] mb-2 md:mb-4 font-[Playfair_Display]`}>JACKETS
                                        & COATS</h2>
                                    <Button
                                        className={`bg-[#717fe0] transition-all duration-300 hover:bg-[#222222] text-[15px] text-white px-6 md:px-9 rounded-full font-[Poppins] py-4 md:py-6 cursor-pointer`}>SHOP
                                        NOW</Button>
                                </div>
                            </div>
                        </CarouselItem>

                        <CarouselItem>
                            <div className={`relative h-[100vh] w-full bg-[url(/slider-imgs/slider-03.jpg)] bg-cover bg-center`}>
                                <div
                                    className="absolute top-[37%] left-1/2 transform -translate-x-1/2 md:left-[200px] md:translate-x-0 text-center md:text-left p-4">
                                <span className={`text-lg md:text-[28px] font-[Poppins] mb-2 md:mb-4`}>Men's Collection</span>
                                    <h2 className={`text-3xl md:text-[60px] font-semibold text-[#333333] mb-2 md:mb-4 font-[Playfair_Display]`}>NEW
                                        ARRIVALS</h2>
                                    <Button
                                        className={`bg-[#717fe0] transition-all duration-300 hover:bg-[#222222] text-[15px] text-white px-6 md:px-9 rounded-full font-[Poppins] py-4 md:py-6 cursor-pointer`}>SHOP
                                        NOW</Button>
                                </div>
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious
                        className={`absolute left-2 md:left-0 opacity-100 transition-all duration-400 hover:bg-transparent border-0 hover:border-0 hover:text-[#717FE0] bg-transparent text-[#0000004d] w-[50px] h-[50px] md:w-[80px] md:h-[80px] [&_svg]:!size-8 md:[&_svg]:!size-18 flex items-center justify-center`}/>
                    <CarouselNext
                        className={`absolute right-2 md:right-0 opacity-100 transition-all duration-400 hover:bg-transparent border-0 hover:border-0 hover:text-[#717FE0] bg-transparent text-[#0000004d] w-[50px] h-[50px] md:w-[80px] md:h-[80px] [&_svg]:!size-8 md:[&_svg]:!size-18 flex items-center justify-center`}/>
                </Carousel>
            </div>
        </>
    );
}
