import {NavigationMenu, NavigationMenuItem, NavigationMenuList,} from "@/components/ui/navigation-menu";

import React from "react";
import {Heart, ShoppingCart} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className={`flex justify-between items-center py-5 px-10`}>

            <NavigationMenu className={`text-md p-5 flex justify-between max-w-7xl items-center mx-auto`}>
                <NavigationMenuList className={`text-4xl font-semibold tracking-tighter`}>
                    <NavigationMenuItem>
                        <Link href={`/`}>SnapCart</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList className={`font-bold gap-5`}>
                    <NavigationMenuItem>
                        <Link href="/" className="font-semibold">Home</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/products" className="font-semibold">Products</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/cart" className="font-semibold">Cart</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/categories" className="font-semibold">Categories</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/brands" className="font-semibold">Brands</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList className={`font-bold gap-2`}>
                    <button>
                        <ShoppingCart/>
                    </button>
                    <button>
                        <Heart/>
                    </button>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}