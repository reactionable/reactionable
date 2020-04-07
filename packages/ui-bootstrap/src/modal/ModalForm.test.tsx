import React from 'react';
import ReactDOM from 'react-dom';
import { FormikHelpers } from 'formik';
import { string } from 'yup';
import { FormField } from '../form/FormField';
import { ModalForm } from './ModalForm';

interface IFormValues {
  test: string;
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalForm
    title="Test modal form"
    submitButton="Submit modal form"
    closeModal={() => {}}
    onSubmit={ async (values: IFormValues, formikHelpers: FormikHelpers<IFormValues>) => 'ok'}
    formSchema={{
      test: string()
        .required('Test is required'),
    }}
    formValues={ {
      test: '',
    }}
    children={ () => <>
      <FormField
        name="test"
      />
    </>}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
