'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputElement from '@/src/ui/InputElement';
import ButtonElement from '@/src/ui/ButtonElement';
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    email: string;
    password: string;
}

const Login = () => {
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
            <div className='text-secondaryBlue text-3xl purple-purse-regular mt-2'>Sign in</div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col m-auto gap-4 mt-4 w-full md:w-1/2 lg:w-1/4 justify-center items-center'>
                <InputElement<IFormInput> label="Email" name="email" register={register} />
                <InputElement<IFormInput> label="Password" name="password" register={register} />
                <ButtonElement content='Sign in' type='submit' />
                <Link href={'/login'} className='text-base text-secondaryBlue'>Forgot password?</Link>
            </form>
            <div className='mt-4 text-base'>
                Still not registered? <Link href={'/login'} className='text-secondaryBlue text-base'>Sign up</Link>
            </div>
        </div>
    );
};

export default Login;