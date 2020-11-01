import { action } from '@storybook/addon-actions';
import React from 'react';

import { ConfirmationAction } from '../../src/ui/confirmation/Confirmation';
import { UIContextProvider, useUIProviderProps } from '../../src/ui/UI';

export default {
  title: 'Core/UI/Confirmation',
  parameters: { info: { inline: true }, component: ConfirmationAction },
};

export const confirmationAction = () => (
  <UIContextProvider {...useUIProviderProps()}>
    <ConfirmationAction
      title="Confirm?"
      confirmationMessage="Do you want to perform this action"
      successMessage="The action has been confirmed"
      children={
        <div>
          <button>Click on me</button>
          <hr />
        </div>
      }
      onConfirm={async () => {
        action('Action confirmed')();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return 'ok';
      }}
      onSuccess={action('Action succeed')}
    />
  </UIContextProvider>
);
