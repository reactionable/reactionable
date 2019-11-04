import * as React from 'react';
export interface IFooterProps {
    brand?: React.ReactElement|string;
};
export type FooterComponent<F extends IFooterProps = IFooterProps> = React.FC<F>;