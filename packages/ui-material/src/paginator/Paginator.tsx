import Pagination from '@material-ui/lab/Pagination/Pagination';
import React, { ChangeEvent, useState } from 'react';

interface IPaginatorProps {
  currentPage: number;
  totalCount: number;
  perPage: number;
  onChange: (page: number) => void;
}

export function Paginator({ currentPage, perPage, totalCount, onChange }: IPaginatorProps) {
  const [page, setPage] = useState(currentPage);
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    onChange(value);
    setPage(value);
  };
  const totalPage = Math.round((totalCount + perPage - 1) / perPage);
  return <Pagination count={totalPage} page={page} onChange={handleChange} />;
}
