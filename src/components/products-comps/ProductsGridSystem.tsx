import React from 'react';
import {Product} from "@/app/types/product.model";

export default function ProductsGridSystem({products} : { products: Product[] }) {
    console.log(products, "products through grid system");
    return (
        <div className={`container mx-auto`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">

            </div>
        </div>
    );
}

