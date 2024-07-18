import React, { useState, useEffect } from 'react';
import CheckboxGroup from './CheckboxGroup';
import { SearchProps } from 'types/components';
import { searchGames } from 'services/api';
import {
    filterOptions,
    operatingSystems,
    gameModes,
    playerPerspectives,
} from '../utils/filterOptions';

const FilterGames = ({ genres, currentPage, setTotalGamesCount, setResults, isSearching, isFiltered, setIsFiltered }: SearchProps) => {
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
        searchGames({ query: updatedCheckBoxValue.join(','), setResults, setTotalGamesCount, currentPage, genres: updatedCheckBoxValue });
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
        <div className='flex flex-col text-lg lg:w-2/12'>
            <label htmlFor="categoryFilter" className='text-xl text-secondaryBlue font-semibold mb-4'>
                Filter Games
            </label>
            <select
                id='categoryFilter'
                className='w-9/12 mb-4 py-2 px-4 focus:outline-none text-primaryGrey rounded border-transparent text-base outline outline-neutral-700'
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                {filterOptions.map((filter: string) => (
                    <option key={filter} value={filter}>{filter}</option>
                ))}
            </select>

            <CheckboxGroup
                options={getOptions()}
                checkBoxValues={checkBoxValues}
                onChange={handleCheckboxChange}
            />
        </div>
    )
}

export default FilterGames;