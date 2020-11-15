import Grid from "@material-ui/core/Grid/Grid";
import { IBodyProps as ICoreBodyProps } from "@reactionable/core/lib/ui/layout/body/Body";
import React, { ComponentType, PropsWithChildren, ReactElement } from "react";

export type IBodyProps = ICoreBodyProps;
export type BodyComponent = ComponentType<IBodyProps>;

export function Body({ children }: PropsWithChildren<IBodyProps>): ReactElement {
  return (
    <main>
      <Grid container>
        <Grid item>{children}</Grid>
      </Grid>
    </main>
  );
}
