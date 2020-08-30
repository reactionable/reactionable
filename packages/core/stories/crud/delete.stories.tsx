import { action } from '@storybook/addon-actions';
import React from 'react';

import { Delete } from '../../src/crud/delete/Delete';
import { UIContextProvider } from '../../src/ui/UI';

export default {
  title: 'Core/Crud/Delete',
  parameters: { info: { inline: true }, component: Delete },
};

export const SimpleDelete = () => (
  <UIContextProvider>
    <Delete
      title="Simple label"
      confirmationMessage="Do you want to delete?"
      successMessage="The deletion has been done"
      children={<button>Click on me</button>}
      onConfirm={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        action('Action confirmed')();
        return 'ok';
      }}
      onSuccess={action('Action succeed')}
    />
  </UIContextProvider>
);
