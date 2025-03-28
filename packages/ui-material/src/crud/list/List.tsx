import Grid from "@mui/material/Grid";
import { List as CoreList, IListProps as ICoreListProps, IData } from "@reactionable/core";
import { ReactElement } from "react";

export type IListProps<Data extends IData = IData> = ICoreListProps<Data>;

export function List<Data extends IData = IData>({
  children,
  ...props
}: IListProps<Data>): ReactElement {
  return (
    <CoreList<Data> {...props}>
      {(props) => (
        <Grid container>
          <Grid size={"grow"}>
            {children(props)}
          </Grid>
        </Grid>
      )}
    </CoreList>
  );
}
