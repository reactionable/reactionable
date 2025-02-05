import { PaginationProps } from "@material-ui/lab/Pagination/Pagination";
import {
  Paginator as CorePaginator,
  IPaginatorProps as ICorePaginatorProps,
} from "@reactionable/core";
import { ReactElement } from "react";
import { Pagination } from "./Pagination";

export type IPaginatorProps = Omit<ICorePaginatorProps, "PaginationComponent">;
export function Paginator(props: IPaginatorProps & PaginationProps): ReactElement {
  return <CorePaginator {...props} PaginationComponent={Pagination} />;
}
