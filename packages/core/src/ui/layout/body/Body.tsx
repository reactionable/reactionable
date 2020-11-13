import React, { ComponentType, PropsWithChildren, ReactElement } from "react";

export type IBodyProps = Record<string, unknown>;
export type BodyComponent<BodyProps extends IBodyProps = IBodyProps> = ComponentType<BodyProps>;

export function Body<BodyProps extends IBodyProps = IBodyProps>({
  children,
}: PropsWithChildren<BodyProps>): ReactElement {
  return <main>{children}</main>;
}
