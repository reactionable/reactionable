import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { render } from '@testing-library/react';
import { FormikHelpers } from 'formik';
import React from 'react';
import { string } from 'yup';

import { FormField } from '../form/FormField';
import { TestWrapper } from '../tests/TestWrapper';
import { ModalForm } from './ModalForm';

interface IFormValues {
  test: string;
}

describe('ModalForm', () => {
  beforeAll(i18nTestInstance);

  it('should render without crashing', () => {
    render(
      <TestWrapper>
        <ModalForm
          title="Test modal form"
          submitButton="Submit modal form"
          closeModal={() => {}}
          onSubmit={async (values: IFormValues, formikHelpers: FormikHelpers<IFormValues>) => 'ok'}
          formSchema={{
            test: string().required('Test is required'),
          }}
          formValues={{
            test: '',
          }}
          children={() => (
            <>
              <FormField name="test" />
            </>
          )}
        />
      </TestWrapper>
    );
  });
});
