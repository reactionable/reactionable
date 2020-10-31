import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { render } from '@testing-library/react';
import React from 'react';

import { UserHeaderNav } from './UserHeaderNav';

describe('UserHeaderNav', () => {
  beforeAll(i18nTestInstance);
  it('should render without crashing', () => {
    render(<UserHeaderNav />);
  });
});
