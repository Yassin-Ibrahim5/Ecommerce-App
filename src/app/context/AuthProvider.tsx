"use client";
import React from 'react';
import {SessionProvider} from "next-auth/react";
import CartContextProvider from "@/app/context/CartContext";
import {Toaster} from "react-hot-toast";

export function AuthProvider({children}: { children: React.ReactNode }) {
    return <SessionProvider>
        <CartContextProvider>
            {children}
        </CartContextProvider>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </SessionProvider>
}