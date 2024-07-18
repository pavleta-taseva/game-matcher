import React, { useState, CSSProperties, useEffect } from 'react';
import CircleLoader from "react-spinners/CircleLoader";
import { LoadingSpinnerProps } from '../../types/components';

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "none",
};

const Spinner = ({ loading }: LoadingSpinnerProps) => {
    let [color, setColor] = useState("#ffffff");

    return (
        <div className='flex flex-col w-full h-screen rounded-lg self-center items-center justify-start py-12 px-4 bg-secondaryGrey opacity-90 shadow-grey overflow-auto'>
            <CircleLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={60}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <h1 className='text-primaryLight text-4xl purple-purse-regular mt-4'>Loading games...</h1>
        </div>
    )
}

export default Spinner;