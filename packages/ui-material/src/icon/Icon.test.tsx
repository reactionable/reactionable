import Star from '@material-ui/icons/Star';
import { i18nTestInstance } from '@reactionable/core/src/tests/I18n';
import { render } from '@testing-library/react';
import React from 'react';

import { Icon } from './Icon';

describe('Icon', () => {
  beforeAll(i18nTestInstance);

  it('should render with an icon prop', () => {
    render(<Icon icon={Star} />);
  });

  it('should render with an icon prop and color', () => {
    render(<Icon icon={Star} color="secondary" />);
  });

  it('should render with a component as prop', () => {
    render(<Icon {...Star} />);
  });
});
