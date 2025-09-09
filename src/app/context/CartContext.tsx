"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getUserCart} from "@/actions/cart.action";

const CartContext = createContext({});

export default function CartContextProvider({children}: { children: React.ReactNode }) {

    const [cartDetails, setCartDetails] = useState(null);
    async function fetchCart() {
        const response = await getUserCart();
        setCartDetails(response?.data);
        console.log(response?.data, "response");
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