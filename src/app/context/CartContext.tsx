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
    setCartDetails: () => {
    },
    loading: true
});

export default function CartContextProvider({children}: { children: React.ReactNode }) {

    const [cartDetails, setCartDetails] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(true);
    async function fetchCart() {
        try {
            const token = await getUserToken();
            if (!token) {
                setLoading(false);
                return;
            }

            const existingID = localStorage.getItem("userID");
            const response = await getUserCart();
            console.log("Full response", response);
            if (response.data && response.data.data) {
                setCartDetails(response.data);
                const userID = response?.data.data.cartOwner;
                if (userID && !existingID) {
                    localStorage.setItem("userID", userID);
                }
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCartDetails(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCart().then();
    }, []);

    return <CartContext.Provider value={{cartDetails, fetchCart, setCartDetails, loading}}>
        {children}
    </CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}