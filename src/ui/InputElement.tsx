import React from 'react';
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    [key: string]: any;
}

const InputElement = <T extends FieldValues>({ label, name, register, ...rest }: InputProps<T>) => {
    return (
        <div className='flex flex-col mb-4 w-full'>
            <label className='self-start text-secondaryBlue mb-1'>{label}</label>
            <input {...register(name)} {...rest} className='rounded-sm h-8 px-2 outline-none text-primaryDark text-base' />
        </div>
    );
};

export default InputElement;