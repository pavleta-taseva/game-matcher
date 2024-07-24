import React from 'react';
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface SelectProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    options: string[];
    [key: string]: any;
}

const SelectFormElement = <T extends FieldValues>({ label, name, register, options, ...rest }: SelectProps<T>) => {
    return (
        <div className='flex flex-col mb-4 w-full'>
            <label className='self-start text-secondaryBlue text-base mb-2'>{label}</label>
            <select {...register(name)} {...rest} className='rounded-sm text-primaryDark h-8 mb-4'>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectFormElement;
