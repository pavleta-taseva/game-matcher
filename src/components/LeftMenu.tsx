import React, { useState } from 'react';
import {
    filterOptions,
    categories,
    operatingSystems,
    gameModes,
    playerPerspectives,
    genres
} from '../utils/filterOptions';
import CheckboxGroup from './CheckboxGroup';

interface SideMenuProps {
    effect?: boolean;
    display?: string;
}

const LeftMenu = ({ effect, display }: SideMenuProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('Category');

    const handleCheckboxChange = (category: string) => {
        if (selectedCategories.includes(category)) {
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
                return genres;
            default:
                return categories;
        }
    };

    return (
        <div className={`${effect && 'animate-ease-slow-in'} ${display} flex flex-col w-3/4 text-lg`}>
            <label htmlFor="categoryFilter" className='text-xl text-secondary font-semibold mb-4'>
                Filter Games
            </label>
            <select
                id='categoryFilter'
                className='w-full mb-4 rounded-md py-2 px-2 focus:outline-none text-dark'
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

export default LeftMenu;