"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {Wishlist} from "@/app/types/wishlist.model";
import {getWishlist} from "@/actions/wishlist.action";
import {getUserToken} from "@/lib/token.utils";

interface WishlistContextType {
    wishlist: Wishlist | null;
    fetchWishlist: () => Promise<void>;
    loading: boolean;
}

const WishlistContext = createContext<WishlistContextType>({
    wishlist: null,
    fetchWishlist: async () => {
    },
    loading: true,
});

export default function WishlistContextProvider({children}: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);
    async function fetchWishlist() {
        const token = await getUserToken();
        if (!token) {
            setLoading(false);
            return;
        }
        const response = await getWishlist();
        setWishlist(response?.data);
        setLoading(false);
        return response?.data;
    }

    useEffect(() => {
        fetchWishlist();
    }, []);

    return <WishlistContext.Provider value={{wishlist, fetchWishlist, loading}}>
        {children}
    </WishlistContext.Provider>
}

export function useWishlist() {
    return useContext(WishlistContext);
}