import React from 'react';
import { UIContextProvider, i18nTestInstance } from '@reactionable/core';
import { Confirmation } from './Confirmation';
import { useUIContextProviderProps } from '../UI';
import { render, fireEvent } from '@testing-library/react';

describe('Confirmation', () => {
  beforeAll(i18nTestInstance);

  it('should confirm', async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <UIContextProvider {...useUIContextProviderProps()}>
        <Confirmation title="test" callback={callback} />
      </UIContextProvider>
    );

    fireEvent.click(getByText('OK'));

    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should cancel', async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <UIContextProvider {...useUIContextProviderProps()}>
        <Confirmation title="test" callback={callback} />
      </UIContextProvider>
    );

    fireEvent.click(getByText('Cancel'));

    expect(callback).toHaveBeenCalledWith(false);
  });
});
