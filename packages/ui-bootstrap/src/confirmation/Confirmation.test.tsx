import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { TestWrapper } from '../tests/TestWrapper';
import { Confirmation } from './Confirmation';

describe('Confirmation', () => {
  beforeAll(i18nTestInstance);

  it('should confirm', async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <TestWrapper>
        <Confirmation title="test" callback={callback} />
      </TestWrapper>
    );

    fireEvent.click(getByText('OK'));

    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should cancel', async () => {
    const callback = jest.fn();

    const { getByText } = render(
      <TestWrapper>
        <Confirmation title="test" callback={callback} />
      </TestWrapper>
    );

    fireEvent.click(getByText('Cancel'));

    expect(callback).toHaveBeenCalledWith(false);
  });
});
