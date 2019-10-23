import * as React from 'react';
import ReactDOM from 'react-dom';
import { ErrorAlert } from './ErrorAlert';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ErrorAlert />, div);
  ReactDOM.unmountComponentAtNode(div);
});
