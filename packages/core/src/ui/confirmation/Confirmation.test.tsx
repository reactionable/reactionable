import { render } from '@testing-library/react';
import React from 'react';

import { i18nTestInstance } from '../../tests/I18n';
import { UIContextProvider, useUIProviderProps } from '../UI';
import { ConfirmationAction } from './Confirmation';

describe('ConfirmationAction', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', async () => {
    const onConfirm = jest.fn();
    const onSuccess = jest.fn();

    render(
      <UIContextProvider {...useUIProviderProps()}>
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
