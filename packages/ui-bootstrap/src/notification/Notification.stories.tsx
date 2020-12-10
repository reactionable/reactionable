import "../../stories/config";

import { select, text, withKnobs } from "@storybook/addon-knobs";
import { ReactElement } from "react";
import Button from "react-bootstrap/Button";

import { ErrorNotification, useErrorNotification } from "./ErrorNotification";
import { Notification, useNotification } from "./Notification";
import { SuccessNotification, useSuccessNotification } from "./SuccessNotification";

export default {
  title: "UI Bootstrap/Components/Notification",
  parameters: {
    info: { inline: true },
    options: { showPanel: true },
    component: Notification,
    subComponents: [SuccessNotification, ErrorNotification],
  },
  decorators: [withKnobs],
};

export const BasicNotification = (): ReactElement => {
  const variant = select(
    "Variant",
    ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light", undefined],
    "primary"
  );
  const title = text("Title", "This is a Basic notification");
  const content = text("Content", "This is the notification content");

  return (
    <Notification variant={variant} title={title}>
      {content}
    </Notification>
  );
};

export const NotificationWithComplexContent = (): ReactElement => {
  const variant = select(
    "Variant",
    ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light", undefined],
    "primary"
  );
  const title = text("Title", "This is a notification With Complex Content");
  const content = (
    <>
      <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
      <b>Lorem Ipsum</b> has been the industry&apos;s standard dummy text ever since the 1500s, when
      an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
      survived not only five centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
      containing <b>Lorem Ipsum</b> passages, and more recently with desktop publishing software
      like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
    </>
  );
  return (
    <Notification variant={variant} title={title}>
      {content}
    </Notification>
  );
};

export const UseNotification = (): ReactElement => {
  const variant = select(
    "Variant",
    ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light", undefined],
    "primary"
  );
  const title = text("Title", "This is a notification");
  const content = text("Content", "This is the notification content");

  const { notification, setNotification } = useNotification({ title, variant });

  return (
    <>
      <Button onClick={() => setNotification(content)}>Click on me</Button>
      {notification}
    </>
  );
};

export const BasicSuccessNotification = (): ReactElement => {
  const title = text("Title", "This is a success notification");
  const content = text("Content", "This is the success notification content");

  return <SuccessNotification title={title}>{content}</SuccessNotification>;
};

export const UseSuccessNotification = (): ReactElement => {
  const title = text("Title", "This is a success notification");
  const content = text("Content", "This is the success notification content");

  const { successNotification, setSuccessNotification } = useSuccessNotification({
    title,
  });

  return (
    <>
      <Button onClick={() => setSuccessNotification(content)}>Click on me</Button>
      {successNotification}
    </>
  );
};

export const BasicErrorNotification = (): ReactElement => {
  const title = text("Title", "This is an error notification");
  const content = text("Content", "This is an error notification content");

  return <ErrorNotification title={title}>{new Error(content)}</ErrorNotification>;
};

export const UseErrorNotification = (): ReactElement => {
  const title = text("Title", "This is a success notification");
  const content = text("Content", "This is the success notification content");

  const { errorNotification, setErrorNotification } = useErrorNotification({
    title,
  });

  return (
    <>
      <Button onClick={() => setErrorNotification(new Error(content))}>Click on me</Button>
      {errorNotification}
    </>
  );
};
