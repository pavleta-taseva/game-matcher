import React from 'react';
import { ButtonProps } from '@/src/types/elements';

const ButtonElement = ({ content, type, disabled, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="border-neutral-50 h-10 w-full rounded-md border-2 bg-primaryBlue px-2 text-base font-bold text-primaryDark hover:bg-primaryBlack hover:text-primaryLight disabled:bg-primaryBlue disabled:text-primaryLight disabled:opacity-75 lg:w-64 lg:text-xl"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default ButtonElement;
