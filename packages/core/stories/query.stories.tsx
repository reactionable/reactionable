import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { QueryWrapper } from '../src/query/QueryWrapper';
import { UIContextProvider, useUIProviderProps } from '../src/ui/UI';

export default {
  title: 'Core/Query',
  parameters: { info: { inline: true } },
  decorators: [withKnobs],
};

export const queryWrapper = () => {
  const isLoading = boolean('Is loading?', false);
  const hasError = boolean('Has error?', false);
  const hasData = boolean('Has data?', false);
  const content = text('Content', 'This is the data content');

  const children = ({ data }) => {
    return <p>{data && data.content}</p>;
  };

  return (
    <UIContextProvider {...useUIProviderProps()}>
      <h3>Query result</h3>
      <QueryWrapper<{ content: string }>
        isLoading={isLoading}
        error={hasError && new Error('An error has occured')}
        data={hasData ? { content } : undefined}
        noData={<>There is not data</>}
        children={children}
      />
    </UIContextProvider>
  );
};
