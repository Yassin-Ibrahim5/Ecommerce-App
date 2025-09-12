"use server";
import React from 'react';
import {getProductDetails} from "@/actions/products.action";
import ProductDetailsComp from "@/components/products-comps/ProductDetailsComp";

export default async function ProductDetails({params}: { params: { id: string } }) {
    const {id} = params;
    const {data : productDetails} = await getProductDetails(id);
    return (
        <div className={`container mx-auto`}>
            <ProductDetailsComp productDetails={productDetails}/>
        </div>
    );
}
