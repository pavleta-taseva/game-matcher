'use client'

import React, { JSX, useState } from 'react';
import { usePathname } from 'next/navigation';
import { navLinks } from '../utils/navlinks';
import Link from 'next/link';
import Image from 'next/image'

type NavLink = {
    path: string;
    name: string;
    icon: JSX.Element;
    isLoggedIn: boolean;
}

const Navbar = () => {
    const pathName = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <div className="p-8 bg-primaryBlack text-3xl w-full h-24 gap-12 mb-12 flex flex-col justify-between items-center lg:flex-row lg:mb-0 sm:text-base">
            <div className="w-full flex justify-start items-center lg:w-1/2">
                <Link href={'/'}>
                    <div className='text-secondaryBlue flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular'>
                        <Image src={'/images/game-match-logo.webp'} alt='Game match logo image' width={60} height={60} />
                        GameMatcher
                    </div>
                </Link>
            </div>
            <div className="w-full gap-4 flex justify-center items-center lg:justify-end lg:w-1/2">
                {navLinks.map((link: NavLink, index: number) => (
                    <div key={index}>
                        {isLoggedIn === link.isLoggedIn && (
                            <Link key={index} href={link.path}>
                                <div
                                    className={`${pathName === link.path
                                        ? 'flex items-center border-b-0 sm:border-b-2 border-primaryLight'
                                        : 'flex items-center hover:text-secondaryBlue'}`}>
                                    {link.icon}
                                    <div className="w-fit hidden justify-start items-center sm:block">
                                        <p>{link.name}</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Navbar;
