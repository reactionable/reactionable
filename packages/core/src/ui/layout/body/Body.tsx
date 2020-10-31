import React, { ComponentType, PropsWithChildren } from 'react';
export interface IBodyProps {}
export type BodyComponent<BodyProps extends IBodyProps = IBodyProps> = ComponentType<BodyProps>;

export function Body<BodyProps extends IBodyProps = IBodyProps>({
  children,
}: PropsWithChildren<BodyProps>) {
  return <main>{children}</main>;
}
