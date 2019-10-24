import * as React from 'react';
import ReactDOM from 'react-dom';
import { ModalForm } from './ModalForm';
import { FormikActions, FormikProps } from 'formik';
import { string } from 'yup';
import { FormField } from '../form/Form';

interface IFormValues {
  test: string;
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ModalForm
    title="Test modal form"
    submitButton="Submit modal form"
    onHide={() => { }}
    form={{
      onSubmit: async (values: IFormValues, actions: FormikActions<IFormValues>) => 'ok',
      formSchema: {
        test: string()
          .required('Test is required'),
      },
      formValues: {
        test: '',
      },
      render: (formikBag: FormikProps<IFormValues>, isLoading: boolean) => <>
        <FormField
          name="test"
        />
      </>,
    }}
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
