import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import { ReactElement } from "react";

import { Layout, useLayout } from "./Layout";

export default {
  title: "UI Material/Components/Layout",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Layout,
    sub_components: [useLayout],
  },
};

const LayoutContent = () => (
  <Paper elevation={3}>
    <Box p={2}>
      <h1>Hello, world!</h1>
      <p>
        <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
        <b>Lorem Ipsum</b> has been the industry&apos; standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
      </p>
      <p>
        <Button color="primary">Learn more</Button>
      </p>
    </Box>
  </Paper>
);

export const BasicLayout = (): ReactElement => (
  <Layout>
    <LayoutContent />
  </Layout>
);

export const LayoutWithHeader = (): ReactElement => (
  <Layout header={{ brand: "My App" }}>
    <LayoutContent />
  </Layout>
);

export const LayoutWithFooter = (): ReactElement => (
  <Layout footer={{ brand: "My App" }}>
    <LayoutContent />
  </Layout>
);

export const LayoutWithHeaderAndFooter = (): ReactElement => (
  <Layout header={{ brand: "My App" }} footer={{ brand: "My App" }}>
    <LayoutContent />
  </Layout>
);

export const UseLayout = (): ReactElement => {
  return useLayout({
    children: <LayoutContent />,
    header: {
      brand: "My App",
    },
  });
};
