"use client";
import React, {useEffect, useMemo, useState} from 'react';
import {useProductSearch} from "@/app/hooks/useProductSearch";
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
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";

type TabKey = "all-products" | "mens-fashion" | "women's-fashion" | "electronics";

export default function ProductsGridSystem({products}: { products: { data: Product[], } }) {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [term, setTerm] = useState('');
    const [activeTab, setActiveTab] = useState<TabKey>("all-products");

    const baseList = useMemo(() => {
        const all = products?.data ?? [];
        switch (activeTab) {
            case "mens-fashion":
                return all.filter((product) => product?.category.name === "Men's Fashion");
            case "women's-fashion":
                return all.filter((product) => product?.category.name === "Women's Fashion");
            case "electronics":
                return all.filter((product) => product?.category.name === "Electronics");
            default:
                return all;
        }
    }, [products.data, activeTab])

    const filtered = useProductSearch(baseList, term);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    function renderPageGrid(filteredProducts: Product[]) {
        const totalPages = Math.max(1, Math.ceil(filteredProducts?.length / itemsPerPage));
        const pageProducts = filteredProducts?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

        return (
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {pageProducts?.map((product) => (
                        <ProductCard product={product} key={product._id}/>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div
                            className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center text-md text-[#666] font-[Poppins] p-10">
                            No products found.
                        </div>
                    )}
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
            <div className="w-full sm:w-auto font-[Poppins]">
                <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]`}/>
                    <Input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        placeholder={`Search products...`}
                        className={`w-full sm:w-[260px] md:w-[320px] pl-9 pr-3 h-9 sm:h-10 bg-[#f6f7f9] text-[#222] text-sm rounded-2xl border border-[#e5e5e5] focus-visible:ring-[#717FE080] transition-all duration-400`}/>
                </div>
            </div>
            <Tabs className={`font-[Poppins] transition-all duration-400`}
                  value={activeTab}
                  onValueChange={(v) => setActiveTab(v as TabKey)}>
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
                    {renderPageGrid(filtered)}
                </TabsContent>
                <TabsContent value={"mens-fashion"} className={`transition-all duration-400 p-4 md:p-0`}>
                    {renderPageGrid(filtered)}
                </TabsContent>
                <TabsContent value={"women's-fashion"} className={`transition-all duration-400 p-4 md:p-0`}>
                    {renderPageGrid(filtered)}
                </TabsContent>
                <TabsContent value={"electronics"} className={`transition-all duration-400 p-4 md:p-0`}>
                    {renderPageGrid(filtered)}
                </TabsContent>
            </Tabs>
        </div>
    );
}

