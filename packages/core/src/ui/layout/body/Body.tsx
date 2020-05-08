import React, { FC } from 'react';
export interface IBodyProps {}
export type BodyComponent<B extends IBodyProps = IBodyProps> = FC<B>;

export const Body: BodyComponent = ({ children }) => {
  return <main>{children}</main>;
};
