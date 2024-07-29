import React, { useState, useEffect } from 'react';
import CheckboxGroup from '@/src/ui/CheckboxGroup';
import SelectElement from '@/src/ui/SelectElement';
import { SearchProps } from 'types/components';
import { searchGames } from 'services/api';
import {
  operatingSystems,
  gameModes,
  playerPerspectives,
} from '@/src/utils/filterOptions';

const FilterGames = ({
  genres,
  currentPage,
  setTotalGamesCount,
  setResults,
  isSearching,
  isFiltered,
  setIsFiltered,
}: SearchProps) => {
  const [checkBoxValues, setCheckBoxValues] = useState<string[]>(genres || []);
  const [selectedOption, setSelectedOption] = useState<string>('Genres');

  useEffect(() => {
    if (isSearching || !isFiltered) {
      setCheckBoxValues([]);
      setResults && setResults([]);
    }
  }, [isSearching, setResults]);

  const handleCheckboxChange = (value: string) => {
    const updatedCheckBoxValue = checkBoxValues.includes(value)
      ? checkBoxValues.filter((category) => category !== value)
      : [...checkBoxValues, value];

    setCheckBoxValues(updatedCheckBoxValue);
    searchGames({
      query: updatedCheckBoxValue.join(','),
      setResults,
      setTotalGamesCount,
      currentPage,
      genres: updatedCheckBoxValue,
    });
    setIsFiltered && setIsFiltered(updatedCheckBoxValue?.length > 0);
  };

  const getOptions = () => {
    switch (selectedOption) {
      case 'Operating System':
        return operatingSystems;
      case 'Game Modes':
        return gameModes;
      case 'Player Perspective':
        return playerPerspectives;
      case 'Genres':
        return genres || [];
      default:
        return genres || [];
    }
  };

  return (
    <div className="text-lg hidden lg:block lf:flex lg:flex-col lg:w-2/12">
      <SelectElement
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <CheckboxGroup
        options={getOptions()}
        checkBoxValues={checkBoxValues}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default FilterGames;
