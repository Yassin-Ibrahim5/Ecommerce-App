"use client";
import React from 'react';
import Link from "next/link";
import {Brand} from "@/app/types/brands.model";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

function BrandCard({brand}: { brand: Brand }) {
    return (
        <Link href={`/brands`}>
            <Card
                className={`relative group overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500`}>
                <CardContent>
                    <div className="relative w-full h-[200px]">
                        <Image src={brand.image} alt={brand.name} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25vw" priority loading={"eager"}
                               className="object-contain"/>
                    </div>
                </CardContent>
                <CardHeader>
                    <CardTitle className={`text-2xl font-semibold text-center`}>{brand.name}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    );
}

export default BrandCard;