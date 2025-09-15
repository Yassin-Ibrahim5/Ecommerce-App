import React from 'react';
import OrdersTable from "@/components/orders-comps/OrdersTable";

export default async function AllOrders() {
    return (
        <div className={`my-25`}>
            <OrdersTable/>
        </div>
    );
}

