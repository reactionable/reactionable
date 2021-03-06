import Star from "@material-ui/icons/Star";
import { select, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import { Icon } from "./Icon";

export default {
  title: "UI Material/Components/Icon",
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
              <code>@reactionable/ui-material</code> - <code>Icon</code>
            </h1>
            <hr />
            <p className="lead">Icon component helps to render Material UI icon</p>
            <p>
              It is based on{" "}
              <a href="https://material-ui.com/components/icons/#icons/">Material UI Icons</a>
            </p>
            <h5>How to render an icon (template): </h5>
            <pre className="border shadow-sm rounded bg-white p-2">
              <code>{`import { [Icon Name] } from '@material-ui/icons';
import { Icon } from '@reactionable/ui-material/lib/icon/Icon';
  
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

  return <Icon color={color} icon={Star} />;
};

export const IconWithComponentAsProp = (): ReactElement => {
  return <Icon {...Star} />;
};
