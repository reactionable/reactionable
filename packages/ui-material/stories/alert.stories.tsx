import { faAtom } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button/Button';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { Alert, useAlert } from '../src/alert/Alert';
import { ErrorAlert, useErrorAlert } from '../src/alert/ErrorAlert';
import { WarningAlert, useWarningAlert } from '../src/alert/WarningAlert';

export default {
  title: 'UI Material/Alert',
  parameters: {
    info: { inline: true },
    component: Alert,
    subComponents: [ErrorAlert, WarningAlert],
  },
  decorators: [withKnobs],
};

export const alert = (args) => {
  const severity = select(
    'Severity',
    ['success', 'error', 'warning', 'info', undefined],
    'success'
  );
  const icon = boolean('Icon', false);

  return (
    <Alert severity={severity} icon={icon && { icon: faAtom }}>
      Test alert
    </Alert>
  );
};

export const UseAlert = () => {
  const content = text('Content', 'This is the alert content');
  const severity = select(
    'Severity',
    ['success', 'error', 'warning', 'info', undefined],
    'success'
  );

  const icon = boolean('Icon', false);

  const { alert, setAlert } = useAlert({
    severity,
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
