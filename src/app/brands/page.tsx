import React from 'react';
import {getBrands} from "@/actions/brands.action";
import BrandsGridSystem from "@/components/brands-comps/BrandsGridSystem";

export default async function BrandsPage() {
    const response = await getBrands();
    return <div><BrandsGridSystem brands={response?.data}/></div>;
}