import Grid from "@material-ui/core/Grid/Grid";
import {
  Read as CoreRead,
  IReadProps as ICoreReadProps,
} from "@reactionable/core/lib/crud/read/Read";
import { IData } from "@reactionable/core/lib/query/Query";
import { ReactElement } from "react";

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
