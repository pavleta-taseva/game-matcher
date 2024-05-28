import React from 'react';

interface CheckboxGroupProps {
    options: string[];
    selectedOptions: string[];
    onChange: (option: string) => void;
}

const CheckboxGroup = ({ options, selectedOptions, onChange }: CheckboxGroupProps) => {
    const half = Math.ceil(options.length / 2);
    const firstHalf = options.slice(0, half);
    const secondHalf = options.slice(half);

    return (
        <div className='flex flex-wrap'>
            <div className='w-1/2 space-y-2'>
                {firstHalf.map((option) => (
                    <div key={option} className='flex items-center'>
                        <input
                            type='checkbox'
                            name='filter'
                            id={option}
                            checked={selectedOptions.includes(option)}
                            onChange={() => onChange(option)}
                            className='mr-2 cursor-pointer'
                        />
                        <label htmlFor={option} className='cursor-pointer select-none'>{option}</label>
                    </div>
                ))}
            </div>
            <div className='w-1/2 space-y-2'>
                {secondHalf.map((option) => (
                    <div key={option} className='flex items-center'>
                        <input
                            type='checkbox'
                            name='filter'
                            id={option}
                            checked={selectedOptions.includes(option)}
                            onChange={() => onChange(option)}
                            className='mr-2 cursor-pointer'
                        />
                        <label htmlFor={option} className='cursor-pointer select-none'>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;