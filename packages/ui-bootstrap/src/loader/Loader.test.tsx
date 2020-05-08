import React from 'react';
import ReactDOM from 'react-dom';
import { Loader } from './Loader';
import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';

describe('Loader', () => {
  beforeAll(i18nTestInstance);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
