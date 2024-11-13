'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputElement from '@/src/ui/InputElement';
import ButtonElement from '@/src/ui/ButtonElement';
import GoogleSignInElement from '@/src/ui/GoogleSignInElement';
import { useForm, SubmitHandler } from 'react-hook-form';
import { getUsers } from 'services/usersAPI';
import { useAuth } from '@/../context/AuthProvider';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';

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
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await loginUser(data.email, data.password);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <Image
        src={'/images/game-match-logo-transparent.webp'}
        alt="Game match logo image"
        width={150}
        height={150}
      />
      <div className="purple-purse-regular mt-2 text-3xl text-primaryPurple">
        Sign in
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto mt-4 flex w-full flex-col items-center justify-center gap-4 md:w-1/2 lg:w-80"
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
          type={showPassword ? 'text' : 'password'}
          register={register}
          validation={{
            required: 'Password is required',
          }}
          rightIcon={
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="text-xl text-primaryDark"
            >
              {showPassword ? <BiSolidShow /> : <BiSolidHide />}
            </span>
          }
          error={errors.password}
        />
        <ButtonElement
          content="Sign in"
          type="submit"
          disabled={!watch('email') || !watch('password')}
        />
        <Link href={'/'} className="text-base text-primaryPurple">
          Forgot password?
        </Link>
      </form>

      <GoogleSignInElement content={'Sign in with Google'} />

      <div className="mt-4 text-base">
        Still not registered?{' '}
        <Link href={'/register'} className="text-base text-primaryPurple">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
