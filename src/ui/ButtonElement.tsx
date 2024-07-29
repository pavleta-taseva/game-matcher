import React from 'react';
import { ButtonProps } from 'types/elements';

const ButtonElement = ({ content, type }: ButtonProps) => {
  return (
    <button
      type={type}
      className="px-2 border-2 border-neutral-50 rounded-md w-full lg:w-64 h-10 text-base lg:text-xl font-bold bg-primaryBlue text-primaryDark hover:bg-primaryBlack hover:text-primaryLight"
    >
      {content}
    </button>
  );
};

export default ButtonElement;
