import React, { useState } from 'react';
import Link from 'next/link';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        <nav>
          <ul className="flex flex-col gap-4 py-8">
            <Link
              href={'/games'}
              aria-label={'All Games'}
              className="w-full text-2xl hover:text-primaryPurple"
            >
              All Games
            </Link>
            <Link
              href={'/categories'}
              aria-label={'All Games'}
              className="w-full text-2xl hover:text-primaryPurple"
            >
              Categories
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default HamburgerMenu;
