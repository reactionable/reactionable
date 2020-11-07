import Grid from '@material-ui/core/Grid/Grid';
import {
  Read as CoreRead,
  IReadProps as ICoreReadProps,
} from '@reactionable/core/lib/crud/read/Read';
import React from 'react';

export interface IReadProps<Data> extends ICoreReadProps<Data> {}

export function Read<Data>({ children, ...props }: IReadProps<Data>) {
  return (
    <CoreRead<Data>
      {...props}
      children={(data: Data) => (
        <Grid container>
          <Grid item xs>
            {children(data)}
          </Grid>
        </Grid>
      )}
    />
  );
}
