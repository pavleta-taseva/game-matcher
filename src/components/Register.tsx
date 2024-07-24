'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputElement from '@/src/ui/InputElement';
import SelectFormElement from '@/src/ui/SelectFormElement';
import ButtonElement from '@/src/ui/ButtonElement';
import { useForm, SubmitHandler } from "react-hook-form";
import { genderOptions } from '@/src/utils/filterOptions';

enum GenderEnum {
    female = "female",
    male = "male",
    other = "other",
}

interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string;
    gender: GenderEnum;
}

const Register = () => {
    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

    return (
        <div className='flex flex-col justify-center items-center p-2'>
            <Image
                src={'/images/game-match-logo-transparent.webp'}
                alt='Game match logo image'
                width={150}
                height={150}
            />
            <div className='text-secondaryBlue text-3xl purple-purse-regular mt-2'>Create an account</div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col m-auto mt-4 w-full md:w-1/2 lg:w-1/4 justify-center items-center'>
                <InputElement<IFormInput> label="Email" name="email" register={register} />
                <InputElement<IFormInput> label="Password" name="password" register={register} />
                <div className='text-sm text-primaryLight mb-4'>
                    Use 8 or more characters with a mix of letters, numbers and symbols
                </div>
                <InputElement<IFormInput> label="Confirm password" name="confirmPassword" register={register} />
                <SelectFormElement<IFormInput>
                    label="Gender Selection"
                    name="gender"
                    register={register}
                    options={genderOptions}
                />
                <ButtonElement content='Submit' type='submit' />
            </form>
            <div className='mt-4 text-base'>
                Already have an account? <Link href={'/login'} className='text-secondaryBlue text-base'>Log in</Link>
            </div>
        </div>
    );
};

export default Register;