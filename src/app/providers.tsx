"use client";
import React from "react";
import {Playfair_Display, Poppins} from "next/font/google";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair-display',
})

export function FontProviders({children}: { children: React.ReactNode }) {
    return (
        <div className={`${poppins.variable} ${playfair.variable}`}>
            {children}
        </div>);
}