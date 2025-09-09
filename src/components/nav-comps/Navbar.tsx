"use client";
import {NavigationMenu, NavigationMenuItem, NavigationMenuList,} from "@/components/ui/navigation-menu";

import React from "react";
import {Heart, LogIn, LogOut, ShoppingCart, User, UserPlus} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Badge} from "@/components/ui/badge";
import {useCart} from "@/app/context/CartContext";

export default function Navbar() {
    const session = useSession();

    const {cartDetails} = useCart();
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
                        <Link href="/categories" className="font-semibold">Categories</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/brands" className="font-semibold">Brands</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList className={`font-bold gap-4`}>
                    <button>
                        <Badge className={`absolute -top-4`}>0</Badge>
                        <Link href="/"><Heart className="hover:text-red-600 transition-all duration-200"/></Link>
                    </button>
                    <button>
                        {cartDetails?.numOfCartItems && <Badge className={`absolute -top-4`}>{cartDetails?.numOfCartItems}</Badge>}
                        <Link href="/cart"><ShoppingCart className="hover:text-blue-600 transition-all duration-200"/></Link>
                    </button>
                    <DropdownMenu>
                        <DropdownMenuTrigger><User className={`focus:border-0 cursor-pointer`}
                                                   size={27}/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className={`font-bold`}>Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {session.data ? <DropdownMenuItem>
                                    <Link href="/" className="font-semibold flex justify-between items-center gap-1"
                                          onClick={() => signOut({callbackUrl: "/login"})}>
                                        <LogOut/>Log Out
                                    </Link>
                                </DropdownMenuItem> :
                                <>
                                    <DropdownMenuItem>
                                        <Link href="/register"
                                              className="font-semibold flex justify-between items-center gap-1">
                                            <UserPlus/>Register
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/login"
                                              className="font-semibold flex justify-between items-center gap-1">
                                            <LogIn/>Log In
                                        </Link>
                                    </DropdownMenuItem>
                                </>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </NavigationMenuList>

            </NavigationMenu>
        </div>
    )
}