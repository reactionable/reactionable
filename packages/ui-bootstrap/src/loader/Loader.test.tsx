import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import React from 'react';
import ReactDOM from 'react-dom';

import { Loader } from './Loader';

describe('Loader', () => {
  beforeAll(i18nTestInstance);
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
