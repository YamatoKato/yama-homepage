import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { FC, Dispatch, SetStateAction } from 'react';

const BasicPagination: FC<{
  setPageProp: Dispatch<SetStateAction<number>>;
  currentPage: number;
  allPages: number;
}> = ({ setPageProp, currentPage, allPages }) => {
  return (
    <div className=' flex justify-center'>
      <Stack spacing={2}>
        <Pagination
          count={allPages}
          onChange={(e, page) => setPageProp(page)}
          page={currentPage}
        />
      </Stack>
    </div>
  );
};
export default BasicPagination;
