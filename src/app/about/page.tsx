import React from 'react';
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className={`container mx-auto mt-[84px] font-[Poppins]`}>
            <div className={`bg-[url(/bgs/bg-01.jpg)] bg-cover bg-center bg-no-repeat px-4 py-16 sm:py-24 text-center`}>
                <h2 className={`text-4xl sm:text-5xl font-bold text-white`}>About</h2>
            </div>
            <div className={`bg-white py-12 sm:py-16`}>
                <div className="w-11/12 lg:w-4/5 mx-auto">
                    {/*Our Story*/}
                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 md:gap-10 pb-12 sm:pb-16">
                        <div className="w-full md:w-7/12 lg:w-8/12 order-2 md:order-1 px-4 md:px-0 mt-8 md:mt-0">
                            <div className="pt-2">
                                <h3 className="text-2xl sm:text-3xl font-bold text-[#333] pb-4">Our Story</h3>
                                <p className="text-sm font-light text-[#888] pb-6 leading-relaxed">
                                    Our story began with a simple idea: to make shopping feel less like a task and more
                                    like a moment of discovery. We wanted a place where people could find things they
                                    love, without the stress of endless searching. Every product we share has been
                                    chosen with care, keeping in mind the details that turn everyday items into small
                                    joys. For us, it’s about creating a space where style, comfort, and convenience come
                                    together in a way that feels natural and inspiring.
                                </p>
                                <p className="text-sm font-light text-[#888] pb-6 leading-relaxed">
                                    Over time, this little dream has grown into a community that values connection and
                                    trust. We’re proud to support makers, creators, and brands who put passion into what
                                    they do. Whether it’s a thoughtful gift, a new favorite outfit, or something that
                                    simply makes life easier, we’re here to help you find it. More than just selling
                                    products, we hope to share stories, spark inspiration, and make shopping feel more
                                    personal. After all, our journey is only possible because of you.
                                </p>
                                <p className="text-sm font-light text-[#888] pb-6 leading-relaxed">
                                    Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018
                                    or call us on (+1) 96 716 6879
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-5/12 lg:w-4/12 order-1 md:order-2 px-4 md:px-0 mx-auto">
                            <div
                                className="relative z-10 before:hidden md:before:block before:absolute before:w-full before:h-full before:block before:-z-1 before:border-3 before:border-solid before:border-[#ccc] before:bottom-[-21px] before:left-[-21px]">

                                <div className="block overflow-hidden group">
                                    <Image src="/about-imgs/about-01.jpg" alt="About Image 1" width={320} height={320}
                                           sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 33vw" priority
                                           loading={"eager"}
                                           className="w-full transition-all duration-900 align-middle border-none group-hover:scale-110"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Our Mission*/}
                    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 md:gap-10">
                        <div className="w-full md:w-5/12 lg:w-4/12 px-4 md:px-0 mx-auto mt-8 md:mt-0">
                            <div
                                className="relative z-10 before:hidden md:before:block before:absolute before:w-full before:h-full before:block before:-z-1 before:border-3 before:border-solid before:border-[#ccc] before:bottom-[-21px] before:right-[-21px]">
                                <div className="block overflow-hidden group">
                                    <Image src="/about-imgs/about-02.jpg" alt="About Image 2" width={320} height={320}
                                           sizes="(max-width:768px) 100vw (max-width:1280px) 50vw, 33vw" priority
                                           loading={"eager"}
                                           className="w-full transition-all duration-900 align-middle border-none group-hover:scale-110"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-7/12 lg:w-8/12 order-2 md:order-1 px-4 md:px-0 mt-8 md:mt-0">
                            <div className="pt-2">
                                <h3 className="text-2xl sm:text-3xl font-bold text-[#333] pb-4">Our Mission</h3>
                                <p className="text-sm font-light text-[#888] pb-6 leading-relaxed">
                                    Our mission is to make shopping feel meaningful, personal, and accessible to
                                    everyone, no matter where they are. We believe that every product has a story, and
                                    every choice you make should bring value to your life. That’s why we carefully
                                    select items that balance quality, style, and affordability, so you never have to
                                    compromise. Beyond products, we aim to build a community that celebrates
                                    individuality and encourages self-expression. Through simple navigation, secure
                                    shopping, and responsive support, we want each experience to be stress-free and
                                    enjoyable. Our promise is to connect people with things they truly love, every
                                    single day.
                                </p>
                                <div className="border-l-3 border-l-solid mt-6 pl-6 pb-2">
                                    <p className="italic text-[#888] text-base pr-10 pb-3 leading-relaxed">
                                        Creativity is just connecting things. When you ask creative people how they did
                                        something, they feel a little guilty because they didn't really do it, they just
                                        saw something. It seemed obvious to them after a while.
                                    </p>
                                    <span className="text-[#555] text-sm leading-relaxed">- Steve Jobs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
