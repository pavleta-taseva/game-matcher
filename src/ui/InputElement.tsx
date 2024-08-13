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
  [key: string]: any;
}

const InputElement = <T extends FieldValues>({
  label,
  name,
  register,
  validation,
  error,
  ...rest
}: InputProps<T>) => {
  return (
    <div className="mb-4 flex w-full flex-col">
      <label className="mb-1 self-start text-secondaryBlue">{label}</label>
      <input
        {...register(name, validation)}
        {...rest}
        className="h-8 rounded-sm px-2 text-base text-primaryDark outline-none"
      />
      {error && (
        <span className="mt-2 text-sm text-primaryRed">{error.message}</span>
      )}
    </div>
  );
};

export default InputElement;
