import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Read as CoreRead, IReadProps as ICoreReadProps } from '@reactionable/core';

export interface IReadProps<Data> extends ICoreReadProps<Data> { };

export function Read<Data>({ children, ...props }: IReadProps<Data>) {
    return <CoreRead<Data>
        {...props}
        children={(data?: Data) => <Container fluid>
            <Row>
                <Col>{children(data)}</Col>
            </Row>
        </Container>}
    />;
};