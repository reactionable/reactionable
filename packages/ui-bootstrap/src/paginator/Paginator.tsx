import {
	Paginator as CorePaginator,
	type IPaginatorProps as ICorePaginatorProps,
} from "@reactionable/core";
import type { ReactElement } from "react";
import { Pagination } from "./Pagination";

export type IPaginatorProps = Omit<ICorePaginatorProps, "PaginationComponent">;
export function Paginator(props: IPaginatorProps): ReactElement {
	return <CorePaginator {...props} PaginationComponent={Pagination} />;
}
