import React, { useState } from 'react';
import { useAuth } from '@/src/components/AuthProvider';
import { useSession } from 'next-auth/react';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import Image from 'next/image';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const { user, logout, isLoggedIn, setIsLoggedIn } = useAuth();
  const profileImage = session?.user?.image;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  console.log('isOpen', isOpen);
  return (
    <>
      <label className="relative ml-8 flex h-8 w-10 cursor-pointer flex-col items-center justify-center md:ml-4">
        <input type="checkbox" className="peer hidden" onClick={toggleMenu} />

        <span className="block h-1 w-full rounded-full bg-primaryLight transition-transform duration-300 ease-in-out"></span>

        <span className="mt-1.5 block h-1 w-11/12 self-start rounded-full bg-primaryLight transition-opacity duration-300 ease-in-out"></span>

        <span className="mt-1.5 block h-1 w-10/12 self-start rounded-full bg-primaryLight transition-transform duration-300 ease-in-out"></span>
      </label>

      <aside
        className={`${isOpen ? 'fixed inset-y-0 left-0 z-20 w-64 rounded-r-xl bg-linearPurple p-4 text-primaryLight shadow-3xl' : 'hidden'}`}
      >
        <label className="absolute right-5 top-5 z-30 flex h-8 w-6 cursor-pointer flex-col items-center justify-center">
          <input type="checkbox" className="peer hidden" onClick={toggleMenu} />

          <span className="block h-1 w-full translate-y-2.5 rotate-45 transform rounded-full bg-primaryLight transition-transform duration-300 ease-in-out"></span>

          <span className="mt-1.5 block h-1 w-11/12 self-start rounded-full bg-primaryLight opacity-0 transition-opacity duration-300 ease-in-out"></span>

          <span className="mt-1.5 block h-1 w-10/12 -translate-y-2.5 -rotate-45 transform self-start rounded-full bg-primaryLight transition-transform duration-300 ease-in-out"></span>
        </label>
        <nav onClick={toggleMenu}>
          <ul className="flex flex-col gap-4 py-8">
            {(status === 'authenticated' || isLoggedIn) && (
              <Link href={'/profile'} aria-label={'Profile'}>
                <div className="group/item relative">
                  {session && session.user ? (
                    <div className='flex justify-start items-center gap-2'>
                      <Image
                        alt="User Image"
                        className="rounded-full"
                        src={profileImage || ''}
                        width={30}
                        height={30}
                      />
                      <div className='text-xl'>{session.user?.name?.split(' ')[0]}</div>
                    </div>
                  ) : (
                    user?.username && (
                      <div className='flex justify-start items-center gap-2'>
                        <CgProfile className="text-2xl" />
                        <div className='text-xl'>{user?.username?.split(' ')[0]}</div>
                      </div>
                    )
                  )}
                </div>
              </Link>
            )}
            <Link
              href={'/games'}
              aria-label={'All Games'}
              className="w-full text-2xl hover:text-primaryPurple"
            >
              All Games
            </Link>
            <Link
              href={'/categories'}
              aria-label={'Categories'}
              className="w-full text-2xl hover:text-primaryPurple"
            >
              Categories
            </Link>
            {(!session?.user || status !== 'authenticated' || !isLoggedIn) && (
              <>
                <Link
                  href={'/register'}
                  aria-label={'Sign Up'}
                  className="w-full text-2xl hover:text-primaryPurple"
                >
                  Sign Up
                </Link>
                <Link
                  href={'/login'}
                  aria-label={'Login'}
                  className="w-full text-2xl hover:text-primaryPurple"
                >
                  Login
                </Link>
              </>
            )}
            {(session?.user || status === 'authenticated' || isLoggedIn) && (
              <>
                <Link
                  href={'/favorites'}
                  aria-label={'Favorites'}
                  className="w-full text-2xl hover:text-primaryPurple"
                >
                  Favorites
                </Link>
                <Link
                  href={'#'}
                  aria-label={'Logout'}
                  className="w-full text-2xl hover:text-primaryPurple"
                  onClick={() => {
                    logout();
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </Link>
              </>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default HamburgerMenu;
