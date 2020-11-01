import Button from '@material-ui/core/Button/Button';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { ErrorNotification, useErrorNotification } from '../src/notification/ErrorNotification';
import { Notification, useNotification } from '../src/notification/Notification';
import {
  SuccessNotification,
  useSuccessNotification,
} from '../src/notification/SuccessNotification';

export default {
  title: 'UI Material/Notification',
  parameters: {
    info: { inline: true },
    component: Notification,
    subComponents: [SuccessNotification, ErrorNotification],
  },
  decorators: [withKnobs],
};

export const SimpleNotification = () => {
  const title = text('Title', 'This is a notification');
  const content = text('Content', 'This is the notification content');

  return <Notification title={title}>{content}</Notification>;
};

export const NotificationWithComplexContent = () => {
  const content = (
    <>
      <b>Lorem Ipsum</b> is simply dummy text of the printing and typesetting industry.{' '}
      <b>Lorem Ipsum</b> has been the industry's standard dummy text ever since the 1500s, when an
      unknown printer took a galley of type and scrambled it to make a type specimen book. It has
      survived not only five centuries, but also the leap into electronic typesetting, remaining
      essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
      containing <b>Lorem Ipsum</b> passages, and more recently with desktop publishing software
      like Aldus PageMaker including versions of <b>Lorem Ipsum</b>
    </>
  );
  return <Notification title="Notification With Complex Content" children={content} />;
};

export const UseNotification = () => {
  const title = text('Title', 'This is a notification');
  const content = text('Content', 'This is the notification content');

  const { notification, setNotification } = useNotification({ title, children: content });

  return (
    <>
      <Button onClick={() => setNotification(content)}>Click on me</Button>
      {notification}
    </>
  );
};

export const successNotification = () => {
  const title = text('Title', 'This is a success notification');
  const content = text('Content', 'This is the success notification content');

  return <SuccessNotification title={title} children={content} />;
};

export const UseSuccessNotification = () => {
  const title = text('Title', 'This is a success notification');
  const content = text('Content', 'This is the success notification content');

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

export const errorNotification = () => {
  const title = text('Title', 'This is an error notification');
  const content = text('Content', 'This is an error notification content');

  return <ErrorNotification title={title} children={new Error(content)} />;
};

export const UseErrorNotification = () => {
  const title = text('Title', 'This is a success notification');
  const content = text('Content', 'This is the success notification content');

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
