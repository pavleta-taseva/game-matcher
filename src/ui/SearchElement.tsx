import React from 'react';
import Image from 'next/image';
import SearchButtonElement from '@/src/ui/SearchButtonElement';
import { FaSearch } from "react-icons/fa";
import { SearchElementProps } from '@/src/types/elements';

const SearchElement = ({
  query,
  isFiltered,
  handleChange,
  handleSearch,
  handleSubmit,
}: SearchElementProps) => {
  return (
    <div className="flex flex-row gap-0 md:gap-4 self-center pl-12">
      <div className="relative flex items-center justify-center">
        <Image
          src={'/images/logo.svg'}
          alt="Game match logo image"
          width={170}
          height={170}
          className="absolute left-[-60px] top-[-10px] w-32 md:left-[-100px] md:top-[-10px] md:w-44"
        />
        <div className='hidden md:block'>
          <input
            name="searchInput"
            type="text"
            value={isFiltered ? '' : query}
            onChange={handleSearch}
            placeholder="Search game..."
            className="h-12 w-60 rounded-lg bg-primaryLight px-4 py-2 pl-14 text-left font-doHyeon text-4xl text-darkPurple placeholder-opacity-100 outline-none placeholder:text-left placeholder:text-base placeholder:text-darkPurple sm:w-80 sm:placeholder:text-xl md:h-14 md:w-96 lg:text-2xl lg:placeholder:text-xl"
          />
        </div>
        <div className='block md:hidden'>
          <input
            name="searchInput"
            type="text"
            value={isFiltered ? '' : query}
            onChange={handleChange}
            placeholder="Search game..."
            className="h-12 w-60 rounded-lg bg-primaryLight px-4 py-2 pl-14 text-left font-doHyeon text-darkPurple placeholder-opacity-100 outline-none placeholder:text-left placeholder:text-base placeholder:text-darkPurple sm:w-80 md:h-14 md:w-96"
          />
        </div>
      </div>
      <SearchButtonElement
        type='submit'
        width={9}
        height={9}
        content={<FaSearch className='text-secondaryPurple' />}
        background='lightPurple'
        onClick={handleSubmit}
      />
    </div>
  );
};

export default SearchElement;
