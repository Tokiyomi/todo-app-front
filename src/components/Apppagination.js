import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

export default function BasicPagination() {
    return (
      <Box sx={{ my: 2  }} style={{ display: "flex", justifyContent: "center" }}>
        <Pagination count={10} />
      </Box>
    );
  }