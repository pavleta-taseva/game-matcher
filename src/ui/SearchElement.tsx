import React from 'react';
import { FaSearchPlus } from 'react-icons/fa';
import { SearchElementProps } from 'types/elements';

const SearchElement = ({
  query,
  isFiltered,
  handleChange,
}: SearchElementProps) => {
  return (
    <div className="relative flex place-self-start gap-4 w-full lg:w-1/3 lg:justify-start lg:items-center">
      <FaSearchPlus
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primaryGrey"
        fontSize={20}
      />
      <input
        name="searchInput"
        type="text"
        value={isFiltered ? '' : query}
        onChange={handleChange}
        placeholder="Enter game name or genre..."
        className="w-full md:w-4/6 lg:w-full h-10 pl-12 border rounded-md outline-none p-2 text-primaryGrey text-sm"
      />
    </div>
  );
};

export default SearchElement;
