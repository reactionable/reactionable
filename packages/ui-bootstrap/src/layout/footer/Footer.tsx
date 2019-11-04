import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IFooterProps as ICoreFooterProps } from '@reactionable/core';

export interface IFooterProps extends ICoreFooterProps {
    sponsor?: boolean;
};

export const Footer: React.FC<IFooterProps> = ({ brand, sponsor = true }) => {
    const { t } = useTranslation();

    const currentYear = new Date().getFullYear();

    return <footer className="footer" style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '60px',
        lineHeight: '60px',
    }}>
        <Container>
            <Row className="justify-content-between">
                <Col>{t('Copyright')} &copy; {currentYear} {brand}</Col>
                {sponsor && <Col className="text-right"><SponsorFooter /></Col>}
            </Row>
        </Container>
    </footer >;
};

export const SponsorFooter: React.FC<{}> = ({ }) => {
    const { t } = useTranslation();
    return <> 
        <span title={t('Powered by')}>⚡ by </span>
        <a href="https://github.com/reactionable/reactionable" title={t('Reactionable - An effective toolkit for React')}>Reactionable</a>
    </>;
};