import React from 'react';
import { Alert, useAlert } from '../../src/ui/alert/Alert';
import { withKnobs, text } from '@storybook/addon-knobs';
import { ErrorAlert, useErrorAlert } from '../../src/ui/alert/ErrorAlert';
import { WarningAlert } from '../../../ui-bootstrap/src/alert/WarningAlert';
import { useWarningAlert } from '../../src/ui/alert/WarningAlert';

export default {
  title: 'Core/UI/Alert',
  parameters: {
    info: { inline: true },
    component: Alert,
    subComponents: [ErrorAlert, WarningAlert],
  },
  decorators: [withKnobs],
};

export const alert = () => <Alert>Test alert</Alert>;

export const UseAlert = () => {
  const content = text('Content', 'This is the alert content');

  const { alert, setAlert } = useAlert();

  return (
    <>
      <button onClick={() => setAlert(content)}>Click on me</button>
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
      <button onClick={() => setErrorAlert(new Error(content))}>Click on me</button>
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
      <button onClick={() => setWarningAlert(content)}>Click on me</button>
      <hr />
      {warningAlert}
    </>
  );
};
