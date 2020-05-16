import React from 'react';
import { i18nTestInstance } from '../tests/I18n';
import { render } from '@testing-library/react';
import { QueryWrapper } from './QueryWrapper';

describe('QueryWrapper', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', async () => {
    const children = jest.fn();

    render(<QueryWrapper isLoading={false} children={children} />);

    expect(children).not.toHaveBeenCalled();
  });

  it('should render render children only when data is defined', async () => {
    const children = jest.fn();

    const data = 'test';

    render(<QueryWrapper isLoading={false} children={children} data={data} />);

    expect(children).toHaveBeenCalledWith({
      data,
      isLoading: false,
      setErrorAlert: expect.any(Function),
      setLoading: expect.any(Function),
      setWarningAlert: expect.any(Function),
    });
  });
});
