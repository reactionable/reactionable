import { render } from '@testing-library/react';
import React from 'react';

import { Body } from './Body';

it('should render without crashing', () => {
  render(<Body />);
});
