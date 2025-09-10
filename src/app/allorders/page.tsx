import React from 'react';
import {useCart} from "@/app/context/CartContext";
import {getUserOrders} from "@/actions/orders.action";
import OrderTable from "@/components/orders-comps/OrderTable";

export default async function AllOrders() {
    return (
        <div>
            <OrderTable/>
        </div>
    );
}

