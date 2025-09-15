import React from 'react';
import Link from "next/link";
import {Facebook, Instagram, Twitter} from "lucide-react";

function Footer() {
    return (
        <footer className={`bg-[#222222] text-white font-[Poppins] pb-[32px] pt-[75px] bottom-0 w-full`}>
            <div className="container mx-auto px-[75px]">
                <div className="grid justify-between grid-cols-1 lg:grid-cols-3 w-full gap-5">
                    <div className={`categories pb-[50px] relative w-full px-[15px]`}>
                        <h4 className={`font-[Montserrat] leading-[1.6] uppercase text-[15px] font-bold`}>Categories</h4>
                        <ul className={`list-none mt-[20px] text-[#999]`}>
                            <li className={`pb-[10px]`}>
                                <Link href={`/categories`}
                                      className={`text-[13px] font-[Poppins] hover:text-[#717FE0] transition-all duration-400`}>
                                    Women's
                                </Link>
                            </li>
                            <li className={`pb-[10px]`}>
                                <Link href={`/categories`}
                                      className={`text-[13px] font-[Poppins] hover:text-[#717FE0] transition-all duration-400`}>
                                    Men's
                                </Link>
                            </li>
                            <li className={`pb-[10px]`}>
                                <Link href={`/categories`}
                                      className={`text-[13px] font-[Poppins] hover:text-[#717FE0] transition-all duration-400`}>
                                    Music
                                </Link>
                            </li>
                            <li className={`pb-[10px]`}>
                                <Link href={`/categories`}
                                      className={`text-[13px] font-[Poppins] hover:text-[#717FE0] transition-all duration-400`}>
                                    Electronics
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`help pb-[50px] relative w-full px-[15px]`}>
                        <h4 className={`font-[Montserrat] leading-[1.6] uppercase text-[15px] font-bold`}>Help</h4>
                        <ul className={`list-none mt-[20px] text-[#999]`}>
                            <li className={`pb-[10px]`}>
                                <Link href={`/orders`}
                                      className={`text-[13px] font-[Poppins] hover:text-[#717FE0] transition-all duration-400`}>
                                    Track Order
                                </Link>
                            </li>
                            <li className={`pb-[10px]`}>
                                <Link href={`/orders`}
                                      className={`text-[13px] font-[Poppins] hover:text-[#717FE0] transition-all duration-400`}>
                                    Returns
                                </Link>
                            </li>
                            <li className={`pb-[10px]`}>
                                <Link href={`/orders`}
                                      className={`text-[13px] font-[Poppins] hover:text-[#717FE0] transition-all duration-400`}>
                                    Shipping
                                </Link>
                            </li>
                            <li className={`pb-[10px]`}>
                                <Link href={`/about`}
                                      className={`text-[13px] font-[Poppins] hover:text-[#717FE0] transition-all duration-400`}>
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={`get-in-touch pb-[50px] relative w-full px-[15px]`}>
                        <h4 className={`font-[Montserrat] leading-[1.6] uppercase text-[15px] font-bold`}>Get in
                            Touch</h4>
                        <p className={`mt-[20px] max-w-[270px] text-[13px] text-[#999]`}>Any questions? Let us know in
                            store at 8th
                            floor, 379 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879</p>
                        <div className="pt-[27px] flex items-center justify-start">
                            <Link href={'/'}
                                  className={`hover:text-[#717FE0] cursor-pointer text-[#b2b2b2] transition-all duration-400 me-[16px]`}>
                                <Facebook/>
                            </Link>
                            <Link href={'/'}
                                  className={`hover:text-[#717FE0] cursor-pointer text-[#b2b2b2] transition-all duration-400 me-[16px]`}>
                                <Instagram/>
                            </Link>
                            <Link href={'/'}
                                  className={`hover:text-[#717FE0] cursor-pointer text-[#b2b2b2] transition-all duration-400 me-[16px]`}>
                                <Twitter/>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className={`pt-[30px]`}>
                    <p className={`text-[13px] text-[#888] text-center`}>
                        Copyright ©2025 All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;