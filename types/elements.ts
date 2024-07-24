import { IconButtonProps } from '@mui/material/IconButton';
import { ChangeEventHandler } from 'react';

export interface HomeContentProps {
    isFiltered: boolean;
    isSearching: boolean;
}

export interface ButtonProps {
    content: string;
    type: "submit" | "reset" | "button" | undefined;
}

export interface SearchElementProps {
    query: string;
    isFiltered: boolean | undefined;
    handleChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

export interface SelectElementProps {
    selectedOption: string;
    setSelectedOption: (selectedOption: string) => void;
}

export interface PaginationElementProps {
    totalPages: number | undefined;
    currentPage: number | undefined;
    handleChange: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined;
}

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}