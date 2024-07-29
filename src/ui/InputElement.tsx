import React from 'react';
import { UseFormRegister, FieldValues, Path, RegisterOptions, FieldError } from "react-hook-form";

interface InputProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    validation?: RegisterOptions<T, Path<T>>;
    error?: FieldError;
    [key: string]: any;
}

const InputElement = <T extends FieldValues>({ label, name, register, validation, error, ...rest }: InputProps<T>) => {
    return (
        <div className='flex flex-col mb-4 w-full'>
            <label className='self-start text-secondaryBlue mb-1'>{label}</label>
            <input {...register(name, validation)} {...rest} className='rounded-sm h-8 px-2 outline-none text-primaryDark text-base' />
            {error && <span className='text-primaryRed text-sm mt-2'>{error.message}</span>}
        </div>
    );
};

export default InputElement;