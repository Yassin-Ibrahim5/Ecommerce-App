import React from 'react';
import {Brand} from "@/app/types/brands.model";
import BrandCard from "@/components/brands-comps/BrandCard";

function BrandsGridSystem({brands} : {brands: { data: Brand[]}}) {
    console.log(brands, "brands from grid");
    return (
        <div className={`container mx-auto p-10`}>
            <h2 className="text-4xl text-center tracking-tighter font-bold">Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-7">
                {brands?.data?.map((brand) => <BrandCard key={brand._id} brand={brand}/>)}
            </div>
        </div>
    );
}

export default BrandsGridSystem;