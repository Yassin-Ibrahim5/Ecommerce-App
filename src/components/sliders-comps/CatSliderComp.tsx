"use client";
import React from 'react';
import {Category} from "@/app/types/category.model";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";


function CatSliderComp({category}: { category: Category[] }) {
    return (
        <>
            <div className="mx-auto">
                <Carousel className="w-full max-w-[100vw]" opts={
                    {
                        align: "start",
                        loop: true,
                    }
                } plugins={
                    [
                        Autoplay({
                            delay: 3500
                        }),
                    ]
                }>
                    <CarouselContent>
                        {category.map((cat) => (
                            <CarouselItem className={`relative basis-full md:basis-1/2 xl:basis-1/4`} key={cat._id}>
                                <Card>
                                    <CardContent>
                                        <div className={`relative h-[450px] group`}>
                                            <Image src={cat.image} alt={cat.name} fill
                                                   sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25" priority
                                                   loading={"eager"}
                                                   className={`object-cover`}/>
                                            {/*<div*/}
                                            {/*    className={`absolute top-[0] left-[0] w-full h-full bg-[#6775d6cc] opacity-0 group-hover:opacity-100 transition-all duration-500`}>*/}
                                            {/*</div>*/}
                                            {/*<div*/}
                                            {/*    className={`absolute -bottom-[500px] w-full h-[450px] text-white group-hover:-bottom-[390px] text-center transition-all duration-600`}>*/}
                                            {/*    <Link href={"/products"}*/}
                                            {/*          className={`text-2xl font-[Poppins] hover:underline text-center font-semibold`}>Shop*/}
                                            {/*        Now</Link>*/}
                                            {/*</div>*/}
                                        </div>
                                        <p className={`text-2xl text-center font-[Poppins] font-semibold`}>{cat.name}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </>

    );
}

export default CatSliderComp;