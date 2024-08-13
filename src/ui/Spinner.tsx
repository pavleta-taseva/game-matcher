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
    <div className="mt-12 flex h-fit w-full flex-col items-center justify-start self-center overflow-auto px-4 py-12">
      <CircleLoader
        color={colors.textColor.primaryLight}
        loading={loading}
        cssOverride={override}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1 className="purple-purse-regular mt-4 text-xl text-primaryLight lg:text-4xl">
        Loading content...
      </h1>
    </div>
  );
};

export default Spinner;
