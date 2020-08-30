import { render } from '@testing-library/react';
import React from 'react';

import { ErrorAlert } from './ErrorAlert';

it('should render without crashing', () => {
  render(<ErrorAlert />);
});
