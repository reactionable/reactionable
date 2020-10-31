import './config';

import { select, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import Button from 'react-bootstrap/Button';

import { ErrorNotification, useErrorNotification } from '../src/notification/ErrorNotification';
import { Notification, useNotification } from '../src/notification/Notification';
import {
  SuccessNotification,
  useSuccessNotification,
} from '../src/notification/SuccessNotification';

export default {
  title: 'UI Bootstrap/Notification',
  parameters: {
    info: { inline: true },
    component: Notification,
    subComponents: [SuccessNotification, ErrorNotification],
  },
  decorators: [withKnobs],
};

export const notification = () => {
  const variant = select(
    'Variant',
    ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', undefined],
    'primary'
  );
  const title = text('Title', 'This is a notification');
  const content = text('Content', 'This is the notification content');

  return <Notification variant={variant} title={title} children={content} />;
};

export const UseNotification = () => {
  const variant = select(
    'Variant',
    ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', undefined],
    'primary'
  );
  const title = text('Title', 'This is a notification');
  const content = text('Content', 'This is the notification content');

  const { notification, setNotification } = useNotification({ title, variant });

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
