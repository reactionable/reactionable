import type { PaginationProps } from "@mui/material/Pagination";
import {
	Paginator as CorePaginator,
	type IPaginatorProps as ICorePaginatorProps,
} from "@reactionable/core";
import type { ReactElement } from "react";
import { Pagination } from "./Pagination";

export type IPaginatorProps = Omit<ICorePaginatorProps, "PaginationComponent">;
export function Paginator(
	props: IPaginatorProps & PaginationProps,
): ReactElement {
	return <CorePaginator {...props} PaginationComponent={Pagination} />;
}
