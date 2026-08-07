import MaterialUIPagination, {
	type PaginationProps,
} from "@mui/material/Pagination";
import type { IPaginationProps as ICorePaginationProps } from "@reactionable/core";
import type { ReactElement } from "react";

export type IPaginationProps = Omit<
	ICorePaginationProps,
	| "PaginationLinkComponent"
	| "PaginationEllipsisComponent"
	| "PaginationLinkFirstComponent"
	| "PaginationLinkPrevComponent"
	| "PaginationLinkNextComponent"
	| "PaginationLinkLastComponent"
> &
	PaginationProps;

export function Pagination({
	pageCount: count,
	currentPage: page,
	pageRangeDisplayed,
	marginPagesDisplayed,
	...props
}: IPaginationProps): ReactElement {
	void pageRangeDisplayed;
	void marginPagesDisplayed;

	return <MaterialUIPagination page={page} count={count} {...props} />;
}
