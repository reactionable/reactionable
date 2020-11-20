import "../../config";

import { boolean, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";
import { ListGroup } from "react-bootstrap";

import { Read } from "../../../src/crud/read/Read";
import { UIContextProvider } from "../../../src/UI";

export default {
  title: "UI Bootstrap/Components/Crud/Read",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Read },
  decorators: [withKnobs],
};

export const SimpleRead = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  return (
    <UIContextProvider>
      <Read
        loading={loading}
        refetch={() => null}
        error={hasError && new Error("An error has occured")}
        data={{ id: "1", label: "Data 1" }}
      >
        {({ data }) => (
          <ListGroup>
            <ListGroup.Item>ID: {data.id}</ListGroup.Item>
            <ListGroup.Item>Label: {data.label}</ListGroup.Item>
          </ListGroup>
        )}
      </Read>
    </UIContextProvider>
  );
};
