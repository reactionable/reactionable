import { ReactElement } from "react";

import { Notification } from "./Notification";

export default {
  title: "Core/Components/UI/Notification",
  parameters: { info: { inline: true }, options: { showPanel: true }, component: Notification },
};

export const BasicNotification = (): ReactElement => (
  <Notification title="Basic notification">Basic notification content</Notification>
);

export const NotificationWithComplexContent = (): ReactElement => (
  <Notification title="Notification With Complex Content">
    <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{" "}
    <b>Lorem Ipsum</b> has been the industry&apos;s standard dummy text ever since the 1500s, when
    an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
    survived not only five centuries, but also the leap into electronic typesetting, remaining
    essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
    containing <b>Lorem Ipsum</b> passages, and more recently with desktop publishing software like
    Aldus PageMaker including versions of <b>Lorem Ipsum</b>
  </Notification>
);
