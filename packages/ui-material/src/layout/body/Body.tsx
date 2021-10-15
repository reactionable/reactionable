import { Theme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { IBodyProps as ICoreBodyProps } from "@reactionable/core/lib/ui/layout/body/Body";
import { ComponentType, PropsWithChildren, ReactElement } from "react";

import {
  IResponsiveContainerProps,
  ResponsiveContainer,
} from "../responsive-container/ResponsiveContainer";

export type IBodyProps = ICoreBodyProps & IResponsiveContainerProps;
export type BodyComponent = ComponentType<IBodyProps>;

export function Body({
  component = "main",
  ...props
}: PropsWithChildren<IBodyProps>): ReactElement {
  return (
    <ResponsiveContainer
      {...props}
      sx={deepmerge(
        {
          minHeight: (theme: Theme) => `calc(100% - ${theme.spacing(18)}px)`,
        },
        props.sx
      )}
      component={component}
    />
  );
}
