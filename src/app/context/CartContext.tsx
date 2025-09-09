"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getUserCart} from "@/actions/cart.action";
import {CartData} from "@/app/types/cart.model";

interface CartContextType {
    cartDetails: CartData | null;
}

const CartContext = createContext<CartContextType>({
    cartDetails: null,
});

export default function CartContextProvider({children}: { children: React.ReactNode }) {

    const [cartDetails, setCartDetails] = useState(null);
    async function fetchCart() {
        const response = await getUserCart();
        setCartDetails(response?.data);
        console.log(response?.data, "cart");
    }

    useEffect(() => {
        fetchCart();
    }, []);

    return <CartContext.Provider value={{cartDetails}}>
        {children}
    </CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}