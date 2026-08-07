import {
	ListTable as CoreListTable,
	type IListTableProps as ICoreListTableProps,
	type IData,
	type IListTableComponentProps,
	ListTableBody,
	ListTableHead,
} from "@reactionable/core";
import type { ReactElement } from "react";
import { Table } from "react-bootstrap";

export type IListTableProps<Data extends IData = IData> =
	ICoreListTableProps<Data>;

export function ListTableComponent<Data extends IData = IData>({
	head,
	...bodyProps
}: IListTableComponentProps<Data>): ReactElement {
	return (
		<Table striped bordered hover responsive>
			<ListTableHead head={head} />
			<ListTableBody {...bodyProps} />
		</Table>
	);
}

export function ListTable<Data extends IData = IData>(
	props: IListTableProps<Data>,
): ReactElement {
	return <CoreListTable<Data> Component={ListTableComponent} {...props} />;
}
