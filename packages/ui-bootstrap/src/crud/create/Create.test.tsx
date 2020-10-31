import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { render } from '@testing-library/react';
import React from 'react';
import { string } from 'yup';

import { Create } from '../../crud/create/Create';
import { FormField } from '../../form/FormField';
import { TestWrapper } from '../../tests/TestWrapper';

interface ITestValues {
  test: string;
}

interface ITestData {
  test: string;
}

describe('Create', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', () => {
    render(
      <TestWrapper>
        <Create<ITestValues, ITestData>
          form={{
            onSuccess: () => {},
            title: 'Create a new test',
            onSubmit: async (values) => values,
            initialValues: {
              test: '',
            },
            validationSchema: {
              test: string().required('Test is required'),
            },
            children: () => <FormField name="test" />,
          }}
        />
      </TestWrapper>
    );
  });

  it('should renders inside a modal without crashing', () => {
    render(
      <TestWrapper>
        <Create<ITestValues, ITestData>
          modal
          form={{
            onSuccess: () => {},
            title: 'Create a new test',
            onSubmit: async (values) => values,
            initialValues: {
              test: '',
            },
            validationSchema: {
              test: string().required('Test is required'),
            },
            children: () => <FormField name="test" />,
          }}
        />
      </TestWrapper>
    );
  });
});
