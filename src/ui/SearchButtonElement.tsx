import React from 'react';
import { ButtonProps } from '@/src/types/elements';

const SearchButtonElement = ({ content, type, disabled, onClick, width, height, color, background }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`hidden md:block h-${height} w-${width} rounded-lg bg-${background} px-6 text-base font-bold text-${color} hover:bg-primaryLight disabled:bg-primaryGrey disabled:text-primaryLight disabled:opacity-75 lg:text-xl`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default SearchButtonElement;
