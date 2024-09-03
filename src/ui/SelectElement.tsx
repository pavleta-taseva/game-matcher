import React from 'react';
import { SelectElementProps } from '@/src/types/elements';
import { filterOptions } from '@/src/utils/filterOptions';

const SelectElement = ({
  selectedOption,
  setSelectedOption,
}: SelectElementProps) => {
  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="categoryFilter"
        className="font-semibold text-secondaryBlue mb-4 text-xl"
      >
        Filter Games
      </label>
      <select
        id="categoryFilter"
        className="border-transparent outline-neutral-700 mb-4 w-full rounded px-4 py-2 text-base text-primaryGrey outline focus:outline-none"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {filterOptions.map((filter: string) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectElement;
