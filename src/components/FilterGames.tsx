import React, { useState } from 'react';
import CheckboxGroup from './CheckboxGroup';
import { GenresProps } from 'types/components';
import {
    filterOptions,
    operatingSystems,
    gameModes,
    playerPerspectives,
} from '../utils/filterOptions';

const FilterGames = ({ genres }: GenresProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(genres);
    const [selectedOption, setSelectedOption] = useState<string>('Genres');

    const handleCheckboxChange = (category: string) => {
        if (selectedCategories?.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
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
                return genres;
        }
    };

    return (
        <div className='flex flex-col w-4/12 text-lg'>
            <label htmlFor="categoryFilter" className='text-xl text-secondary font-semibold mb-4'>
                Filter Games
            </label>
            <select
                id='categoryFilter'
                className='w-11/12 mb-4 py-2 px-4 focus:outline-none text-dark rounded border-transparent text-base outline outline-neutral-700'
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
            >
                {filterOptions.map((filter: string) => (
                    <option key={filter} value={filter}>{filter}</option>
                ))}
            </select>

            <CheckboxGroup
                options={getOptions()}
                selectedOptions={selectedCategories}
                onChange={handleCheckboxChange}
            />
        </div>
    )
}

export default FilterGames;