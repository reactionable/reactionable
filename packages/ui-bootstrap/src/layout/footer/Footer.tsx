import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface IFooterProps {
    brand?: ReactElement;
};

export const Footer: React.FC<IFooterProps> = ({ brand }) => {
    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();

    return <footer>
        <Container>
            <Row>
                <Col>
                    {t('Copyright')} &copy; {currentYear} {brand}
                </Col>
            </Row>
        </Container>
    </footer>;
};