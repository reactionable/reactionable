import React from 'react';
import { i18nTestInstance } from '../../tests/I18n';
import { render } from '@testing-library/react';
import { ConfirmationAction } from './Confirmation';
import { UIContextProvider, useUIContextProviderProps } from '../UI';

describe('ConfirmationAction', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', async () => {
    const onConfirm = jest.fn();
    const onSuccess = jest.fn();

    render(
      <UIContextProvider {...useUIContextProviderProps()}>
        <ConfirmationAction
          title="test title"
          successMessage="test success message"
          confirmationMessage="test confirmation message"
          onConfirm={onConfirm}
          onSuccess={onSuccess}
        />
      </UIContextProvider>
    );
  });
});
