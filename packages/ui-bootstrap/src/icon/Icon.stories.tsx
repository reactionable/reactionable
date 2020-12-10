import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { select, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import { Icon } from "./Icon";

export default {
  title: "UI Bootstrap/Components/Icon",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Icon },
  decorators: [withKnobs],
};

export const Introduction = (): ReactElement => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="jumbotron">
            <h1 className="display-4">
              <code>@reactionable/ui-bootstrap</code> - <code>Icon</code>
            </h1>
            <hr />
            <p className="lead">Icon component helps to render Fontawesome icon</p>
            <p>
              It is based on{" "}
              <a href="https://github.com/FortAwesome/react-fontawesome">react-fontawesome</a>
            </p>
            <h5>How to render an icon (template): </h5>
            <pre className="border shadow-sm rounded bg-white p-2">
              <code>{`import { [Icon Name] } from "@fortawesome/free-solid-svg-icons";
import { Icon } from '@reactionable/ui-bootstrap/lib/icon/Icon';
  
const MyIcon = () => (
  <Icon icon={[Icon Name]} />
);`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BasicIcon = (): ReactElement => {
  const color = select(
    "Color",
    ["inherit", "primary", "secondary", "action", "disabled", "error", undefined],
    "primary"
  );

  return <Icon color={color} icon={faAtom} />;
};
