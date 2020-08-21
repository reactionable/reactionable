import React from 'react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { Alert, useAlert } from '../src/alert/Alert';
import { ErrorAlert, useErrorAlert } from '../src/alert/ErrorAlert';
import { WarningAlert, useWarningAlert } from '../src/alert/WarningAlert';
import './config';

export default {
  title: 'UI Bootstrap/Alert',
  parameters: {
    info: { inline: true },
    component: Alert,
    subComponents: [ErrorAlert, WarningAlert],
  },
  decorators: [withKnobs],
};

export const alert = (args) => {
  const variant = select(
    'Variant',
    ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', undefined],
    'primary'
  );
  const icon = boolean('Icon', false);

  return (
    <Alert variant={variant} icon={icon && { icon: faAtom }}>
      Test alert
    </Alert>
  );
};

export const UseAlert = () => {
  const content = text('Content', 'This is the alert content');
  const variant = select(
    'Variant',
    ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', undefined],
    'primary'
  );

  const icon = boolean('Icon', false);

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

export const errorAlert = () => <ErrorAlert children={new Error('Test error alert')} />;

export const UseErrorAlert = () => {
  const content = text('Content', 'This is the error alert content');

  const { errorAlert, setErrorAlert } = useErrorAlert();

  return (
    <>
      <Button onClick={() => setErrorAlert(new Error(content))}>Click on me</Button>
      <hr />
      {errorAlert}
    </>
  );
};

export const warningAlert = () => <WarningAlert>Test warning alert</WarningAlert>;

export const UseWarningAlert = () => {
  const content = text('Content', 'This is the warning alert content');

  const { warningAlert, setWarningAlert } = useWarningAlert();

  return (
    <>
      <Button onClick={() => setWarningAlert(content)}>Click on me</Button>
      <hr />
      {warningAlert}
    </>
  );
};
