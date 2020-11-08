import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { render } from '@testing-library/react';
import React from 'react';

import { TestWrapper } from '../../tests/TestWrapper';
import { Read } from './Read';

interface ITestData {
  test: string;
}

describe('Read', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', () => {
    render(
      <TestWrapper>
        <Read<ITestData> data={{ test: '' }} isLoading={false} children={jest.fn()} />
      </TestWrapper>
    );
  });
});
