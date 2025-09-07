import MainSlider from "@/components/sliders-comps/MainSlider";
import {getCategories} from "@/actions/categories.action";
import CatSliderComp from "@/components/sliders-comps/CatSliderComp";
import React from "react";
import {getProducts} from "@/actions/products.action";
import ProductsGridSystem from "@/components/products-comps/ProductsGridSystem";
import {getServerSession} from "next-auth";
import {OPTIONS} from "@/app/api/auth/[...nextauth]/route";
import getUserCart from "@/actions/cart.action";

export default async function Home() {
    const session = await getServerSession(OPTIONS);
    console.log(session, "session data");
    const response = await getCategories();
    const categories = Array.isArray(response?.data?.data) ? response.data.data : [];

    const {data: products} = await getProducts();

    await getUserCart();
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
