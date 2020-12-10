import "../../../stories/config";

import { boolean, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import { UIContextProvider } from "../../UI";
import { List } from "./List";
import { ListTable } from "./ListTable";

export default {
  title: "UI Bootstrap/Components/Crud/List",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: List,
    subcomponents: [ListTable],
  },
  decorators: [withKnobs],
};

export const BasicList = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);
  return (
    <UIContextProvider>
      <List
        loading={loading}
        error={hasError ? new Error("An error has occured") : undefined}
        data={{
          count: 2,
          items: [
            { id: "1", label: "Data 1" },
            { id: "2", label: "Data 2" },
          ],
        }}
        refetch={() => null}
      >
        {({ data }) => (
          <ul>
            {data.items.map((item) => (
              <li key={item.id}>
                <dl>
                  <dt>Id</dt>
                  <dd>{item.id}</dd>
                  <dt>Label</dt>
                  <dd>{item.label}</dd>
                </dl>
              </li>
            ))}
          </ul>
        )}
      </List>
    </UIContextProvider>
  );
};

export const BasicListTable = (): ReactElement => {
  const loading = boolean("Is loading?", false);
  const hasError = boolean("Has error?", false);

  return (
    <UIContextProvider>
      <ListTable
        loading={loading}
        error={hasError ? new Error("An error has occured") : undefined}
        head={["ID", "Label"]}
        data={{
          count: 2,
          items: [
            { id: "1", label: "Data 1" },
            { id: "2", label: "Data 2" },
          ],
        }}
        refetch={() => null}
      >
        {(data) => (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.label}</td>
          </tr>
        )}
      </ListTable>
    </UIContextProvider>
  );
};
