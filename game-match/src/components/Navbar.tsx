import React, { JSX } from 'react';
import Link from 'next/link';
import { navLinks } from './navlinks';

type NavLink = {
    path: string;
    name: string;
    icon: JSX.Element;
}

const Navbar = () => {
    return (
        <div className="p-8 bg-secondary text-lg w-full h-8 flex justify-end items-center">
            {navLinks.map((link: NavLink, index: number) => (
                <Link key={index} href={link.path}>
                    <div className="flex items-center hover:text-secondary">
                        {link.icon}
                        <div className="w-32 flex justify-start items-center">
                            <p>{link.name}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Navbar;
