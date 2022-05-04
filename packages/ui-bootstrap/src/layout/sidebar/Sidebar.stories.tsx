import "../../../stories/config";

import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@reactionable/core/lib/i18n/I18n";
import { useRouteMatch } from "@reactionable/core/lib/router/useRouteMatch";
import { generatePath } from "@reactionable/core/lib/router/RouterLink";
import { FC, ReactElement } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { TestWrapper } from "../../testing/TestWrapper";
import { Sidebar, useSidebarContext } from "./Sidebar";

export default {
  title: "UI Bootstrap/Components/Layout/Sidebar",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Sidebar },
};

const SampleComponent: FC = () => {
  const { t } = useTranslation();
  const match = useRouteMatch();

  const { setNavItems } = useSidebarContext();
  setNavItems([
    {
      href: generatePath(`${match.path}/sample`, match.params),
      title: t("Go to sample page"),
      icon: { icon: faAtom },
      children: t("Sample"),
    },
  ]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card body>
            <h1>Hello, world!</h1>
            <p>
              <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
              <b>Lorem Ipsum</b> has been the industry&apos; standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the
              1960s with the release of Letraset sheets containing <b>Lorem Ipsum</b> passages, and
              more recently with desktop publishing software like Aldus PageMaker including versions
              of <b>Lorem Ipsum</b>
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export const BasicSidebar = (): ReactElement => (
  <TestWrapper>
    <Sidebar>
      <SampleComponent />
    </Sidebar>
  </TestWrapper>
);
