import React, { PureComponent } from 'react';
import Pagination from 'react-bootstrap/Pagination';

interface State {
  pageCount: number;
}

interface Props {
  currentPage: number;
  totalCount: number;
  perPage: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  onChange: (page: number) => void;
}

export class Paginator extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageCount:
        Math.round(this.props.totalCount / this.props.perPage) +
        (this.props.totalCount % this.props.perPage ? 1 : 0),
    };
  }

  public render(): JSX.Element {
    return (
      <Pagination>
        <Pagination.First onClick={this.handleFirstPage} disabled={this.props.currentPage === 1} />
        <Pagination.Prev
          onClick={this.handlePreviousPage}
          disabled={this.props.currentPage === 1}
        />
        {this.renderPagination()}
        <Pagination.Next
          onClick={this.handleNextPage}
          disabled={this.props.currentPage === this.state.pageCount}
        />
        <Pagination.Last
          onClick={this.handleLastPage}
          disabled={this.props.currentPage === this.state.pageCount}
        />
      </Pagination>
    );
  }

  private renderPagination(): JSX.Element[] {
    const items = [];

    const pageCount = this.state.pageCount || 0;

    const pageRangeDisplayed = this.props.pageRangeDisplayed || 2;
    const marginPagesDisplayed = this.props.marginPagesDisplayed || 3;

    if (pageCount <= pageRangeDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(this.renderPageLink(index + 1));
      }
      return items;
    }
    let leftSide = pageRangeDisplayed / 2;
    let rightSide = pageRangeDisplayed - leftSide;

    // If the selected page index is on the default right side of the pagination,
    // we consider that the new right side is made up of it (= only one break element).
    // If the selected page index is on the default left side of the pagination,
    // we consider that the new left side is made up of it (= only one break element).
    if (this.props.currentPage > pageCount - pageRangeDisplayed / 2) {
      rightSide = pageCount - this.props.currentPage;
      leftSide = pageRangeDisplayed - rightSide;
    } else if (this.props.currentPage < pageRangeDisplayed / 2) {
      leftSide = this.props.currentPage;
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
        items.push(this.renderPageLink(page));
        continue;
      }

      // If the page index is greater than the page count
      // minus the margin defined, the page has to be
      // displayed on the right side of the pagination.
      if (page > pageCount - marginPagesDisplayed) {
        items.push(this.renderPageLink(page));
        continue;
      }

      // If the page index is near the selected page index
      // and inside the defined range (pageRangeDisplayed)
      // we have to display it (it will create the center
      // part of the pagination).
      if (
        index >= this.props.currentPage - leftSide &&
        index <= this.props.currentPage + rightSide
      ) {
        items.push(this.renderPageLink(page));
        continue;
      }

      // If the page index doesn't meet any of the conditions above,
      // we check if the last item of the current "items" array
      // is a break element. If not, we add a break element, else,
      // we do nothing (because we don't want to display the page).
      if (items[items.length - 1] !== breakView) {
        breakView = <Pagination.Ellipsis />;
        items.push(breakView);
      }
    }

    return items;
  }

  private renderPageLink(page: number): JSX.Element {
    return (
      <Pagination.Item
        key={page}
        current={this.props.currentPage === page}
        onClick={() => this.props.onChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  private handleFirstPage = () => {
    this.props.onChange(1);
  };

  private handlePreviousPage = () => {
    this.props.onChange(this.props.currentPage - 1);
  };

  private handleNextPage = () => {
    this.props.onChange(this.props.currentPage + 1);
  };

  private handleLastPage = () => {
    this.props.onChange(this.state.pageCount);
  };
}
