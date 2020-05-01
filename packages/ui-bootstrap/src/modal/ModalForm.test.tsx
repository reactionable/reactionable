import React from 'react';
import ReactDOM from 'react-dom';
import { FormikHelpers } from 'formik';
import { string } from 'yup';
import { FormField } from '../form/FormField';
import { ModalForm } from './ModalForm';
import { i18nTestInstance } from '@reactionable/core/lib/tests/i18n';
import { UIContextProvider } from '@reactionable/core';
import { useUIContextProviderProps } from '../UI';

interface IFormValues {
  test: string;
}

describe('ModalForm', () => {
  beforeAll(i18nTestInstance);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <UIContextProvider {...useUIContextProviderProps()}>
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
      </UIContextProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
