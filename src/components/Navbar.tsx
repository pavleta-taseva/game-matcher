'use client';

import React, { JSX } from 'react';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/src/utils/navlinks';
import { signOut, useSession } from 'next-auth/react';
import { FaCircleUser } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';

type NavLink = {
  path: string;
  name: string;
  icon: JSX.Element;
  session: boolean;
};

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  const handleLogout = async (linkName: string) => {
    if (linkName === 'Logout') await signOut();
  }

  return (
    <div className="flex flex-col py-2 md:p-8 gap-4 md:gap-12 bg-primaryBlack text-3xl w-full h-32 md:h-fit justify-between items-center lg:flex-row sm:text-base">
      <div className="flex md:justify-start items-center w-full lg:w-1/2">
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
      <div className="flex justify-center items-center w-full h-14 gap-4 md:justify-start lg:justify-end lg:w-1/2">
        {navLinks.map((link: NavLink, index: number) => (
          <div key={index} className="text-2xl lg:text-base">
            {link.session && session && (
              <Link key={index} href={link.path} aria-label={link.name}>
                <div
                  onClick={() => handleLogout(link.name)}
                  className={`${pathName === link.path
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
            {!link.session && !session && (
              <Link key={index} href={link.path} aria-label={link.name}>
                <div
                  className={`${pathName === link.path
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
        <>
          {session && session.user &&
            <div className="group/item relative">
              <Image
                alt="User Image"
                className="rounded-full"
                src={profileImage || ''}
                width={30}
                height={30}
              />
              <span className="absolute top-9 right-9 text-center text-sm text-primaryDark bg-primaryLight z-10 hidden w-auto rounded-md bg-gray-900 px-3 py-1 group-hover/item:block whitespace-nowrap">
                {session?.user?.name}
              </span>
            </div>
          }
          {!session && <FaCircleUser className='text-2xl md:text-3xl text-primaryBlue' />}
        </>
      </div>
    </div>
  );
};

export default Navbar;