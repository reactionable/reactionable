import Grid from "@material-ui/core/Grid/Grid";
import {
  List as CoreList,
  IListProps as ICoreListProps,
} from "@reactionable/core/lib/crud/list/List";
import { IData } from "@reactionable/core/lib/query/Query";
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
          <Grid item xs>
            {children(props)}
          </Grid>
        </Grid>
      )}
    </CoreList>
  );
}
