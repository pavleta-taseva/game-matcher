import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { colors } from '@/assets/styles/colors';
import { PaginationElementProps } from '@/src/types/elements';

const PaginationElement = ({
  totalPages,
  currentPage,
  handleChange,
}: PaginationElementProps) => {
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          color="primary"
          count={totalPages ?? 0}
          variant="outlined"
          shape="rounded"
          page={currentPage}
          onChange={handleChange}
          sx={{
            '& .MuiPaginationItem-root': {
              color: colors.textColor.primaryLight,
              borderColor: colors.textColor.primaryLight,
              marginBottom: 2,
              fontSize: '0.7rem',
            },
            '& .MuiPaginationItem-root.Mui-selected': {
              color: colors.textColor.secondaryBlue,
              borderColor: colors.textColor.secondaryBlue,
              fontSize: '0.7rem',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
          }}
        />
      </Stack>
    </>
  );
};

export default PaginationElement;
