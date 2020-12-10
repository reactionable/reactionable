import "../../../stories/config";

import { boolean, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";
import { ListGroup } from "react-bootstrap";

import { UIContextProvider } from "../../UI";
import { Read } from "./Read";

export default {
  title: "UI Bootstrap/Components/Crud/Read",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Read },
  decorators: [withKnobs],
};

export const BasicRead = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  return (
    <UIContextProvider>
      <Read
        loading={loading}
        refetch={() => null}
        error={hasError ? new Error("An error has occured") : undefined}
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
