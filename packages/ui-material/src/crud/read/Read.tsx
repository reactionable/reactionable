import Grid from "@material-ui/core/Grid/Grid";
import { IData } from "@reactionable/core";
import {
  Read as CoreRead,
  IReadProps as ICoreReadProps,
} from "@reactionable/core/lib/crud/read/Read";
import React, { ReactElement } from "react";

export type IReadProps<Data extends IData = IData> = ICoreReadProps<Data>;

export function Read<Data extends IData = IData>({
  children,
  ...props
}: IReadProps<Data>): ReactElement {
  return (
    <CoreRead<Data> {...props}>
      {(props) => (
        <Grid container>
          <Grid item xs>
            {children(props)}
          </Grid>
        </Grid>
      )}
    </CoreRead>
  );
}
