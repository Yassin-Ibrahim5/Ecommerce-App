import React from 'react';
import {Product} from "@/app/types/product.model";
import ProductCard from "@/components/products-comps/ProductCard";

export default function ProductsGridSystem({products}: { products: { data: Product[], } }) {
    return (
        <div className={`w-[85%] mt-10 mx-auto p-10`}>
            <h2 className="text-4xl mb-5 text-start font-bold uppercase font-[Poppins] text-[#222222]">Products Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products?.data?.map((product) => <ProductCard key={product._id} product={product}/>)}
            </div>
        </div>
    );
}

