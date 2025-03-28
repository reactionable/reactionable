import Grid from "@mui/material/Grid";
import { Read as CoreRead, IReadProps as ICoreReadProps, IData } from "@reactionable/core";
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
          <Grid size={"grow"}>{children(props)}</Grid>
        </Grid>
      )}
    </CoreRead>
  );
}
