import React from 'react';
import { action } from '@storybook/addon-actions';
import { ConfirmationAction } from '../../src/ui/confirmation/Confirmation';
import { UIContextProvider, useUIContextProviderProps } from '../../src/ui/UI';

export default { title: 'Core/UI/Confirmation', parameters: { info: { inline: true } } };

export const SimpleConfirmationAction = () => (
  <UIContextProvider {...useUIContextProviderProps()}>
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
        return 'ok';
      }}
      onSuccess={action('Action succeed')}
    />
  </UIContextProvider>
);
