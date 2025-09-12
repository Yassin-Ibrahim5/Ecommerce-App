import React from 'react';
import {getCategories} from "@/actions/categories.action";
import CategoriesGridSystem from "@/components/categories-comps/CategoriesGridSystem";

export default async function CategoriesPage() {
    const response = await getCategories();

    return <div><CategoriesGridSystem categories={response?.data}/></div>;
}