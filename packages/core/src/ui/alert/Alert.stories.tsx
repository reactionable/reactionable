import { text, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";

import { Alert } from "./Alert";
import { ErrorAlert, useErrorAlert } from "./ErrorAlert";
import { useAlert } from "./useAlert";
import { WarningAlert, useWarningAlert } from "./WarningAlert";

export default {
  title: "Core/Components/UI/Alert",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Alert,
    subComponents: [ErrorAlert, WarningAlert],
  },
  decorators: [withKnobs],
};

export const BasicAlert = (): ReactElement => <Alert>Test alert</Alert>;

export const UseAlert = (): ReactElement => {
  const content = text("Content", "This is the alert content");

  const { alert, setAlert } = useAlert();

  return (
    <>
      <button onClick={() => setAlert(content)}>Click on me</button>
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
      <button onClick={() => setErrorAlert(new Error(content))}>Click on me</button>
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
      <button onClick={() => setWarningAlert(content)}>Click on me</button>
      <hr />
      {warningAlert}
    </>
  );
};
