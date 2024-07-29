'use client';

import React, { JSX, useState } from 'react';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/src/utils/navlinks';
import Link from 'next/link';
import Image from 'next/image';

type NavLink = {
  path: string;
  name: string;
  icon: JSX.Element;
  isLoggedIn: boolean;
};

const Navbar = () => {
  const pathName = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="flex flex-col py-2 md:p-8 gap-4 md:gap-12 bg-primaryBlack text-3xl w-full h-28 md:h-fit justify-between items-center lg:flex-row sm:text-base">
      <div className="w-full flex md:justify-start items-center lg:w-1/2">
        <Link href={'/'}>
          <div className="text-secondaryBlue flex flex-row gap-2 justify-center items-center text-3xl purple-purse-regular">
            <Image
              src={'/images/game-match-logo.webp'}
              alt="Game match logo image"
              width={60}
              height={60}
            />
            GameMatcher
          </div>
        </Link>
      </div>
      <div className="w-full gap-4 flex justify-center md:justify-start lg:justify-end lg:w-1/2">
        {navLinks.map((link: NavLink, index: number) => (
          <div key={index} className="text-2xl lg:text-base">
            {isLoggedIn === link.isLoggedIn && (
              <Link key={index} href={link.path} aria-label={link.name}>
                <div
                  className={`${
                    pathName === link.path
                      ? 'flex items-center border-b-0 sm:border-b-2 border-primaryLight'
                      : 'flex items-center hover:text-secondaryBlue'
                  }`}
                >
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
};

export default Navbar;
