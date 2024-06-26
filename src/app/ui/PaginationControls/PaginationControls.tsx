"use client";

import React from "react";
import { Box, Pagination } from "@mui/material";

const PaginationControls = ({ totalPages, currentPage, handlePageChange }) =>
  totalPages > 1 && (
    <Box display="flex" justifyContent="center" marginTop={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );

export default PaginationControls;
