import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Read as CoreRead, IReadProps as ICoreReadProps } from '@reactionable/core';

export interface IReadProps<Data> extends ICoreReadProps<Data> { };

export function Read<Data>({ render, ...props }: IReadProps<Data>) {
    return <CoreRead
        {...props}
        render={(data: Data) => <Container>
            <Row>
                <Col>{render(data)}</Col>
            </Row>
        </Container>}
    />;
};