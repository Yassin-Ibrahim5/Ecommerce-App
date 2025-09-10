"use client";
import React from 'react';
import {SessionProvider} from "next-auth/react";
import CartContextProvider from "@/app/context/CartContext";
import {Toaster} from "react-hot-toast";
import WishlistContextProvider from "@/app/context/WishlistContext";
import OrdersContextProvider from "@/app/context/OrdersContext";

export function AuthProvider({children}: { children: React.ReactNode }) {
    return <SessionProvider>
        <CartContextProvider>
            <WishlistContextProvider>
                <OrdersContextProvider>
                    {children}
                </OrdersContextProvider>
            </WishlistContextProvider>
        </CartContextProvider>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </SessionProvider>
}