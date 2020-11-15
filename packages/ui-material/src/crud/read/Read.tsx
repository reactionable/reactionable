import Grid from "@material-ui/core/Grid/Grid";
import {
  Read as CoreRead,
  IReadProps as ICoreReadProps,
} from "@reactionable/core/lib/crud/read/Read";
import React, { ReactElement } from "react";

export type IReadProps<Data> = ICoreReadProps<Data>;

export function Read<Data>({ children, ...props }: IReadProps<Data>): ReactElement {
  return (
    <CoreRead<Data> {...props}>
      {(data: Data) => (
        <Grid container>
          <Grid item xs>
            {children(data)}
          </Grid>
        </Grid>
      )}
    </CoreRead>
  );
}
