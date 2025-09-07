"use client";
import React from 'react';
import {SessionProvider} from "next-auth/react";
import CartContextProvider from "@/app/context/CartContext";

export function AuthProvider({children}: { children: React.ReactNode }) {
    return <SessionProvider>
        <CartContextProvider>
            {children}
        </CartContextProvider>
    </SessionProvider>
}