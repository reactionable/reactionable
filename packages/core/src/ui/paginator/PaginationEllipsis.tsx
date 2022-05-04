import { ComponentType, ReactElement } from "react";

export type IPaginationEllipsisProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;
export type IPaginationEllipsisComponent = ComponentType<IPaginationEllipsisProps>;

export function PaginationEllipsis(props: IPaginationEllipsisProps): ReactElement {
  return <span {...props}>...</span>;
}
