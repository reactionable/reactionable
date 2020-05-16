import React from 'react';
import ReactDOM from 'react-dom';
import { FormikHelpers } from 'formik';
import { string } from 'yup';
import { i18nTestInstance } from '@reactionable/core/lib/tests/I18n';
import { FormField } from '../form/FormField';
import { ModalForm } from './ModalForm';
import { UIContextProvider } from '../UI';

interface IFormValues {
  test: string;
}

describe('ModalForm', () => {
  beforeAll(i18nTestInstance);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <UIContextProvider>
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
