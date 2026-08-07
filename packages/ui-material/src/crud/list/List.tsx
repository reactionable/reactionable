import Grid from "@mui/material/Grid";
import {
	List as CoreList,
	type IListProps as ICoreListProps,
	type IData,
} from "@reactionable/core";
import type { ReactElement } from "react";

export type IListProps<Data extends IData = IData> = ICoreListProps<Data>;

export function List<Data extends IData = IData>({
	children,
	...props
}: IListProps<Data>): ReactElement {
	return (
		<CoreList<Data> {...props}>
			{(props) => (
				<Grid container>
					<Grid size={"grow"}>{children(props)}</Grid>
				</Grid>
			)}
		</CoreList>
	);
}
