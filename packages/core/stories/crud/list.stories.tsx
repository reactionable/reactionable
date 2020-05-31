import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { List } from '../../src/crud/list/List';
import { UIContextProvider } from '../../src/ui/UI';

export default {
  title: 'Core/Crud/List',
  parameters: { info: { inline: true }, component: List },
  decorators: [withKnobs],
};

export const list = () => {
  const isLoading = boolean('Is loading?', false);
  const hasError = boolean('Has error?', false);

  return (
    <UIContextProvider>
      <List
        isLoading={isLoading}
        error={hasError && new Error('An error has occured')}
        data={[
          { id: '1', label: 'Data 1' },
          { id: '2', label: 'Data 2' },
        ]}
        children={(data) => (
          <table>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.label}</td>
              </tr>
            ))}
          </table>
        )}
      />
    </UIContextProvider>
  );
};
