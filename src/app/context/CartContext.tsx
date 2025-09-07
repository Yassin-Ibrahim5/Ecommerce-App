import React, {createContext, useContext, useState, useEffect} from "react";
import getUserCart from "@/actions/cart.action";

const CartContext = createContext({});

export default function CartContextProvider({children} : {children: React.ReactNode}) {
    const [cartDetails, setCartDetails] = useState(null);

    async function fetchCart() {
        const response = await getUserCart();
        console.log(response, "responseeeeeeeeeeeeeeee");
        setCartDetails(response?.data);
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