import React, { useState } from 'react';
import {
    filterOptions,
    categories,
    operatingSystems,
    gameModes,
    playerPerspectives,
    genres
} from './filterOptions';

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
                defaultValue={filterOptions[0]}
            >
                {filterOptions.map((filter) => (
                    <option key={filter} value={filter}>{filter}</option>
                ))}
            </select>

            {selectedOption === 'Category' && (
                <div className='space-y-4'>
                    {categories.map((category) => (
                        <div key={category} className='flex items-center'>
                            <input
                                type='checkbox'
                                name='category'
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCheckboxChange(category)}
                                className='mr-2 cursor-pointer'
                            />
                            <label htmlFor={category} className='cursor-pointer select-none'>{category}</label>
                        </div>
                    ))}
                </div>
            )}

            {selectedOption === 'Operating System' && (
                <div className='space-y-4'>
                    {operatingSystems.map((category) => (
                        <div key={category} className='flex items-center'>
                            <input
                                type='checkbox'
                                name='category'
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCheckboxChange(category)}
                                className='mr-2 cursor-pointer'
                            />
                            <label htmlFor={category} className='cursor-pointer select-none'>{category}</label>
                        </div>
                    ))}
                </div>
            )}

            {selectedOption === 'Game Modes' && (
                <div className='space-y-4'>
                    {gameModes.map((category) => (
                        <div key={category} className='flex items-center'>
                            <input
                                type='checkbox'
                                name='category'
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCheckboxChange(category)}
                                className='mr-2 cursor-pointer'
                            />
                            <label htmlFor={category} className='cursor-pointer select-none'>{category}</label>
                        </div>
                    ))}
                </div>
            )}

            {selectedOption === 'Player Perspective' && (
                <div className='space-y-4'>
                    {playerPerspectives.map((category) => (
                        <div key={category} className='flex items-center'>
                            <input
                                type='checkbox'
                                name='category'
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCheckboxChange(category)}
                                className='mr-2 cursor-pointer'
                            />
                            <label htmlFor={category} className='cursor-pointer select-none'>{category}</label>
                        </div>
                    ))}
                </div>
            )}

            {selectedOption === 'Genres' && (
                <div className='space-y-2'>
                    {genres.map((category) => (
                        <div key={category} className='flex items-center'>
                            <input
                                type='checkbox'
                                name='category'
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCheckboxChange(category)}
                                className='mr-2 cursor-pointer'
                            />
                            <label htmlFor={category} className='cursor-pointer select-none'>{category}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LeftMenu;