import { render } from '@testing-library/react';
import React from 'react';

import { i18nTestInstance } from '../../tests/I18n';
import { Paginator } from './Paginator';

describe('Paginator', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', () => {
    const currentPage = 1;
    const totalCount = 10;
    const perPage = 2;
    const onChange = jest.fn();
    render(
      <Paginator
        currentPage={currentPage}
        totalCount={totalCount}
        perPage={perPage}
        onChange={onChange}
      />
    );
  });
});
