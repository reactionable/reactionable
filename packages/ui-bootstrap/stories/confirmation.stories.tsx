import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from 'react-bootstrap/Button';
import { UIContextProvider } from '../src/UI';
import { ConfirmationAction } from '../src/confirmation/Confirmation';
import './config';

export default {
  title: 'UI Bootstrap/Confirmation',
  parameters: { info: { inline: true }, component: ConfirmationAction },
  component: ConfirmationAction,
};

export const SimpleConfirmationAction = () => (
  <UIContextProvider>
    <ConfirmationAction
      title="Confirm?"
      confirmationMessage="Do you want to perform this action"
      successMessage="The action has been confirmed"
      children={<Button>Click on me</Button>}
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action('Action confirmed')();
        return 'ok';
      }}
      onSuccess={action('Action succeed')}
    />
  </UIContextProvider>
);
