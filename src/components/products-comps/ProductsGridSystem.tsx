import React from 'react';
import {Product} from "@/app/types/product.model";
import ProductCard from "@/components/products-comps/ProductCard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function ProductsGridSystem({products}: { products: { data: Product[], } }) {
    return (
        <div className={`w-full md:w-[85%] mt-10 md:mt-15 mx-auto py-10 px-4 md:px-10`}>
            <h2 className="text-3xl md:text-4xl mb-5 text-start font-bold uppercase font-[Poppins] text-[#222222] px-4">Products
                Overview</h2>
            <Tabs className={`font-[Poppins] transition-all duration-400`} defaultValue={"all-products"}>
                <ScrollArea className={`md:hidden bg-transparent`}>
                    <TabsList
                        className={`flex justify-start items-center mb-[10px] bg-transparent border-none gap-2 md:gap-5`}>
                        <TabsTrigger value={"all-products"}
                                     className={`text-[#666] hover:text-[#333] text-[16px] data-[state=active]:text-[#333] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:underline transition-all duration-400 cursor-pointer`}>
                            All Products</TabsTrigger>
                        <TabsTrigger value={"mens-fashion"}
                                     className={`text-[#666] hover:text-[#333] text-[16px] data-[state=active]:text-[#333] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:underline transition-all duration-400 cursor-pointer`}>
                            Men's Fashion
                        </TabsTrigger>
                        <TabsTrigger value={"women's-fashion"}
                                     className={`text-[#666] hover:text-[#333] text-[16px] data-[state=active]:text-[#333] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:underline transition-all duration-400 cursor-pointer`}>
                            Women's Fashion
                        </TabsTrigger>
                        <TabsTrigger value={"electronics"}
                                     className={`text-[#666] hover:text-[#333] text-[16px] data-[state=active]:text-[#333] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:underline transition-all duration-400 cursor-pointer`}>
                            Electronics
                        </TabsTrigger>
                    </TabsList>
                    <ScrollBar orientation={"horizontal"}/>
                </ScrollArea>
                <TabsList
                    className={`hidden md:flex justify-start items-center my-[10px] bg-transparent border-none gap-2 md:gap-5`}>
                    <TabsTrigger value={"all-products"}
                                 className={`text-[#666] hover:text-[#333] text-[16px] data-[state=active]:text-[#333] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:underline transition-all duration-400 cursor-pointer`}>
                        All Products</TabsTrigger>
                    <TabsTrigger value={"mens-fashion"}
                                 className={`text-[#666] hover:text-[#333] text-[16px] data-[state=active]:text-[#333] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:underline transition-all duration-400 cursor-pointer`}>
                        Men's Fashion</TabsTrigger>
                    <TabsTrigger value={"women's-fashion"}
                                 className={`text-[#666] hover:text-[#333] text-[16px] data-[state=active]:text-[#333] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:underline transition-all duration-400 cursor-pointer`}>
                        Women's Fashion</TabsTrigger>
                    <TabsTrigger value={"electronics"}
                                 className={`text-[#666] hover:text-[#333] text-[16px] data-[state=active]:text-[#333] data-[state=active]:border-none data-[state=active]:shadow-none data-[state=active]:underline transition-all duration-400 cursor-pointer`}>
                        Electronics</TabsTrigger>
                </TabsList>
                <TabsContent value={"all-products"} className={`transition-all duration-400 p-4 md:p-0`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {products?.data?.map((product) => <ProductCard key={product._id} product={product}/>)}
                    </div>
                </TabsContent>
                <TabsContent value={"women's-fashion"} className={`transition-all duration-400 p-4 md:p-0`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {products.data.filter((product) => product.category.name === "Women's Fashion").map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value={"mens-fashion"} className={`transition-all duration-400 p-4 md:p-0`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {products.data.filter((product) => product.category.name === "Men's Fashion").map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value={"electronics"} className={`transition-all duration-400 p-4 md:p-0`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {products.data.filter((product) => product.category.name === "Electronics").map((product) => (
                            <ProductCard key={product._id} product={product}/>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

