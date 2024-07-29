import React from 'react';
import { CheckboxGroupProps } from '../../types/components';

const CheckboxGroup = ({
  options,
  checkBoxValues,
  onChange,
}: CheckboxGroupProps) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-1/2 space-y-2">
        {options?.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              name="filter"
              id={option}
              checked={checkBoxValues.includes(option)}
              onChange={() => onChange(option)}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor={option} className="cursor-pointer select-none">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
