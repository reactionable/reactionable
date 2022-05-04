import { ChangeEvent, ComponentType, ReactElement } from "react";
import { IPaginationEllipsisComponent, PaginationEllipsis } from "./PaginationEllipsis";
import { IPaginationLinkComponent, PaginationLink } from "./PaginationLink";

export type IPaginationLinksProps = {
  onChange: (event: ChangeEvent<unknown>, page: number) => void;
  pageCount: number;
  currentPage: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  PaginationLinkComponent?: IPaginationLinkComponent;
  PaginationEllipsisComponent?: IPaginationEllipsisComponent;
};

export type IPaginationLinksComponent = ComponentType<IPaginationLinksProps>;

export function PaginationLinks({
  pageCount,
  currentPage,
  onChange,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 3,
  PaginationLinkComponent = PaginationLink,
  PaginationEllipsisComponent = PaginationEllipsis,
}: IPaginationLinksProps): ReactElement {
  const items = [];

  const renderLink = (page: number) => (
    <PaginationLinkComponent
      key={page}
      active={currentPage === page}
      disabled={currentPage === page}
      onClick={(event) => {
        currentPage !== page && onChange(event, page);
      }}
    >
      {page}
    </PaginationLinkComponent>
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
