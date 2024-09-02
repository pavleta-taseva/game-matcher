import { IconButtonProps } from '@mui/material/IconButton';
import React, { ChangeEventHandler } from 'react';

export interface ButtonProps {
  content: React.ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  width?: number;
  height?: number;
  color?: string;
  background?: string;
}

export interface SearchElementProps {
  query: string;
  isFiltered: boolean | undefined;
  handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
  handleSearch: ChangeEventHandler<HTMLInputElement> | undefined;
  handleSubmit: React.MouseEventHandler | undefined;
}

export interface SelectElementProps {
  selectedOption: string;
  setSelectedOption: (selectedOption: string) => void;
}

export interface PaginationElementProps {
  totalPages: number | undefined;
  currentPage: number | undefined;
  handleChange:
    | ((event: React.ChangeEvent<unknown>, page: number) => void)
    | undefined;
}

export interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export interface HomeContentProps {
  isFiltered: boolean;
  isSearching: boolean;
}
