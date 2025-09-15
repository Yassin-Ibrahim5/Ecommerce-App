"use server";
import React from 'react';
import {getProductDetails} from "@/actions/products.action";
import ProductDetailsComp from "@/components/products-comps/ProductDetailsComp";

export default async function ProductDetails({params}: { params: { id: string } }) {
    const {id} = await params;
    const {data : productDetails} = await getProductDetails(id);
    return (
        <div className={`w-3/4 mx-auto my-25`}>
            <ProductDetailsComp productDetails={productDetails}/>
        </div>
    );
}
