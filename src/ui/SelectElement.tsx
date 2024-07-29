import React from 'react';
import { SelectElementProps } from 'types/elements';
import { filterOptions } from '@/src/utils/filterOptions';

const SelectElement = ({
  selectedOption,
  setSelectedOption,
}: SelectElementProps) => {
  return (
    <>
      <label
        htmlFor="categoryFilter"
        className="text-xl text-secondaryBlue font-semibold mb-4"
      >
        Filter Games
      </label>
      <select
        id="categoryFilter"
        className="w-9/12 mb-4 py-2 px-4 focus:outline-none text-primaryGrey rounded border-transparent text-base outline outline-neutral-700"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {filterOptions.map((filter: string) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectElement;
