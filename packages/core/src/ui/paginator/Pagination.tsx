import { ChangeEvent, ComponentType, ReactElement } from "react";
import {
  IPaginationLinkComponent,
  PaginationLinkFirst,
  PaginationLinkLast,
  PaginationLinkNext,
  PaginationLinkPrev,
} from "./PaginationLink";

import { IPaginationLinksProps, PaginationLinks } from "./PaginationLinks";

export type IPaginationProps = Pick<
  IPaginationLinksProps,
  | "onChange"
  | "pageCount"
  | "currentPage"
  | "pageRangeDisplayed"
  | "marginPagesDisplayed"
  | "PaginationLinkComponent"
  | "PaginationEllipsisComponent"
> & {
  PaginationLinkFirstComponent?: IPaginationLinkComponent;
  PaginationLinkPrevComponent?: IPaginationLinkComponent;
  PaginationLinkNextComponent?: IPaginationLinkComponent;
  PaginationLinkLastComponent?: IPaginationLinkComponent;
};
export type IPaginationComponent = ComponentType<IPaginationProps>;

export function Pagination({
  currentPage,
  onChange,
  pageCount,
  pageRangeDisplayed,
  marginPagesDisplayed,
  PaginationLinkComponent,
  PaginationEllipsisComponent,
  PaginationLinkFirstComponent = PaginationLinkFirst,
  PaginationLinkPrevComponent = PaginationLinkPrev,
  PaginationLinkNextComponent = PaginationLinkNext,
  PaginationLinkLastComponent = PaginationLinkLast,
}: IPaginationProps): ReactElement {
  const handleFirstPage = (event: ChangeEvent<unknown>) => {
    currentPage > 1 && onChange(event, 1);
  };

  const handlePreviousPage = (event: ChangeEvent<unknown>) => {
    currentPage > 1 && onChange(event, currentPage - 1);
  };

  const handleNextPage = (event: ChangeEvent<unknown>) => {
    currentPage < pageCount && onChange(event, currentPage + 1);
  };

  const handleLastPage = (event: ChangeEvent<unknown>) => {
    currentPage < pageCount && onChange(event, pageCount);
  };

  return (
    <>
      <PaginationLinkFirstComponent onClick={handleFirstPage} disabled={currentPage < 2} />
      <PaginationLinkPrevComponent onClick={handlePreviousPage} disabled={currentPage < 2} />
      <PaginationLinks
        pageCount={pageCount}
        currentPage={currentPage}
        onChange={onChange}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={marginPagesDisplayed}
        PaginationLinkComponent={PaginationLinkComponent}
        PaginationEllipsisComponent={PaginationEllipsisComponent}
      />
      <PaginationLinkNextComponent onClick={handleNextPage} disabled={currentPage >= pageCount} />
      <PaginationLinkLastComponent onClick={handleLastPage} disabled={currentPage >= pageCount} />
    </>
  );
}
