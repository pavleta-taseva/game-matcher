import React from 'react';
import Image from 'next/image';
import { SearchElementProps } from '@/src/types/elements';

const SearchElement = ({
  query,
  isFiltered,
  handleChange,
}: SearchElementProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-center">
      <div className='flex justify-center items-center'>
        <Image
          src={'/images/logo-main.webp'}
          alt="Game match logo image"
          width={170}
          height={170}
        />
      </div>

      <div className='flex justify-center md:justify-start items-center '>
        <input
          name="searchInput"
          type="text"
          value={isFiltered ? '' : query}
          onChange={handleChange}
          placeholder="Enter game or genre..."
          className="h-12 w-80 md:w-96 md:h-14 py-2 px-4 rounded-lg text-left font-doHyeon text-4xl text-darkPurple placeholder-opacity-100 outline-none placeholder:text-base sm:placeholder:text-2xl placeholder:text-darkPurple placeholder:text-left lg:text-2xl"
        />
      </div>
    </div>
  );
};

export default SearchElement;
