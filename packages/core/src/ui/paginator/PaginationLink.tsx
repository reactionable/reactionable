import { AnchorHTMLAttributes, ComponentType, ReactElement } from "react";

export function PaginationLink({
  onClick,
  disabled,
  active,
  ...props
}: IPaginationLinkProps): ReactElement {
  return (
    <a
      href="#"
      className={active ? "active" : ""}
      {...props}
      onClick={(event) => {
        event.preventDefault();
        !disabled && onClick && onClick(event);
      }}
    />
  );
}

export type IPaginationLinkProps = Pick<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onClick" | "children"
> & {
  disabled?: boolean;
  active?: boolean;
};

export type IPaginationLinkComponent = ComponentType<IPaginationLinkProps>;

export function PaginationLinkFirst(props: IPaginationLinkProps): ReactElement {
  return <PaginationLink {...props}>{"<<"}</PaginationLink>;
}
export function PaginationLinkPrev(props: IPaginationLinkProps): ReactElement {
  return <PaginationLink {...props}>{"<"}</PaginationLink>;
}
export function PaginationLinkNext(props: IPaginationLinkProps): ReactElement {
  return <PaginationLink {...props}>{">"}</PaginationLink>;
}
export function PaginationLinkLast(props: IPaginationLinkProps): ReactElement {
  return <PaginationLink {...props}>{">>"}</PaginationLink>;
}
