import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { QueryWrapper } from '../src/query/QueryWrapper';
import { UIContextProvider } from '../src/ui/UI';

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
    <UIContextProvider>
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
