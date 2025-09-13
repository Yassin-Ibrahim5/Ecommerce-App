import React from 'react';
import {Brand} from "@/app/types/brands.model";
import BrandCard from "@/components/brands-comps/BrandCard";

function BrandsGridSystem({brands} : {brands: { data: Brand[]}}) {
    return (
        <div className={`w-[85%] mx-auto p-10 mt-15`}>
            <h2 className="text-4xl mb-5 text-start font-bold uppercase font-[Poppins] text-[#222222]">Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-7">
                {brands?.data?.map((brand) => <BrandCard key={brand._id} brand={brand}/>)}
            </div>
        </div>
    );
}

export default BrandsGridSystem;