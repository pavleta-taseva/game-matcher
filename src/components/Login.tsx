'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputElement from '@/src/ui/InputElement';
import ButtonElement from '@/src/ui/ButtonElement';
import GoogleSignInElement from '@/src/ui/GoogleSignInElement';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUsers } from 'services/usersAPI';
import { useAuth } from '@/src/components/AuthProvider';
interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const { loginUser } = useAuth();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await loginUser(data.email, data.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center p-2">
      <Image
        src={'/images/game-match-logo-transparent.webp'}
        alt="Game match logo image"
        width={150}
        height={150}
      />
      <div className="text-secondaryBlue text-3xl purple-purse-regular mt-2">
        Sign in
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col m-auto gap-4 mt-4 w-full md:w-1/2 lg:w-1/4 justify-center items-center"
      >
        <InputElement<IFormInput>
          label="Email"
          name="email"
          register={register}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: 'Invalid email address',
            },
          }}
          error={errors.email}
        />
        <InputElement<IFormInput>
          label="Password"
          name="password"
          type="password"
          register={register}
          validation={{
            required: 'Password is required',
          }}
          error={errors.password}
        />
        <ButtonElement
          content="Sign in"
          type="submit"
          disabled={!watch('email') || !watch('password')}
        />
        <Link href={'/'} className="text-base text-secondaryBlue">
          Forgot password?
        </Link>
      </form>

      <GoogleSignInElement content={'Sign in with Google'} />

      <div className="mt-4 text-base">
        Still not registered?{' '}
        <Link href={'/register'} className="text-secondaryBlue text-base">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;