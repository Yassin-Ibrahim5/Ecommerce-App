"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getUserOrders} from "@/actions/orders.action";
import {Order} from "@/app/types/orders.model";

interface OrdersContextType {
    orders: Order[] | null;
    fetchOrders: () => Promise<void>;
    loading: boolean;
}

const OrdersContext = createContext<OrdersContextType>({
    orders: null,
    fetchOrders: async () => {
    },
    loading: true
});

export default function OrdersContextProvider({children}: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchOrders() {
        const userId = localStorage.getItem("userID") as string;
        if (userId) {
            const response = await getUserOrders(userId);
            setOrders(response?.data);
            setLoading(false);
            return response?.data;
        } else {
            setOrders([]);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders().then();
    }, []);

    return <OrdersContext.Provider value={{orders, fetchOrders, loading}}>
        {children}
    </OrdersContext.Provider>
};

export function useOrders() {
    return useContext(OrdersContext);
}