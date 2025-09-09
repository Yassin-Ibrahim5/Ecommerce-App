import React from 'react';
import {Product} from "@/app/types/product.model";
import ProductCard from "@/components/products-comps/ProductCard";

export default function ProductsGridSystem({products}: { products: { data: Product[], } }) {
    return (
        <div className={`container mx-auto p-10`}>
            <h2 className="text-4xl text-start tracking-tighter font-bold">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products?.data?.map((product) => <ProductCard key={product._id} product={product}/>)}
            </div>
        </div>
    );
}

