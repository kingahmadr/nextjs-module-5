"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// const pageSize = 30;
interface PaginationProps {
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  count?: number;
}

export default function PaginationRounded({
  onChange,
  count,
}: PaginationProps) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        onChange={onChange}
      />
    </Stack>
  );
}
