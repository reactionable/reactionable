import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from 'react-bootstrap/Button';
import { Delete } from '../../src/crud/delete/Delete';
import { UIContextProvider } from '../../src/UI';
import '../config';

export default {
  title: 'UI Bootstrap/Crud/Delete',
  parameters: {
    info: { inline: true },
    component: Delete,
  },
};

export const SimpleDelete = () => (
  <UIContextProvider>
    <Delete
      title="Simple label"
      label="Simple delete button"
      confirmationMessage="Do you want to delete?"
      successMessage="The deletion has been done"
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
