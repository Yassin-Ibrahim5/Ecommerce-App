import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import React from "react";
import {ShoppingCart, Heart} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className={`flex justify-between items-center py-5 px-10`}>

            <Link href="/" className={`text-2xl font-bold`}>Ecommerce</Link>
            <NavigationMenu>
                <NavigationMenuList className={`flex gap-6`}>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/home" className="font-semibold">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/products" className="font-semibold">Products</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/cart" className="font-semibold">Cart</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/categories" className="font-semibold">Categories</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/brands" className="font-semibold">Brands</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div className={`flex item gap-6`}>
                <ShoppingCart size={24}/>
                <Heart size={24}/>
            </div>
        </div>
    )
}