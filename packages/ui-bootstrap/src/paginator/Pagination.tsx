import {
  Pagination as CorePagination,
  IPaginationProps as ICorePaginationProps,
} from "@reactionable/core/lib/ui/paginator/Pagination";
import { IPaginationEllipsisComponent } from "@reactionable/core/lib/ui/paginator/PaginationEllipsis";
import { ReactElement } from "react";
import BootstrapPagination from "react-bootstrap/Pagination";

export type IPaginationProps = Omit<
  ICorePaginationProps,
  | "PaginationLinkComponent"
  | "PaginationEllipsisComponent"
  | "PaginationLinkFirstComponent"
  | "PaginationLinkPrevComponent"
  | "PaginationLinkNextComponent"
  | "PaginationLinkLastComponent"
>;

export function Pagination(props: IPaginationProps): ReactElement {
  return (
    <BootstrapPagination>
      <CorePagination
        {...props}
        PaginationLinkComponent={BootstrapPagination.Item}
        PaginationEllipsisComponent={BootstrapPagination.Ellipsis as IPaginationEllipsisComponent}
        PaginationLinkFirstComponent={BootstrapPagination.First}
        PaginationLinkPrevComponent={BootstrapPagination.Prev}
        PaginationLinkNextComponent={BootstrapPagination.Next}
        PaginationLinkLastComponent={BootstrapPagination.Last}
      />
    </BootstrapPagination>
  );
}
