"use client";
import React, {useState, useContext, createContext, useEffect} from "react";
import {Orders} from "@/app/types/orders.model";
import {useCart} from "@/app/context/CartContext";
import {getUserOrders} from "@/actions/orders.action";
import {getUserToken} from "@/lib/token.utils";


interface OrdersContextType {
    orders: Orders | null;
    fetchOrders: () => Promise<void>;
}

export const OrdersContext = createContext<OrdersContextType>({
    orders: null,
    fetchOrders: async() => {}
});

export default function OrdersContextProvider({children}: { children: React.ReactNode }) {
    const [orders, setOrders] = useState(null);
    const {cartDetails} = useCart();
    async function fetchOrders() {
        const token = await getUserToken();
        if (!token) {
            return;
        }
        const response = await getUserOrders(cartDetails?.data.cartOwner as string);
        setOrders(response?.data);
        console.log(response?.data, "orders");
        return response?.data;
    }

    useEffect(() => {
        fetchOrders();
    }, []);
    return <OrdersContext.Provider value={{orders, fetchOrders}}>
        {children}
    </OrdersContext.Provider>
}

export function useOrders() {
    return useContext(OrdersContext);
}