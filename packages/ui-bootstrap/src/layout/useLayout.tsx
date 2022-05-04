import {
  IUseLayoutResult,
  useLayout as useLayoutCore,
} from "@reactionable/core/lib/ui/layout/useLayout";
import { Body } from "./body/Body";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { IUseLayoutProps } from "./Layout";

export function useLayout(props: IUseLayoutProps): IUseLayoutResult {
  return useLayoutCore<IUseLayoutProps>({
    HeaderComponent: Header,
    BodyComponent: Body,
    FooterComponent: Footer,
    ...props,
  });
}
