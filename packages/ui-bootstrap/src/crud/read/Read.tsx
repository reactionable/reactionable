import {
	Read as CoreRead,
	type IReadProps as ICoreReadProps,
	type IData,
} from "@reactionable/core";
import type { ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

export type IReadProps<Data extends IData = IData> = ICoreReadProps<Data>;

export function Read<Data extends IData = IData>({
	children,
	...props
}: IReadProps<Data>): ReactElement {
	return (
		<CoreRead<Data> {...props}>
			{(props) => (
				<Container fluid>
					<Row>
						<Col>{children(props)}</Col>
					</Row>
				</Container>
			)}
		</CoreRead>
	);
}
