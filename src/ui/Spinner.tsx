import React, { CSSProperties } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import { LoadingSpinnerProps } from '@/src/types/components';
import { colors } from '@/assets/styles/colors';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'none',
};

const Spinner = ({ loading }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col w-full h-fit self-center items-center mt-12 justify-start py-12 px-4 overflow-auto">
      <CircleLoader
        color={colors.textColor.primaryLight}
        loading={loading}
        cssOverride={override}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1 className="text-primaryLight text-xl lg:text-4xl purple-purse-regular mt-4">
        Loading content...
      </h1>
    </div>
  );
};

export default Spinner;
