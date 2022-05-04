import { PropsWithChildren, ReactElement } from "react";
import { ILayoutProps, LayoutComponent, Layout } from "./Layout";

export type IUseLayoutProps<LayoutProps extends ILayoutProps = ILayoutProps> = PropsWithChildren<
  LayoutProps & { Component?: LayoutComponent<LayoutProps> }
>;

export type IUseLayoutResult = ReactElement;

export type IUseLayout<UseLayoutProps extends IUseLayoutProps> = (
  props: UseLayoutProps
) => IUseLayoutResult;

export function useLayout<UseLayoutProps extends IUseLayoutProps>({
  Component,
  ...props
}: UseLayoutProps): IUseLayoutResult {
  if (!Component) {
    Component = Layout;
  }
  return <Component {...props} />;
}
