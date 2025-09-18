"use client";
import React, {useState} from 'react';
import {Product} from "@/app/types/product.model";
import ProductCard from "@/components/products-comps/ProductCard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function ProductsGridSystem({products}: { products: { data: Product[], } }) {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    function renderPageGrid(filteredProducts: Product[]) {
        const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
        const pageProducts = filteredProducts?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {pageProducts?.map((product) => (
                        <ProductCard product={product} key={product._id}/>
                    ))}
                </div>
                {totalPages > 1 && (
                    <div className="mt-10">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}/>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink isActive>{currentPage}</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}/>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </>
        )
    }

    return (
        <div className={`w-full md:w-[85%] mt-10 md:mt-15 mx-auto py-10 px-4 md:px-10`}>
            <h2 className="text-3xl md:text-4xl mb-5 text-start font-bold uppercase font-[Poppins] text-[#222222] px-4">Products
                Overview</h2>
            <Tabs className={`font-[Poppins] transition-all duration-400`} defaultValue={"all-products"}
                  onValueChange={() => setCurrentPage(1)}>
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
                    {renderPageGrid(products.data)}
                </TabsContent>
                <TabsContent value={"mens-fashion"} className={`transition-all duration-400 p-4 md:p-0`}>
                    {renderPageGrid(products.data.filter((product) => product.category.name === "Men's Fashion"))}
                </TabsContent>
                <TabsContent value={"women's-fashion"} className={`transition-all duration-400 p-4 md:p-0`}>
                    {renderPageGrid(products.data.filter((product) => product.category.name === "Women's Fashion"))}
                </TabsContent>
                <TabsContent value={"electronics"} className={`transition-all duration-400 p-4 md:p-0`}>
                    {renderPageGrid(products.data.filter((product) => product.category.name === "Electronics"))}
                </TabsContent>
            </Tabs>
        </div>
    );
}

