import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { render } from '@testing-library/react';
import React from 'react';

import { Header } from './Header';

describe('Header', () => {
  beforeAll(i18nTestInstance);
  it('should render without crashing', () => {
    render(<Header />);
  });
});
