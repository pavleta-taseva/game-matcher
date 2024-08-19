'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InputElement from '@/src/ui/InputElement';
import SelectFormElement from '@/src/ui/SelectFormElement';
import ButtonElement from '@/src/ui/ButtonElement';
import GoogleSignInElement from '../ui/GoogleSignInElement';
import { useForm, SubmitHandler } from 'react-hook-form';
import { genderOptions } from '@/src/utils/filterOptions';
import { useAuth } from '@/src/components/AuthProvider';
import { BiSolidHide, BiSolidShow } from 'react-icons/bi';

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string;
  gender: GenderEnum;
  username: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registerUser } = useAuth();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await registerUser(
        data.email,
        data.username,
        data.password,
        data.confirmPassword,
        data.gender
      );
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <Image
        src={'/images/game-match-logo-transparent.webp'}
        alt="Game match logo image"
        width={150}
        height={150}
      />
      <div className="purple-purse-regular mt-2 text-3xl text-primaryPurple">
        Create an account
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto mt-4 flex w-full flex-col items-center justify-center md:w-1/2 lg:w-1/4"
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
          label="Username"
          name="username"
          register={register}
          validation={{
            required: 'Username is required',
            pattern: {
              value: /^[A-Za-z0-9]*$/,
              message: 'Invalid username',
            },
          }}
          error={errors.username}
        />
        <InputElement<IFormInput>
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          register={register}
          validation={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message:
                'Minimum length is 8 with a mix of letters, numbers and symbols',
            },
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
        {!errors.password && (
          <div className="mb-4 w-full text-sm text-primaryLight md:w-1/2 lg:w-96">
            Use 8 or more characters with a mix of letters, numbers and symbols
          </div>
        )}
        <InputElement<IFormInput>
          label="Confirm password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          register={register}
          validation={{
            required: 'Confirm Password is required',
            minLength: {
              value: 8,
              message:
                'Minimum length is 8 with a mix of letters, numbers and symbols',
            },
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          }}
          rightIcon={
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-xl text-primaryDark"
            >
              {showPassword ? <BiSolidShow /> : <BiSolidHide />}
            </span>
          }
          error={errors.confirmPassword}
        />
        <SelectFormElement<IFormInput>
          label="Gender Selection"
          name="gender"
          register={register}
          options={genderOptions}
        />
        <ButtonElement
          content="Submit"
          type="submit"
          disabled={
            !watch('email') ||
            !watch('username') ||
            !watch('password') ||
            !watch('confirmPassword')
          }
        />
      </form>
      <div className="mt-4 text-base">
        Already have an account?{' '}
        <Link href={'/login'} className="text-base text-primaryPurple">
          Log in
        </Link>
      </div>
      <div className="mt-4 w-full text-center text-primaryLight md:w-1/2 lg:w-64">
        {' '}
        ----------- OR -----------{' '}
      </div>

      <GoogleSignInElement content={'Continue with Google'} />
    </div>
  );
};

export default Register;
