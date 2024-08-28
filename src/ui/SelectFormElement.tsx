import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  options: string[];
  [key: string]: any;
}

const SelectFormElement = <T extends FieldValues>({
  label,
  name,
  register,
  options,
  ...rest
}: SelectProps<T>) => {
  return (
    <div className="mb-4 flex w-full flex-col lg:w-96">
      <label className="text-secondaryBlue mb-2 self-start text-base">
        {label}
      </label>
      <select
        {...register(name)}
        {...rest}
        defaultValue={options[2]}
        className="mb-4 h-8 rounded-sm text-primaryDark"
        name="gender"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFormElement;
