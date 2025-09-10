"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getUserCart} from "@/actions/cart.action";
import {CartData} from "@/app/types/cart.model";
import {getUserToken} from "@/lib/token.utils";

interface CartContextType {
    cartDetails: CartData | null;
    fetchCart: () => Promise<void>;
    setCartDetails: (cartDetails: CartData | null) => void;
}

const CartContext = createContext<CartContextType>({
    cartDetails: null,
    fetchCart: async () => {
    },
    setCartDetails: (cartDetails: CartData | null) => {
    }
});

export default function CartContextProvider({children}: { children: React.ReactNode }) {

    const [cartDetails, setCartDetails] = useState<CartData | null>(null);

    async function fetchCart() {
        const token = await getUserToken();
        if (!token) {
            return;
        }
        const response = await getUserCart();
        setCartDetails(response?.data);
        console.log(response?.data, "cart");
        return response?.data;
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return <CartContext.Provider value={{cartDetails, fetchCart, setCartDetails}}>
        {children}
    </CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}