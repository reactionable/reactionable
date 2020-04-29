import React from 'react';
import ReactDOM from 'react-dom';
import { string } from 'yup';
import { FormField } from '../../form/FormField';
import { Create } from '../../crud/create/Create';
import { UIContextProvider } from '@reactionable/core';
import { useUIContextProviderProps } from '../../UI';
import { i18nTestInstance } from '@reactionable/core/lib/tests/i18n';

interface ITestValues {
  test: string;
}

interface ITestData {
  test: string;
}

describe('Create', () => {
  beforeAll(i18nTestInstance);

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <UIContextProvider {...useUIContextProviderProps()}>
        <Create<ITestValues, ITestData>
          modal={{}}
          form={{
            onSuccess: () => {},
            title: 'Create a new test',
            onSubmit: async (values) => values,
            formValues: {
              test: '',
            },
            formSchema: {
              test: string().required('Test is required'),
            },
            children: () => <FormField name="test" />,
          }}
        />
      </UIContextProvider>,
      div
    );

    ReactDOM.unmountComponentAtNode(div);
  });
});
