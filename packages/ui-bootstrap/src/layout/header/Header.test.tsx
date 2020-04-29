import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './Header';
import { i18nTestInstance } from '@reactionable/core/lib/tests/i18n';

describe('Header', () => {
  beforeAll(i18nTestInstance);
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
