import './config';

import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import Button from 'react-bootstrap/Button';

import { ConfirmationAction, useConfirmation } from '../src/confirmation/Confirmation';
import { UIContextProvider } from '../src/UI';

export default {
  title: 'UI Bootstrap/Confirmation',
  parameters: { info: { inline: true }, component: ConfirmationAction },
  component: ConfirmationAction,
  decorators: [withKnobs],
};

export const confirmationAction = () => (
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

export const UseConfirmation = () => {
  const title = text('Title', 'This is a confirmation');
  const content = text('Content', 'This is a confirmation content');

  const { confirmation, setConfirmation } = useConfirmation({
    title,
    children: content,
    callback: async (confirm: boolean) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      action(confirm ? 'Action confirmed' : 'Action canceled')();
    },
  });

  return (
    <>
      <Button onClick={() => setConfirmation(true)}>Click on me</Button>
      {confirmation}
    </>
  );
};
