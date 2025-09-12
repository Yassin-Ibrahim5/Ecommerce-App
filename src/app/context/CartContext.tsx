"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getUserCart} from "@/actions/cart.action";
import {CartData} from "@/app/types/cart.model";
import {getUserToken} from "@/lib/token.utils";

interface CartContextType {
    cartDetails: CartData | null;
    fetchCart: () => Promise<void>;
    setCartDetails: (cartDetails: CartData | null) => void;
    loading: boolean;
}

const CartContext = createContext<CartContextType>({
    cartDetails: null,
    fetchCart: async () => {
    },
    setCartDetails: (cartDetails: CartData | null) => {
    },
    loading: true
});

export default function CartContextProvider({children}: { children: React.ReactNode }) {

    const [cartDetails, setCartDetails] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(true);
    async function fetchCart() {
        const token = await getUserToken();
        if (!token) {
            setLoading(false);
            return;
        }
        const response = await getUserCart();
        setCartDetails(response?.data);
        localStorage.setItem("userId", response?.data?.cartOwner);
        setLoading(false);
        return response?.data;
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return <CartContext.Provider value={{cartDetails, fetchCart, setCartDetails, loading}}>
        {children}
    </CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}