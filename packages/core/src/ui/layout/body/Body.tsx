import * as React from 'react';
export interface IBodyProps {};
export type BodyComponent<B extends IBodyProps = IBodyProps> = React.FC<B>;