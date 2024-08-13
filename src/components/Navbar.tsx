'use client';

import React, { JSX, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/src/utils/navlinks';
import { signOut, useSession } from 'next-auth/react';
import { useAuth } from '@/src/components/AuthProvider';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import Image from 'next/image';

type NavLink = {
  path: string;
  name: string;
  icon: JSX.Element;
  session: boolean;
  profile?: boolean;
};

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const { user, setUser, logout } = useAuth();
  const profileImage = session?.user?.image;

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session]);

  const handleLogout = async (linkName: string) => {
    if (linkName === 'Logout') await signOut();
    logout();
  };

  return (
    <div className="flex h-32 w-full flex-col items-center justify-between gap-4 bg-primaryBlack py-2 text-3xl sm:text-base md:h-fit md:gap-12 md:p-8 lg:flex-row">
      <div className="flex w-full items-center md:justify-start lg:w-1/2">
        <Link href={'/'}>
          <div className="purple-purse-regular flex flex-row items-center justify-center gap-2 text-3xl text-secondaryBlue">
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
      <div className="flex h-14 w-full items-center justify-center gap-4 md:justify-start lg:w-1/2 lg:justify-end">
        {navLinks.map((link: NavLink, index: number) => (
          <div key={index} className="text-2xl lg:text-base">
            {(link.session || link?.profile) && (session || user?.username) && (
              <Link key={index} href={link.path} aria-label={link.name}>
                <div
                  onClick={() => handleLogout(link.name)}
                  className={`${
                    pathName === link.path
                      ? 'flex items-center border-b-0 border-primaryLight sm:border-b-2'
                      : 'flex items-center hover:text-secondaryBlue'
                  }`}
                >
                  {link.icon}
                  <div className="hidden w-fit items-center justify-start sm:block">
                    <p>{link.name}</p>
                  </div>
                </div>
              </Link>
            )}
            {!link.session && !session && !user?.username && (
              <Link key={index} href={link.path} aria-label={link.name}>
                <div
                  className={`${
                    pathName === link.path
                      ? 'flex items-center border-b-0 border-primaryLight sm:border-b-2'
                      : 'flex items-center hover:text-secondaryBlue'
                  }`}
                >
                  {link.icon}
                  <div className="hidden w-fit items-center justify-start sm:block">
                    <p>{link.name}</p>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
        <>
          <Link href={'/profile'} aria-label={'Profile'}>
            <div className="group/item relative">
              {session && session.user ? (
                <Image
                  alt="User Image"
                  className="rounded-full"
                  src={profileImage || ''}
                  width={30}
                  height={30}
                />
              ) : (
                user?.username && <CgProfile className="text-2xl" />
              )}
              <span className="bg-gray-900 absolute right-9 top-9 z-10 hidden w-auto whitespace-nowrap rounded-md bg-primaryLight px-3 py-1 text-center text-sm text-primaryDark group-hover/item:block">
                {session?.user?.name || user?.username}
              </span>
            </div>
          </Link>
        </>
      </div>
    </div>
  );
};

export default Navbar;
