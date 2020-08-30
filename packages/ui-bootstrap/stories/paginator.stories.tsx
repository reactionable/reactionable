import './config';

import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { Paginator } from '../src/paginator/Paginator';

export default {
  title: 'UI Bootstrap/Paginator',
  parameters: {
    info: { inline: true },
    component: Paginator,
  },
  decorators: [withKnobs],
};

export const paginator = () => {
  const currentPage = number('Current page', 2);
  const totalCount = number('Total count', 2);
  const perPage = number('Per page', 2);
  const pageRangeDisplayed = number('Page range displayed', 2);
  const marginPagesDisplayed = number('Margin pages displayed', 2);
  const onChange = action(`Page changed`);

  return (
    <Paginator
      currentPage={currentPage}
      totalCount={totalCount}
      perPage={perPage}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      onChange={onChange}
    />
  );
};
