"use client";
import React, {createContext, useContext, useEffect, useState} from "react";
import {Wishlist} from "@/app/types/wishlist.model";
import {getWishlist} from "@/actions/wishlist.action";
import {getUserToken} from "@/lib/token.utils";

interface WishlistContextType {
    wishlist: Wishlist | null;
    fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType>({
    wishlist: null,
    fetchWishlist: async () => {
    }
});

export default function WishlistContextProvider({children}: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState(null);

    async function fetchWishlist() {
        const token = await getUserToken();
        if (!token) {
            return;
        }
        const response = await getWishlist();
        setWishlist(response?.data);
        console.log(response?.data, "wishlist");
        return response?.data;
    }

    useEffect(() => {
        fetchWishlist();
    }, []);

    return <WishlistContext.Provider value={{wishlist, fetchWishlist}}>
        {children}
    </WishlistContext.Provider>
}

export function useWishlist() {
    return useContext(WishlistContext);
}