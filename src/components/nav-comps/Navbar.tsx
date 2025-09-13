"use client";
import {NavigationMenu, NavigationMenuItem, NavigationMenuList,} from "@/components/ui/navigation-menu";
import React, {useEffect, useState} from "react";
import {Heart, LogIn, LogOut, ShoppingCart, User, UserCog, UserPen, UserPlus} from "lucide-react";
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
import {useWishlist} from "@/app/context/WishlistContext";
import {usePathname} from "next/navigation";

export default function Navbar() {
    const session = useSession();

    const {cartDetails} = useCart();
    const {wishlist} = useWishlist();
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function isActive(path: string) {
        if (path === '/') return pathname === path;
        return pathname.startsWith(path);
    }
    return (
        <div
            className={`flex justify-between items-center py-1 px-10 fixed w-full top-0 z-50 ${scrolled ? "bg-white shadow-sm" : "bg-transparent"} transition-all duration-300`}>
            <NavigationMenu className={`text-md p-5 flex justify-between max-w-7xl items-center mx-auto`}>
                <NavigationMenuList className={`font-[Poppins] gap-12`}>
                    <NavigationMenuItem>
                        <Link href={`/`} className={`uppercase text-3xl tracking-normal font-[Poppins]`}><span
                            className={`font-bold`}>Snap</span><span className={`font-normal`}>Cart</span></Link>
                    </NavigationMenuItem>
                    <div className={`flex items-center gap-6`}>
                        <NavigationMenuItem>
                            <Link href="/"
                                  className={`hover:text-[#717fe0] transition-all duration-400 ${isActive('/') ? 'text-[#717Fe0]' : ''}`}>Home</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/products"
                                  className={`hover:text-[#717fe0] transition-all duration-400 ${isActive('/products') ? 'text-[#717Fe0]' : ''}`}>Shop</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/categories"
                                  className={`hover:text-[#717fe0] transition-all duration-400 ${isActive('/categories') ? 'text-[#717Fe0]' : ''}`}>Categories</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/brands"
                                  className={`hover:text-[#717fe0] transition-all duration-400 ${isActive('/brands') ? 'text-[#717Fe0]' : ''}`}>Brands</Link>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>
                <NavigationMenuList className={`font-bold gap-4`}>
                    <button>
                        {cartDetails?.numOfCartItems ?
                            <Badge className={`absolute -top-4 bg-[#717FE0] text-white`}>{cartDetails?.numOfCartItems}</Badge> :
                            null}
                        <Link href="/cart"><ShoppingCart
                            className="hover:text-[#717fe0] text-[#222] fill-[#222] hover:fill-[#717FE0] transition-all duration-200"/></Link>
                    </button>
                    <button>
                        {wishlist?.count ?
                            <Badge className={`absolute -top-4 bg-[#717FE0] text-white`}>{wishlist.count}</Badge> :
                            null}
                        <Link href="/wishlist"><Heart
                            className="hover:text-[#717fe0] transition-all duration-200"/></Link>
                    </button>
                    <DropdownMenu>
                        <DropdownMenuTrigger><User
                            className={`focus:border-0 cursor-pointer hover:text-[#717fe0] transition-all duration-200`}
                            size={27}/></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className={`font-bold`}>Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {session.data ?
                                <>
                                    <DropdownMenuItem>
                                        <Link href="/change-password"
                                              className="font-semibold flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
                                            <UserPen/>Change Password
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/change-data"
                                              className="font-semibold flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
                                            <UserCog/>Change User Data
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/"
                                              className="font-semibold flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200"
                                              onClick={() => signOut({callbackUrl: "/login"})}>
                                            <LogOut/>Log Out
                                        </Link>
                                    </DropdownMenuItem>
                                </> :
                                <>
                                    <DropdownMenuItem>
                                        <Link href="/register"
                                              className="font-semibold flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
                                            <UserPlus/>Register
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/login"
                                              className="font-semibold flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
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