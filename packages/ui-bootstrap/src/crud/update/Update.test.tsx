import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { render } from '@testing-library/react';
import React from 'react';
import { string } from 'yup';

import { FormField } from '../../form/FormField';
import { TestWrapper } from '../../tests/TestWrapper';
import { Update } from './Update';

interface ITestValues {
  test: string;
}

interface ITestData {
  test: string;
}

describe('Update', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', () => {
    render(
      <TestWrapper>
        <Update<ITestValues, ITestData>
          form={{
            onSuccess: jest.fn(),
            title: 'Update a new test',
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
        <Update<ITestValues, ITestData>
          modal
          form={{
            onSuccess: jest.fn(),
            title: 'Update a new test',
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
