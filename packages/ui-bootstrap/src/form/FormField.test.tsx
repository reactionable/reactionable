import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { render } from '@testing-library/react';
import React from 'react';
import { string } from 'yup';

import { FormField } from '../form/FormField';
import { TestWrapper } from '../tests/TestWrapper';
import { Form } from './Form';

const formProps = {
  title: 'Simple form',
  initialValues: { test: '' },
  onSubmit: async (values: any) => {
    return values;
  },
  validationSchema: { test: string().required('Test is required') },
};

describe('FormField', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', () => {
    render(
      <TestWrapper>
        <Form
          {...formProps}
          children={() => (
            <FormField label="Test" name="test" autoFocus placeholder="Simple form input" />
          )}
        />
      </TestWrapper>
    );
  });
});
