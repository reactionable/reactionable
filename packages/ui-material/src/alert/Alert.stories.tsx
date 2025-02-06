import Button from "@mui/material/Button";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import type { Meta, StoryObj } from "@storybook/react";

import { Alert, useAlert } from "./Alert";
import { ErrorAlert, IUseErrorAlertProps, useErrorAlert } from "./ErrorAlert";
import { WarningAlert, useWarningAlert } from "./WarningAlert";

const meta: Meta = {
  title: "UI Material/Components/Alert",
  component: Alert,
};

export default meta;

export const BasicAlert: StoryObj<typeof Alert> = {
  args: {
    severity: "success",
    children: "Test alert",
  },
  argTypes: {
    icon: {
      control: {
        type: "boolean",
      },
      mapping: {
        false: undefined,
        true: { icon: AnnouncementIcon },
      },
    },
  },
};

export const UseAlert: StoryObj<typeof Alert> = {
  args: {
    severity: "success",
    children: "This is the alert content",
  },
  argTypes: {
    icon: {
      control: {
        type: "boolean",
      },
      mapping: {
        false: undefined,
        true: { icon: AnnouncementIcon },
      },
    },
  },
  render: ({ variant, children, icon }) => {
    const { alert, setAlert } = useAlert({
      variant,
      icon,
    });

    return (
      <>
        <Button onClick={() => setAlert(children)}>Click on me</Button>
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
        <Button onClick={() => setErrorAlert(error)}>Click on me</Button>
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

export const UseWarningAlert: StoryObj<typeof WarningAlert> = {
  args: {
    children: "Test warning alert",
  },
  render: ({ children, ...props }) => {
    const { warningAlert, setWarningAlert } = useWarningAlert(props);

    return (
      <>
        <Button onClick={() => setWarningAlert(children)}>Click on me</Button>
        <hr />
        {warningAlert}
      </>
    );
  },
};
