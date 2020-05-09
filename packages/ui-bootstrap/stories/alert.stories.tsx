import React from 'react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { faAtom } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '../src/alert/Alert';
import { ErrorAlert } from '../src/alert/ErrorAlert';
import { WarningAlert } from '../src/alert/WarningAlert';

export default {
  title: 'UI Bootstrap/Alert',
  parameters: { info: { inline: true } },
  decorators: [withKnobs],
};

export const SimpleAlert = () => {
  const variant = select(
    'Variant',
    ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', undefined],
    'primary'
  );
  const icon = boolean('Icon', false);

  return <Alert variant={variant} icon={icon && { icon: faAtom }} children={<>test alert</>} />;
};

export const SimpleErrorAlert = () => <ErrorAlert children={new Error('test error')} />;

export const SimpleWarningAlert = () => <WarningAlert children={'test warning'} />;
