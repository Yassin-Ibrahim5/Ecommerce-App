import MainSlider from "@/components/sliders-comps/MainSlider";
import {getCategories} from "@/actions/categories.action";
import CatSliderComp from "@/components/sliders-comps/CatSliderComp";
import React from "react";
import {getProducts} from "@/actions/products.action";
import ProductsGridSystem from "@/components/products-comps/ProductsGridSystem";

export default async function Home() {
    const response = await getCategories();
    const categories = Array.isArray(response?.data?.data) ? response.data.data : [];

    const {data: products} = await getProducts();
    return (
        <>
            <MainSlider/>
            <div className={`my-5`}>
                <CatSliderComp category={categories}/>
            </div>
            <ProductsGridSystem products={products}/>
        </>
    );
}
