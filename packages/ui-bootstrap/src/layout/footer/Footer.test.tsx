import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from './Footer';
import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';

describe('Footer', () => {
  beforeAll(i18nTestInstance);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
