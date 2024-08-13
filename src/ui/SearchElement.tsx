import React from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { SearchElementProps } from '@/src/types/elements';

const SearchElement = ({
  query,
  isFiltered,
  handleChange,
}: SearchElementProps) => {
  return (
    <div className="relative flex w-full gap-4 place-self-start lg:w-1/3 lg:items-center lg:justify-start">
      <FaSearchPlus
        className="absolute left-4 top-1/2 -translate-y-1/2 transform text-primaryGrey"
        fontSize={20}
      />
      <input
        name="searchInput"
        type="text"
        value={isFiltered ? '' : query}
        onChange={handleChange}
        placeholder="Enter game name or genre..."
        className="h-10 w-full rounded-md border p-2 pl-12 text-sm text-primaryGrey outline-none md:w-4/6 lg:w-full"
      />
    </div>
  );
};

export default SearchElement;
