import React from 'react';
import ReactDOM from 'react-dom';
import { string } from 'yup';
import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { FormField } from '../../form/FormField';
import { Create } from '../../crud/create/Create';
import { UIContextProvider } from '../../UI';

interface ITestValues {
  test: string;
}

interface ITestData {
  test: string;
}

describe('Create', () => {
  beforeAll(i18nTestInstance);

  it('renders without a modal', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <UIContextProvider>
        <Create<ITestValues, ITestData>
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

  it('renders with a modal', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <UIContextProvider>
        <Create<ITestValues, ITestData>
          modal
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
