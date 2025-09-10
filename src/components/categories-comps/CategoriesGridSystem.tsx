import React from 'react';
import {Category} from "@/app/types/category.model";
import CategoryCard from "@/components/categories-comps/CategoryCard";

function CategoriesGridSystem({categories}: { categories: { data: Category[]}}) {
    console.log(categories, "categories from grid");
    return (
        <div className="container mx-auto p-10">
            <h2 className="text-4xl text-center tracking-tighter font-bold">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-5">
                {categories?.data?.map((category) => <CategoryCard key={category._id} category={category}/>)}
            </div>
        </div>
    );
}

export default CategoriesGridSystem;