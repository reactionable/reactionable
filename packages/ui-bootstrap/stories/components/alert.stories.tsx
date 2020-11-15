import "../config";

import { faAtom } from "@fortawesome/free-solid-svg-icons";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import React, { ReactElement } from "react";
import Button from "react-bootstrap/Button";

import { Alert, useAlert } from "../../src/alert/Alert";
import { ErrorAlert, useErrorAlert } from "../../src/alert/ErrorAlert";
import { WarningAlert, useWarningAlert } from "../../src/alert/WarningAlert";

export default {
  title: "UI Bootstrap/Components/Alert",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Alert,
    subComponents: [ErrorAlert, WarningAlert],
  },
  decorators: [withKnobs],
};

export const alert = (): ReactElement => {
  const variant = select(
    "Variant",
    ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light", undefined],
    "primary"
  );
  const icon = boolean("Icon", false);

  return (
    <Alert variant={variant} icon={icon && { icon: faAtom }}>
      Test alert
    </Alert>
  );
};

export const UseAlert = (): ReactElement => {
  const content = text("Content", "This is the alert content");
  const variant = select(
    "Variant",
    ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light", undefined],
    "primary"
  );

  const icon = boolean("Icon", false);

  const { alert, setAlert } = useAlert({
    variant,
    icon: icon && { icon: faAtom },
  });

  return (
    <>
      <Button onClick={() => setAlert(content)}>Click on me</Button>
      <hr />
      {alert}
    </>
  );
};

export const errorAlert = (): ReactElement => (
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

export const warningAlert = (): ReactElement => <WarningAlert>Test warning alert</WarningAlert>;

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
