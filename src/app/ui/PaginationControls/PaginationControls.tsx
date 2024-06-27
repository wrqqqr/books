"use client";

import React from "react";
import { Box, Pagination } from "@mui/material";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) =>
  totalPages > 1 ? (
    <Box display="flex" justifyContent="center" marginTop={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  ) : null;

export default PaginationControls;
