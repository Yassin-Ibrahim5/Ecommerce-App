"use client";
import {NavigationMenu, NavigationMenuItem, NavigationMenuList,} from "@/components/ui/navigation-menu";
import React, {useEffect, useState} from "react";
import {
    ClipboardList,
    Heart,
    LogIn,
    LogOut,
    Menu,
    ShoppingCart,
    User,
    UserCog,
    UserPen,
    UserPlus,
    XIcon
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {Badge} from "@/components/ui/badge";
import {useCart} from "@/app/context/CartContext";
import {useWishlist} from "@/app/context/WishlistContext";
import {usePathname} from "next/navigation";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import {removeFromCart} from "@/actions/cart.action";
import toast from "react-hot-toast";

export default function Navbar() {
    const session = useSession();

    const {cartDetails, fetchCart} = useCart();
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

    async function handleRemoveFromCart(productId: string) {
        try {
            const response = await removeFromCart(productId);
            await fetchCart();
            toast.success("Product removed successfully from your cart");
            return response;
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div
            className={`max-w-[100vw] flex justify-between items-center py-2 px-4 md:px-10 fixed w-full top-0 z-50 ${scrolled ? "bg-white shadow-sm" : "bg-transparent"} transition-all duration-300`}>
            {/*Logo and Desktop Menu*/}
            <NavigationMenu
                className={`text-md p-3 md:p-5 flex justify-between max-w-7xl gap-3 lg:gap-0 items-center mx-auto w-full`}>
                <NavigationMenuList className={`font-[Poppins] gap-6 md:gap-12`}>
                    <NavigationMenuItem>
                        <Link href={`/`}
                              className={`uppercase text-2xl md:text-3xl tracking-normal font-[Poppins]`}><span
                            className={`font-bold`}>Snap</span><span className={`font-normal`}>Cart</span></Link>
                    </NavigationMenuItem>
                    {/*Desktop Menu Links (hidden on smaller screens)*/}
                    <div className={`hidden md:flex items-center gap-6`}>
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
                        <NavigationMenuItem>
                            <Link href="/about"
                                  className={`hover:text-[#717fe0] transition-all duration-400 ${isActive('/about') ? 'text-[#717Fe0]' : ''}`}>About</Link>
                        </NavigationMenuItem>
                    </div>
                </NavigationMenuList>

                {/*Icons and Mobile Menu Trigger*/}
                <NavigationMenuList className={`font-bold gap-4 font-[Poppins]`}>
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className={`hidden md:block`}>
                                {cartDetails?.numOfCartItems ?
                                    <Badge
                                        className={`absolute -top-4 bg-[#717FE0] text-white`}>{cartDetails?.numOfCartItems}</Badge> :
                                    null}
                                <ShoppingCart
                                    className={`hover:text-[#717fe0] text-[#222] fill-[#222] cursor-pointer hover:fill-[#717FE0] transition-all duration-400 ${isActive('/cart') ? 'text-[#717FE0] fill-[#717FE0]' : ''}`}/>
                            </button>
                        </SheetTrigger>
                        <SheetContent
                            className={`w-full sm:w-[390px] max-w-[100vw] max-h-[100vh] font-[Poppins] py-1 px-2 md:py-7 md:px-10 flex`}
                            side="right">
                            <SheetHeader
                                className={`flex flex-row md:justify-between justify-start items-center gap-2`}>
                                <SheetTitle className={`text-[#333] leading-6 text-[18px] font-bold uppercase`}>Your
                                    Cart</SheetTitle>
                                <SheetClose className={`top-0 right-0 md:top-4`} asChild>
                                    <XIcon
                                        className={`size-8 md:size-8 text-[#333] cursor-pointer hover:text-[#717fe0] transition-all duration-400`}/>
                                </SheetClose>
                            </SheetHeader>
                            {cartDetails?.numOfCartItems !== 0 ?
                                (<ul className="w-full flex flex-col list-none">
                                    {cartDetails?.data.products.slice(0, 4).map((product) => (
                                        <li key={product._id} className={`flex items-start flex-wrap mb-3`}>
                                            <div
                                                onClick={() => {
                                                    handleRemoveFromCart(product.product._id).then();
                                                }}
                                                className={`w-15 relative mr-5 cursor-pointer 
                                                after:opacity-0 after:absolute after:top-0 after:left-0 
                                                after:flex after:justify-center after:items-center after:w-full after:h-full 
                                                after:bg-[#00000080] after:transition-all after:duration-400 hover:after:opacity-100 
                                                after:content-["X"] after:text-white`}>
                                                <Image src={product.product.imageCover} alt={product.product.title}
                                                       width={60} height={60}
                                                       className={``}/>
                                            </div>
                                            <div className={`w-[calc(100%-80px)] pt-2`}>
                                                <SheetClose asChild>
                                                    <Link href={`/products/${product.product._id}`}
                                                          className={`text-[#555] text-[14px] block hover:text-[#717FE0] mb-[18px] transition-all duration-400`}>
                                                        {product.product.title.split(" ").slice(0, 2).join(" ")}
                                                    </Link>
                                                </SheetClose>
                                                <span
                                                    className={`text-[#888] text-[14px] leading-[1.5]`}>{product.count} x {product.price} EGP</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>) : (
                                    <div
                                        className={`w-full text-center mx-auto mt-5 flex flex-col items-center justify-center gap-5`}>
                                        <h2 className={`text-2xl font-bold`}>Your cart is empty</h2>
                                        <p className={`text-[#888] text-md leading-6`}>
                                            Add items to your cart to view and checkout</p>
                                        <Link href={`/`}
                                              className={`text-[#717fe0] hover:underline text-md`}>
                                            Continue Shopping
                                        </Link>
                                    </div>
                                )
                            }
                            {cartDetails?.numOfCartItems && cartDetails.numOfCartItems > 4 && (
                                <div className={`w-full text-center mx-auto mt-5 flex flex-col gap-5`}>

                                    <Link href={`/cart`}
                                          className={`text-lg font-bold text-start hover:text-[#717FE0] transition-all duration-400`}>
                                        <SheetClose className={`cursor-pointer`}>
                                            View Full Cart
                                        </SheetClose>
                                    </Link>
                                </div>
                            )}
                            <SheetFooter
                                className={`w-full max-w-[100vw] max-h-[100vh] py-1 px-0 font-[Poppins] flex`}>
                                <div className={`py-10 text-[18px] text-[#222] leading-6 w-full`}>
                                    Total: {cartDetails?.data.totalCartPrice} EGP
                                </div>
                                <div className="flex md:justify-center justify-start items-center w-full gap-2">
                                    <SheetClose asChild>
                                        <Link href={`/cart`}>
                                            <Button
                                                className={`hover:bg-[#717fe0] transition-all duration-300 bg-[#222222] text-[15px] text-white px-3 md:px-9 rounded-[20px] uppercase font-poppins py-2 md:py-[22px] cursor-pointer`}>
                                                View Cart</Button>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href={`/checkout`}>
                                            <Button
                                                className={`hover:bg-[#717fe0] transition-all duration-300 bg-[#222222] text-[15px] text-white px-3 md:px-9 rounded-[20px] uppercase font-poppins py-2 md:py-[22px] cursor-pointer`}>
                                                Checkout</Button>
                                        </Link>
                                    </SheetClose>
                                </div>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                    <button className={`md:hidden`}>
                        {cartDetails?.numOfCartItems ?
                            <Badge
                                className={`absolute -top-4 bg-[#717FE0] text-white`}>{cartDetails?.numOfCartItems}</Badge> :
                            null}
                        <Link href="/cart"><ShoppingCart
                            className={`hover:text-[#717fe0] text-[#222] fill-[#222] cursor-pointer hover:fill-[#717FE0] transition-all duration-400 ${isActive('/cart') ? 'text-[#717FE0] fill-[#717FE0]' : ''}`}/></Link>

                    </button>
                    <button>
                        {wishlist?.count ?
                            <Badge className={`absolute -top-4 bg-[#717FE0] text-white`}>{wishlist.count}</Badge> :
                            null}
                        <Link href="/wishlist"><Heart
                            className={`hover:text-[#717fe0] transition-all duration-400 ${isActive('/wishlist') ? 'text-[#717Fe0]' : ''}`}/></Link>
                    </button>
                    <DropdownMenu>
                        <DropdownMenuTrigger><User
                            className={`focus:border-0 cursor-pointer hover:text-[#717fe0] transition-all duration-200`}
                            size={27}/></DropdownMenuTrigger>
                        <DropdownMenuContent className={`font-[Poppins]`}>
                            <DropdownMenuLabel className={`font-semibold`}>Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {session.data ?
                                <>
                                    <DropdownMenuItem>
                                        <Link href="/allorders"
                                              className="font-normal flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
                                            <ClipboardList/>Orders
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/change-password"
                                              className="font-normal flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
                                            <UserPen/>Change Password
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/change-data"
                                              className="font-normal flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
                                            <UserCog/>Change User Data
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/"
                                              className="font-normal flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200"
                                              onClick={() => signOut({callbackUrl: "/login"})}>
                                            <LogOut/>Log Out
                                        </Link>
                                    </DropdownMenuItem>
                                </> :
                                <>
                                    <DropdownMenuItem>
                                        <Link href="/register"
                                              className="font-normal flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
                                            <UserPlus/>Register
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/login"
                                              className="font-normal flex justify-between items-center gap-1 hover:text-[#717fe0] transition-all duration-200">
                                            <LogIn/>Log In
                                        </Link>
                                    </DropdownMenuItem>
                                </>}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className={`md:hidden`}>
                                <Menu className={`hover:text-[#717fe0] transition-all duration-400`}/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className={`w-[250px] sm:w-[300px] flex font-[Poppins] p-5`} side={`right`}>
                            <SheetHeader className={`flex flex-row justify-between items-start gap-2`}>
                                <SheetTitle className={`text-[#333] leading-6 text-[18px] font-bold uppercase`}>
                                    <Image src="/logo.png" alt="SnapCart Logo" width={30} height={30}/>
                                </SheetTitle>
                                <SheetClose className={`top-0 right-0 md:top-4 md:right-4`} asChild>
                                    <XIcon
                                        className={`size-6 text-[#333] cursor-pointer hover:text-[#717fe0] transition-all duration-400`}/>
                                </SheetClose>
                            </SheetHeader>
                            <div className="w-full ml-4 mr-auto mt-5 flex flex-col justify-center gap-4">
                                <SheetClose asChild>
                                    <Link href={`/`}
                                          className={`text-[#555] text-[16px] block hover:text-[#717FE0] mb-[18px] transition-all duration-400`}>Home</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/products"
                                          className={`text-[#555] text-[16px] block hover:text-[#717FE0] mb-[18px] transition-all duration-400`}>Shop</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/categories"
                                          className={`text-[#555] text-[16px] block hover:text-[#717FE0] mb-[18px] transition-all duration-400`}>Categories</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/brands"
                                          className={`text-[#555] text-[16px] block hover:text-[#717FE0] mb-[18px] transition-all duration-400`}>Brands</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/about"
                                          className={`text-[#555] text-[16px] block hover:text-[#717FE0] mb-[18px] transition-all duration-400`}>About</Link>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </NavigationMenuList>
            </NavigationMenu>

        </div>
    )
}