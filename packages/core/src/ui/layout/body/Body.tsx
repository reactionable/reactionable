import { FC } from 'react';
export interface IBodyProps {};
export type BodyComponent<B extends IBodyProps = IBodyProps> = FC<B>;