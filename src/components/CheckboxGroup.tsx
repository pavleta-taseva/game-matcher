import React from 'react';
import { CheckboxGroupProps } from 'types/components';

const CheckboxGroup = ({ options, checkBoxValues, onChange }: CheckboxGroupProps) => {
    const genresCount = options?.length || 0;
    const half = Math.ceil(genresCount / 2);
    const firstHalf = options?.slice(0, half);
    const secondHalf = options?.slice(half);

    return (
        <div className='flex flex-wrap'>
            <div className='w-1/2 space-y-2'>
                {firstHalf?.map((value) => (
                    <div key={value} className='flex items-center'>
                        <input
                            type='checkbox'
                            name='filter'
                            id={value}
                            checked={checkBoxValues.includes(value)}
                            onChange={() => onChange(value)}
                            className='mr-2 cursor-pointer'
                        />
                        <label htmlFor={value} className='cursor-pointer select-none'>{value}</label>
                    </div>
                ))}
            </div>
            <div className='w-1/2 space-y-2'>
                {secondHalf?.map((value) => (
                    <div key={value} className='flex items-center'>
                        <input
                            type='checkbox'
                            name='filter'
                            id={value}
                            checked={checkBoxValues.includes(value)}
                            onChange={() => onChange(value)}
                            className='mr-2 cursor-pointer'
                        />
                        <label htmlFor={value} className='cursor-pointer select-none'>{value}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;