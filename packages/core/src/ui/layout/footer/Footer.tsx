import { ReactElement, FC } from 'react';
export interface IFooterProps {
    brand?: ReactElement | string;
};
export type FooterComponent<F extends IFooterProps = IFooterProps> = FC<F>;