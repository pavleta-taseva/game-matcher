import React from 'react';
import {
  UseFormRegister,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
  rightIcon?: React.ReactNode;
  [key: string]: any;
}

const InputElement = <T extends FieldValues>({
  label,
  name,
  register,
  validation,
  error,
  rightIcon,
  ...rest
}: InputProps<T>) => {
  return (
    <div className="relative mb-4 flex w-full flex-col md:w-1/2 lg:w-96">
      <label className="text-secondaryBlue mb-1 self-start">{label}</label>
      <input
        {...register(name, validation)}
        {...rest}
        className="h-8 rounded-sm px-2 text-base text-primaryDark outline-none"
      />
      {rightIcon && (
        <span className="absolute right-2 top-11 -translate-y-1/2 transform cursor-pointer">
          {rightIcon}
        </span>
      )}
      {error && (
        <span className="mt-2 text-sm text-primaryRed">{error.message}</span>
      )}
    </div>
  );
};

export default InputElement;
