import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue,
  IRenderFormField,
} from '@reactionable/core/lib/form/FormField';
import React, { ElementType, ReactElement, ReactNode } from 'react';
import Feedback from 'react-bootstrap/Feedback';
import FormCheck, { FormCheckProps } from 'react-bootstrap/FormCheck';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormLabel from 'react-bootstrap/FormLabel';
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers';

type FieldFormElementProps<FieldElement extends ElementType> = ReplaceProps<
  FieldElement,
  BsPrefixProps<FieldElement> & FormControlProps
>;

export type IFieldElementProps = ICoreFieldElementProps & {
  label?: ReactNode | string;
};

export type IFormFieldProps<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = Omit<ICoreFormFieldProps<FieldElement, Value>, 'children'> & {
  children?: IRenderFormField<IFieldElementProps, Value> | ReactElement;
};

export type IFormFieldPropsEnhanced<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = ICoreFormFieldPropsEnhanced<FieldElement, Value>;

function isFormCheckProps(props: any): props is FieldFormElementProps<any> {
  return (props as FieldFormElementProps<any>).field.checked !== undefined;
}

export function FormField<
  FieldElement extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = string
>({ label, children, ...props }: IFormFieldProps<FieldElement, Value>) {
  const renderChildren = (fieldProps: IFormFieldPropsEnhanced<FieldElement, Value>) => {
    let fieldContent: ReactElement = <></>;

    if (fieldProps.error) {
      fieldContent = <Feedback type="invalid">{fieldProps.error}</Feedback>;
    }

    if ('function' === typeof children) {
      fieldContent = (
        <>
          {children(fieldProps)}
          {fieldContent}
        </>
      );
    } else {
      if (isFormCheckProps(fieldProps)) {
        const formCheckProps = {
          ...fieldProps.field,
          checked: !!fieldProps.field.value,
        } as FormCheckProps;

        fieldContent = (
          <>
            <FormCheck {...formCheckProps} children={children} />
            {fieldContent}
          </>
        );
      } else {
        fieldContent = (
          <>
            <FormControl {...(fieldProps.field as FormControlProps)} children={children} />
            {fieldContent}
          </>
        );
      }

      if (fieldProps.field.type === 'hidden') {
        return fieldContent;
      }
    }

    return (
      <FormGroup controlId={fieldProps.field.name}>
        {label && <FormLabel>{label}</FormLabel>}
        {fieldContent}
      </FormGroup>
    );
  };

  const formFieldProps = {
    ...props,
    children: renderChildren,
  };

  return <CoreFormField<any, Value> {...formFieldProps} />;
}
