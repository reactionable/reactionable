import "../../stories/config";

import type { Meta, StoryObj } from "@storybook/react";
import Button from "react-bootstrap/Button";

import {
  ErrorNotification,
  IUseErrorNotificationProps,
  useErrorNotification,
} from "./ErrorNotification";
import { IUseNotificationProps, Notification, useNotification } from "./Notification";
import {
  IUseSuccessNotificationProps,
  SuccessNotification,
  useSuccessNotification,
} from "./SuccessNotification";

const meta: Meta<typeof Notification> = {
  title: "UI Bootstrap/Components/Notification",
  component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const BasicNotification: Story = {
  args: {
    title: "Basic notification",
    children: "Basic notification content",
    variant: "primary",
  },
};

export const NotificationWithComplexContent: Story = {
  args: {
    title: "Notification With Complex Content",
    children: (
      <>
        <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
        <b>Lorem Ipsum</b> has been the industry&apos;s standard dummy text ever since the 1500s,
        when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged. It was popularised in the 1960s with the release of
        Letraset sheets containing <b>Lorem Ipsum</b> passages, and more recently with desktop
        publishing software like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
      </>
    ),
    variant: "primary",
  },
};

export const UseNotification: StoryObj<IUseNotificationProps> = {
  args: {
    title: "Use notification",
    children: "Use notification content",
    variant: "primary",
  },
  render: ({ children, ...props }) => {
    const { notification, setNotification } = useNotification(props);

    return (
      <>
        <Button onClick={() => setNotification(children)}>Click on me</Button>
        {notification}
      </>
    );
  },
};

export const BasicSuccessNotification: StoryObj<typeof SuccessNotification> = {
  args: {
    title: "Success notification",
    children: "Success notification content",
  },
};

export const UseSuccessNotification: StoryObj<IUseSuccessNotificationProps> = {
  args: {
    title: "Use success notification",
    children: "Use success notification content",
  },
  render: ({ children, ...props }) => {
    const { successNotification, setSuccessNotification } = useSuccessNotification(props);

    return (
      <>
        <Button onClick={() => setSuccessNotification(children)}>Click on me</Button>
        {successNotification}
      </>
    );
  },
};

export const BasicErrorNotification: StoryObj<typeof ErrorNotification> = {
  args: {
    title: "Error notification",
    error: new Error("Error notification content"),
  },
};

export const UseErrorNotification: StoryObj<IUseErrorNotificationProps> = {
  args: {
    title: "Use error notification",
    error: new Error("Use error notification content"),
  },
  render: ({ error, ...props }) => {
    const { errorNotification, setErrorNotification } = useErrorNotification(props);

    return (
      <>
        <Button onClick={() => setErrorNotification(error)}>Click on me</Button>
        {errorNotification}
      </>
    );
  },
};
