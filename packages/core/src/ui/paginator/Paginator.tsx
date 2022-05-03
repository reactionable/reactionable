import { ChangeEvent, ReactElement, useState } from "react";
import { IPaginationComponent, IPaginationProps, Pagination } from "./Pagination";

export type IPaginatorProps = Pick<
  IPaginationProps,
  "onChange" | "currentPage" | "pageRangeDisplayed" | "marginPagesDisplayed"
> & {
  totalCount: number;
  perPage: number;
  PaginationComponent?: IPaginationComponent;
};

export function Paginator({
  totalCount,
  perPage,
  onChange: defaultOnChange,
  currentPage: defaultCurrentPage,
  pageRangeDisplayed,
  marginPagesDisplayed,
  PaginationComponent = Pagination,
}: IPaginatorProps): ReactElement {
  const pageCount = Math.round(totalCount / perPage) + (totalCount % perPage ? 1 : 0);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const onChange = (event: ChangeEvent<unknown>, page: number) => {
    defaultOnChange(event, page);
    setCurrentPage(page);
  };

  return (
    <PaginationComponent
      onChange={onChange}
      currentPage={currentPage}
      pageCount={pageCount}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
    />
  );
}
