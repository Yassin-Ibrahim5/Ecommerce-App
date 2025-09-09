"use server";
import CartTable from "@/components/cart-comps/CartTable";
import {getUserCart} from "@/actions/cart.action";

export default async function CartPage() {

    return <div>
        <CartTable/>
    </div>;
}