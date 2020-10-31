import { render } from '@testing-library/react';
import React from 'react';

import { TestWrapper } from '../tests/TestWrapper';
import { RouterLink } from './Link';

describe('Link', () => {
  describe('RouterLink', () => {
    it('should render without crashing', () => {
      render(
        <TestWrapper>
          <RouterLink />
        </TestWrapper>
      );
    });
  });
});
