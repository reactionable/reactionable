import React, { AnchorHTMLAttributes, ComponentType, useState } from 'react';

export type IPaginationEllipsisProps = {};
export type IPaginationEllipsisComponent = ComponentType<IPaginationEllipsisProps>;
export function PaginationEllipsis(props: IPaginationEllipsisProps) {
  return <span {...props}>...</span>;
}

export type IPaginationLinkProps = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'onClick'> & {
  disabled?: boolean;
  active?: boolean;
};

export type IPaginationLinkComponent = ComponentType<IPaginationLinkProps>;
export function PaginationLink({ disabled, active, onClick, ...props }: IPaginationLinkProps) {
  return (
    <a
      href="#"
      {...props}
      onClick={(event) => {
        event.preventDefault();
        onClick && onClick(event);
      }}
    />
  );
}

export function PaginationLinkFirst(props: IPaginationLinkProps) {
  return <PaginationLink {...props}>{'<<'}</PaginationLink>;
}
export function PaginationLinkPrev(props: IPaginationLinkProps) {
  return <PaginationLink {...props}>{'<'}</PaginationLink>;
}
export function PaginationLinkNext(props: IPaginationLinkProps) {
  return <PaginationLink {...props}>{'>'}</PaginationLink>;
}
export function PaginationLinkLast(props: IPaginationLinkProps) {
  return <PaginationLink {...props}>{'>>'}</PaginationLink>;
}

export type IPaginationLinksProps = Pick<
  IPaginationProps,
  | 'onChange'
  | 'pageCount'
  | 'currentPage'
  | 'pageRangeDisplayed'
  | 'marginPagesDisplayed'
  | 'PaginationLinkComponent'
  | 'PaginationEllipsisComponent'
>;
export type IPaginationLinksComponent = ComponentType<IPaginationLinksProps>;
export function PaginationLinks({
  pageCount,
  currentPage,
  onChange,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 3,
  PaginationLinkComponent = PaginationLink,
  PaginationEllipsisComponent = PaginationEllipsis,
}: IPaginationLinksProps) {
  const items = [];

  const renderLink = (page: number) => (
    <PaginationLinkComponent
      key={page}
      active={currentPage === page}
      disabled={currentPage === page}
      onClick={() => currentPage !== page && onChange(page)}
      children={page}
    />
  );

  if (pageCount <= pageRangeDisplayed) {
    for (let index = 0; index < pageCount; index++) {
      items.push(renderLink(index + 1));
    }
    return <>{items}</>;
  }
  let leftSide = pageRangeDisplayed / 2;
  let rightSide = pageRangeDisplayed - leftSide;

  // If the selected page index is on the default right side of the pagination,
  // we consider that the new right side is made up of it (= only one break element).
  // If the selected page index is on the default left side of the pagination,
  // we consider that the new left side is made up of it (= only one break element).
  if (currentPage > pageCount - pageRangeDisplayed / 2) {
    rightSide = pageCount - currentPage;
    leftSide = pageRangeDisplayed - rightSide;
  } else if (currentPage < pageRangeDisplayed / 2) {
    leftSide = currentPage;
    rightSide = pageRangeDisplayed - leftSide;
  }

  let index;
  let page;
  let breakView;

  for (index = 0; index < pageCount; index++) {
    page = index + 1;

    // If the page index is lower than the margin defined,
    // the page has to be displayed on the left side of
    // the pagination.
    if (page <= marginPagesDisplayed) {
      items.push(renderLink(page));
      continue;
    }

    // If the page index is greater than the page count
    // minus the margin defined, the page has to be
    // displayed on the right side of the pagination.
    if (page > pageCount - marginPagesDisplayed) {
      items.push(renderLink(page));
      continue;
    }

    // If the page index is near the selected page index
    // and inside the defined range (pageRangeDisplayed)
    // we have to display it (it will create the center
    // part of the pagination).
    if (index >= currentPage - leftSide && index <= currentPage + rightSide) {
      items.push(renderLink(page));
      continue;
    }

    // If the page index doesn't meet any of the conditions above,
    // we check if the last item of the current "items" array
    // is a break element. If not, we add a break element, else,
    // we do nothing (because we don't want to display the page).
    if (items[items.length - 1] !== breakView) {
      breakView = <PaginationEllipsisComponent key="break-view" />;
      items.push(breakView);
    }
  }

  return <>{items}</>;
}

export type IPaginationProps = Pick<
  IPaginatorProps,
  'onChange' | 'currentPage' | 'pageRangeDisplayed' | 'marginPagesDisplayed'
> & {
  pageCount: number;
  PaginationLinkComponent?: IPaginationLinkComponent;
  PaginationEllipsisComponent?: IPaginationEllipsisComponent;
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
}: IPaginationProps) {
  const handleFirstPage = () => {
    currentPage > 1 && onChange(1);
  };

  const handlePreviousPage = () => {
    currentPage > 1 && onChange(currentPage - 1);
  };

  const handleNextPage = () => {
    currentPage < pageCount && onChange(currentPage + 1);
  };

  const handleLastPage = () => {
    currentPage < pageCount && onChange(pageCount);
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

export type IPaginatorProps = {
  currentPage: number;
  totalCount: number;
  perPage: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onChange: (page: number) => void;
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
}: IPaginatorProps) {
  const pageCount = Math.round(totalCount / perPage) + (totalCount % perPage ? 1 : 0);
  const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
  const onChange = (page: number) => {
    defaultOnChange(page);
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
