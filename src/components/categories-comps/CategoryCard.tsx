"use client";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Category} from "@/app/types/category.model";
import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({category}: { category: Category }) {
    return (
        <Link href={`/products`}>
            <Card
                className={`relative group overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-500`}>
                <CardContent>
                    <div className="relative w-full h-[400px]">
                        <Image src={category.image} alt={category.name} fill
                               sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 25vw" priority loading={"eager"}
                               className="object-cover"/>
                    </div>
                </CardContent>
                <CardHeader>
                    <CardTitle className={`text-2xl font-semibold font-[Poppins]`}>{category.name}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}
