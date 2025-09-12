import React from 'react';
import OrdersTable from "@/components/orders-comps/OrdersTable";

export default async function AllOrders() {

    //
    // if (userId) {
    //     const orders = await getUserOrders(userId);
    //     console.log(orders, "orders");
    // }
    return (
        <div>
            <OrdersTable/>
        </div>
    );
}

