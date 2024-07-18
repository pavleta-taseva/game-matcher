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
        <div className='flex flex-col w-full h-screen gap-4'>
            <CircleLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinner;