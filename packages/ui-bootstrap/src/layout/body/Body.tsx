import type { IBodyProps as ICoreBodyProps } from "@reactionable/core";
import type { ComponentType, PropsWithChildren, ReactElement } from "react";
import { Col, Container, Row } from "react-bootstrap";

export type IBodyProps = ICoreBodyProps;
export type BodyComponent = ComponentType<IBodyProps>;

export function Body({
	children,
}: PropsWithChildren<IBodyProps>): ReactElement {
	return (
		<main>
			<Container fluid>
				<Row>
					<Col>{children}</Col>
				</Row>
			</Container>
		</main>
	);
}
