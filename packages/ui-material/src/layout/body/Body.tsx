import { IBodyProps as ICoreBodyProps } from "@reactionable/core/lib/ui/layout/body/Body";
import { ComponentType, PropsWithChildren, ReactElement } from "react";

import {
  IResponsiveContainerProps,
  ResponsiveContainer,
} from "../responsive-container/ResponsiveContainer";

export type IBodyProps = ICoreBodyProps & IResponsiveContainerProps;
export type BodyComponent = ComponentType<IBodyProps>;

export function Body(props: PropsWithChildren<IBodyProps>): ReactElement {
  return <ResponsiveContainer {...props} component="main" />;
}
