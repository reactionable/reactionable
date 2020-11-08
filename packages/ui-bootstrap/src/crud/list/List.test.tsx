import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { render } from '@testing-library/react';
import React from 'react';

import { TestWrapper } from '../../tests/TestWrapper';
import { List } from './List';

interface ITestData {
  test: string;
}

describe('List', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', () => {
    render(
      <TestWrapper>
        <List<ITestData> head={['test']} data={[]} isLoading={false} children={jest.fn()} />
      </TestWrapper>
    );
  });
});
