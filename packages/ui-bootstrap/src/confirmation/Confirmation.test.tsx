import React from 'react';
import { Confirmation } from './Confirmation';
import { UIContextProvider } from '../UI';
import { i18nTestInstance } from '@reactionable/core';
import { render, fireEvent } from '@testing-library/react';

describe('Confirmation', () => {
  beforeAll(i18nTestInstance);

  it('should confirm', async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <UIContextProvider>
        <Confirmation title="test" callback={callback} />
      </UIContextProvider>
    );

    fireEvent.click(getByText('OK'));

    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should cancel', async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <UIContextProvider>
        <Confirmation title="test" callback={callback} />
      </UIContextProvider>
    );

    fireEvent.click(getByText('Cancel'));

    expect(callback).toHaveBeenCalledWith(false);
  });
});
