import Button from "@material-ui/core/Button/Button";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";

import { Alert, useAlert } from "./Alert";
import { ErrorAlert, useErrorAlert } from "./ErrorAlert";
import { WarningAlert, useWarningAlert } from "./WarningAlert";

export default {
  title: "UI Material/Components/Alert",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Alert,
    subComponents: [ErrorAlert, WarningAlert],
  },
  decorators: [withKnobs],
};

export const BasicAlert = (): ReactElement => {
  const severity = select(
    "Severity",
    ["success", "error", "warning", "info", undefined],
    "success"
  );
  const icon = boolean("Custom Icon", false);

  return (
    <Alert severity={severity} icon={icon ? { icon: AnnouncementIcon } : undefined}>
      Test alert
    </Alert>
  );
};

export const UseAlert = (): ReactElement => {
  const content = text("Content", "This is the alert content");
  const severity = select(
    "Severity",
    ["success", "error", "warning", "info", undefined],
    "success"
  );

  const icon = boolean("Custom Icon", false);

  const { alert, setAlert } = useAlert({
    severity,
    icon: icon ? { icon: AnnouncementIcon } : undefined,
  });

  return (
    <>
      <Button onClick={() => setAlert(content)}>Click on me</Button>
      <hr />
      {alert}
    </>
  );
};

export const BasicErrorAlert = (): ReactElement => (
  <ErrorAlert>{new Error("Test error alert")}</ErrorAlert>
);

export const UseErrorAlert = (): ReactElement => {
  const content = text("Content", "This is the error alert content");

  const { errorAlert, setErrorAlert } = useErrorAlert();

  return (
    <>
      <Button onClick={() => setErrorAlert(new Error(content))}>Click on me</Button>
      <hr />
      {errorAlert}
    </>
  );
};

export const BasicWarningAlert = (): ReactElement => (
  <WarningAlert>Test warning alert</WarningAlert>
);

export const UseWarningAlert = (): ReactElement => {
  const content = text("Content", "This is the warning alert content");

  const { warningAlert, setWarningAlert } = useWarningAlert();

  return (
    <>
      <Button onClick={() => setWarningAlert(content)}>Click on me</Button>
      <hr />
      {warningAlert}
    </>
  );
};
