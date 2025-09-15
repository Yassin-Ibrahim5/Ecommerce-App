import React from 'react';

export default function AboutPage() {
    return (
        <div className={`container mt-[84px] font-[Poppins]`}>
            <div className={`bg-[url(/bgs/bg-01.jpg)] bg-cover bg-center bg-no-repeat px-4 py-23 text-center`}>
                <h2 className={`text-[50px] leading-[1.1] text-center font-bold text-white`}>About</h2>
            </div>
            <div className={`bg-white pt-[75px] pb-30`}>
                <div className="w-11/12 mx-auto px-28">
                    <div className="flex flex-wrap pb-37">
                        <div className="w-11/12 md:w-7/12 lg:w-8/12 px-[15px]">
                            <div className="pt-2 md:pt-7 lg:pr-20 md:pr-0">
                                <h3 className="text-[25px] font-bold text-[#333] pb-4">Our Story</h3>
                                <p className="text-[14px] font-light text-[#888] pb-[26px] leading-[25px]">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat
                                    enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque at vehicula
                                    tellus, sed tincidunt augue. Orci varius natoque penatibus et magnis dis parturient
                                    montes, nascetur ridiculus mus. Maecenas varius egestas diam, eu sodales metus
                                    scelerisque congue. Pellentesque habitant morbi tristique senectus et netus et
                                    malesuada fames ac turpis egestas. Maecenas gravida justo eu arcu egestas convallis.
                                    Nullam eu erat bibendum, tempus ipsum eget, dictum enim. Donec non neque ut enim
                                    dapibus tincidunt vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec
                                    condimentum euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit.
                                </p>
                                <p className="text-[14px] font-light text-[#888] pb-[26px] leading-[25px]">
                                    Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget ligula
                                    magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in vehicula vehicula.
                                    Pellentesque congue ac orci ut gravida. Aliquam erat volutpat. Donec iaculis lectus
                                    a arcu facilisis, eu sodales lectus sagittis. Etiam pellentesque, magna vel dictum
                                    rutrum, neque justo eleifend elit, vel tincidunt erat arcu ut sem. Sed rutrum,
                                    turpis ut commodo efficitur, quam velit convallis ipsum, et maximus enim ligula ac
                                    ligula.
                                </p>
                                <p className="text-[14px] font-light text-[#888] pb-[26px] leading-[25px]">
                                    Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018
                                    or call us on (+1) 96 716 6879
                                </p>
                            </div>
                        </div>
                        <div className="w-11/12 md:w-5/12 lg:w-4/12 px-[15px] mx-auto">
                            <div
                                className="relative z-1 before:absolute before:w-full before:h-full before:block before:-z-1 before:border-3 before:border-solid before:border-[#ccc] before:bottom-[-21px] before:left-[-21px]">

                                <div className="block overflow-hidden group">
                                    <img src="/about-imgs/about-01.jpg" alt="About Image 1"
                                         className="w-full transition-all duration-900 align-middle border-none group-hover:scale-110"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-11/12 md:w-5/12 lg:w-4/12 px-[15px] mx-auto">
                            <div
                                className="relative z-1 before:absolute before:w-full before:h-full before:block before:-z-1 before:border-3 before:border-solid before:border-[#ccc] before:bottom-[-21px] before:right-[-21px]">

                                <div className="block overflow-hidden group">
                                    <img src="/about-imgs/about-02.jpg" alt="About Image 2"
                                         className="w-full transition-all duration-900 align-middle border-none group-hover:scale-110"/>
                                </div>
                            </div>
                        </div>
                        <div className="w-11/12 md:w-7/12 lg:w-8/12 px-[15px] mx-auto">
                            <div className="pt-2 pl-21 md:pt-7 lg:pr-20 md:pr-0">
                                <h3 className="text-[25px] font-bold text-[#333] pb-4">Our Mission</h3>
                                <p className="text-[14px] font-light text-[#888] pb-[26px] leading-[25px]">
                                    Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim
                                    risus, sed consectetur erat. Pellentesque habitant morbi tristique senectus et netus
                                    et malesuada fames ac turpis egestas. Nullam maximus mauris sit amet odio convallis,
                                    in pharetra magna gravida. Praesent sed nunc fermentum mi molestie tempor. Morbi
                                    vitae viverra odio. Pellentesque ac velit egestas, luctus arcu non, laoreet mauris.
                                    Sed in ipsum tempor, consequat odio in, porttitor ante. Ut mauris ligula, volutpat
                                    in sodales in, porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec
                                    venenatis nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus
                                    maximus euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum
                                    libero iaculis.
                                </p>
                                <div className="border-l-3 border-l-solid mt-[22px] pl-7 pb-2">
                                    <p className="italic text-[#888] text-[15px] pr-10 pb-3 leading-[25px]">
                                        Creativity is just connecting things. When you ask creative people how they did
                                        something, they feel a little guilty because they didn't really do it, they just
                                        saw something. It seemed obvious to them after a while.
                                    </p>
                                    <span className="text-[#555] text-[13px] leading-[22px]">- Steve Jobs</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
