import type { Meta, StoryObj } from "@storybook/react-vite";

import { Alert } from "./Alert";
import { ErrorAlert, IUseErrorAlertProps, useErrorAlert } from "./ErrorAlert";
import { useAlert } from "./useAlert";
import { IUseWarningAlertProps, WarningAlert, useWarningAlert } from "./WarningAlert";

const meta: Meta<typeof Alert> = {
  title: "Core/Components/UI/Alert",
  component: Alert,
};

export default meta;

export const BasicAlert: StoryObj<typeof Alert> = {
  args: {
    children: "Test alert",
  },
};

export const UseAlert: StoryObj<typeof Alert> = {
  args: {
    children: "This is the alert content",
  },
  render: ({ children }) => {
    const { alert, setAlert } = useAlert();

    return (
      <>
        <button onClick={() => setAlert(children)}>Click on me</button>
        <hr />
        {alert}
      </>
    );
  },
};

export const BasicErrorAlert: StoryObj<typeof ErrorAlert> = {
  args: {
    error: new Error("Test error alert"),
  },
  render: (props) => <ErrorAlert {...props} />,
};

export const UseErrorAlert: StoryObj<IUseErrorAlertProps> = {
  args: {
    error: new Error("Test error alert"),
  },
  render: ({ error, ...props }) => {
    const { errorAlert, setErrorAlert } = useErrorAlert(props);

    return (
      <>
        <button onClick={() => setErrorAlert(error)}>Click on me</button>
        <hr />
        {errorAlert}
      </>
    );
  },
};

export const BasicWarningAlert: StoryObj<typeof WarningAlert> = {
  args: {
    children: "Test warning alert",
  },
  render: (props) => <WarningAlert {...props} />,
};

export const UseWarningAlert: StoryObj<IUseWarningAlertProps> = {
  args: {
    children: "Test warning alert",
  },
  render: ({ children, ...props }) => {
    const { warningAlert, setWarningAlert } = useWarningAlert(props);

    return (
      <>
        <button onClick={() => setWarningAlert(children)}>Click on me</button>
        <hr />
        {warningAlert}
      </>
    );
  },
};
