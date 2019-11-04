import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IBodyProps as ICoreBodyProps } from '@reactionable/core';

export interface IBodyProps extends ICoreBodyProps { };

export const Body: React.FC<IBodyProps> = ({ children }) => {
    return <main>
        <Container>
            <Row>
                <Col>{children}</Col>
            </Row>
        </Container>
    </main>;
};