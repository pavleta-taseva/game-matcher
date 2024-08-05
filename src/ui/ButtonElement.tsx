import React from 'react';
import { ButtonProps } from '@/src/types/elements';

const ButtonElement = ({ content, type, disabled }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="px-2 border-2 border-neutral-50 rounded-md w-full lg:w-64 h-10 text-base lg:text-xl font-bold bg-primaryBlue text-primaryDark hover:bg-primaryBlack hover:text-primaryLight disabled:opacity-75 disabled:bg-primaryBlue disabled:text-primaryLight"
    >
      {content}
    </button>
  );
};

export default ButtonElement;
