import {
  Paginator as CorePaginator,
  IPaginatorProps as ICorePaginatorProps,
} from "@reactionable/core/lib/ui/paginator/Paginator";
import { ReactElement } from "react";
import { Pagination } from "./Pagination";

export type IPaginatorProps = Omit<ICorePaginatorProps, "PaginationComponent">;
export function Paginator(props: IPaginatorProps): ReactElement {
  return <CorePaginator {...props} PaginationComponent={Pagination} />;
}
