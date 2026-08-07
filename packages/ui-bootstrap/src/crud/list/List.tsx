import {
	List as CoreList,
	type IListProps as ICoreListProps,
	type IData,
} from "@reactionable/core";
import type { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

export type IListProps<Data extends IData = IData> = ICoreListProps<Data>;

export function List<Data extends IData = IData>({
	children,
	...props
}: IListProps<Data>): ReactElement {
	return (
		<CoreList<Data> {...props}>
			{(props) => (
				<Container fluid>
					<Row>
						<Col>{children(props)}</Col>
					</Row>
				</Container>
			)}
		</CoreList>
	);
}
