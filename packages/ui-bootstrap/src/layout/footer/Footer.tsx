import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import {
  IFooterProps as ICoreFooterProps,
  SponsorFooter,
} from "@reactionable/core/lib/ui/layout/footer/Footer";
import React, { ComponentType, DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { PropsWithChildren } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export type IFooterProps = ICoreFooterProps &
  Omit<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, "onSelect">;

export type FooterComponent = ComponentType<IFooterProps>;

export function Footer({
  brand,
  sponsor = true,
  ...footerProps
}: PropsWithChildren<IFooterProps>): ReactElement {
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  footerProps.style = {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60px",
    lineHeight: "60px",
    ...footerProps.style,
  };

  return (
    <footer {...footerProps}>
      <Container>
        <Row className="justify-content-between">
          <Col>
            {t("Copyright")} &copy; {currentYear} {brand}
          </Col>
          {sponsor && (
            <Col className="text-right">
              <SponsorFooter />
            </Col>
          )}
        </Row>
      </Container>
    </footer>
  );
}
