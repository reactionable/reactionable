import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox/Checkbox';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText/FormHelperText';
import Select, { SelectProps } from '@material-ui/core/Select/Select';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from '@material-ui/core/TextareaAutosize/TextareaAutosize';
import TextField, { TextFieldProps } from '@material-ui/core/TextField/TextField';
import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue,
  IRenderFormField,
} from '@reactionable/core/lib/form/FormField';
import React, { ReactNode } from 'react';

export type IFieldElementProps = ICoreFieldElementProps & {
  label?: ReactNode | string;
};

export type IFormFieldProps<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = Omit<ICoreFormFieldProps<FieldElement, Value>, 'children'> & {
  children?: IRenderFormField<IFieldElementProps, Value> | ReactNode;
};

export type IFormFieldPropsEnhanced<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreFormFieldPropsEnhanced<FieldElement, Value>;

export function RenderFormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>({
  error,
  isInvalid,
  field: { label, ...field },
}: IFormFieldPropsEnhanced<FieldElementProps, Value>) {
  let fieldContent: ReactNode;

  const fieldProps = {
    ...field,
    error: isInvalid,
  };

  switch (true) {
    case field.type === 'checkbox':
      fieldContent = (
        <FormControlLabel control={<Checkbox {...(fieldProps as CheckboxProps)} />} label={label} />
      );
      break;
    case field.as === 'select':
      fieldContent = <Select {...(fieldProps as SelectProps)} />;
      break;

    case field.as === 'textarea':
      fieldContent = <TextareaAutosize {...(fieldProps as TextareaAutosizeProps)} />;
      break;

    default:
      fieldContent = <TextField {...(fieldProps as TextFieldProps)} label={label} />;
  }

  if (field.type === 'hidden') {
    return fieldContent;
  }

  if (error) {
    fieldContent = (
      <>
        {fieldContent}
        <FormHelperText>{error}</FormHelperText>
      </>
    );
  }

  return (
    <FormGroup>
      <FormControl error={isInvalid} disabled={field.disabled}>
        {fieldContent}
      </FormControl>
    </FormGroup>
  );
}

export function FormField<
  FieldElement extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = string
>(props: IFormFieldProps<FieldElement, Value>) {
  return <CoreFormField<any, Value> {...props} render={RenderFormField} />;
}