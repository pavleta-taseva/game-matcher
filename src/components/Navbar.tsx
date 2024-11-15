'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerMenu from '../ui/HamburgerMenu';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/src/utils/navlinks';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/../context/AuthProvider';
import { CgProfile } from 'react-icons/cg';

type NavLink = {
  path: string;
  name: string;
  session: boolean;
  profile?: boolean;
};

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const { user, setUser, logout, setIsLoggedIn } = useAuth();
  const profileImage = session?.user?.image;

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session]);

  const handleLogout = (linkName: string) => {
    if (linkName === 'Logout') {
      logout();
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="flex h-32 w-full items-center justify-between gap-4 bg-primaryPurple py-2 font-doHyeon md:h-20 md:gap-12 md:p-8 lg:flex-row">
      <div className="flex w-full items-center justify-start gap-4">
        <div className="md:hidden">
          <HamburgerMenu />
        </div>
        <Link
          href={'/games'}
          aria-label={'All Games'}
          className="hidden md:block md:text-xl lg:text-2xl"
        >
          <div
            className={`${pathName === '/games'
              ? 'flex items-center border-b-0 border-primaryLight sm:border-b-2'
              : 'flex items-center hover:text-primaryPurple'
              }`}
          >
            All Games
          </div>
        </Link>
        <Link
          href={'/categories'}
          aria-label={'All Games'}
          className="hidden md:block md:text-xl lg:text-2xl"
        >
          <div
            className={`${pathName === '/games'
              ? 'flex items-center border-b-0 border-primaryLight sm:border-b-2'
              : 'flex items-center hover:text-primaryPurple'
              }`}
          >
            Categories
          </div>
        </Link>
      </div>

      <Link href={'/'} className="w-full text-center text-3xl md:text-4xl">
        GameMatcher
      </Link>
      <div className="h-14 w-full items-center justify-center gap-4 sm:hidden md:flex md:justify-start md:text-xl lg:justify-end lg:text-2xl">
        {navLinks.map((link: NavLink, index: number) => (
          <div key={index}>
            {(link.session || link?.profile) && (session || user?.username) && (
              <Link key={index} href={link.path} aria-label={link.name}>
                <div
                  onClick={() => handleLogout(link.name)}
                  className={`${pathName === link.path
                    ? 'flex items-center border-b-0 border-primaryLight sm:border-b-2'
                    : 'flex items-center hover:text-primaryPurple'
                    }`}
                >
                  <div className="hidden w-fit items-center justify-start sm:block">
                    {link.name}
                  </div>
                </div>
              </Link>
            )}
            {!link.session && !session && !user?.username && (
              <Link key={index} href={link.path} aria-label={link.name}>
                <div
                  className={`${pathName === link.path
                    ? 'flex items-center border-b-0 border-primaryLight sm:border-b-2'
                    : 'flex items-center hover:text-primaryPurple'
                    }`}
                >
                  <div className="hidden w-fit items-center justify-start sm:block">
                    {link.name}
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
        <div className="hidden md:block">
          <Link href={`/user/${user?.userId || user?.id}`} aria-label={'Profile'}>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
