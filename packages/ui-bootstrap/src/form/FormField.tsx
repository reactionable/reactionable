import React, { ReactElement, ElementType, ReactNode } from 'react';
import FormLabel from 'react-bootstrap/FormLabel';
import Feedback from 'react-bootstrap/Feedback';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import FormCheck, { FormCheckProps } from 'react-bootstrap/FormCheck';
import FormGroup from 'react-bootstrap/FormGroup';
import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';
import {
  FormField as CoreFormField,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue,
  IRenderFormField,
  IFieldElementProps as ICoreFieldElementProps,
} from '@reactionable/core';

// type IFieldElement = 'input' | 'select' | 'textarea' | 'checkbox' | 'radio';

type FieldFormElementProps<FieldElement extends ElementType> = ReplaceProps<
  FieldElement,
  BsPrefixProps<FieldElement> & FormControlProps
>;

// type FieldElementProps<FieldElement extends IFieldElement> = FieldElement extends ElementType
//   ? FieldFormElementProps<FieldElement>
//   : FieldCheckElementProps;

// type FieldCheckElementProps = ReplaceProps<'input', BsPrefixProps<'input'> & FormCheckProps>;

// export type IFormFieldProps<
//   FieldElement extends IFieldElement,
//   Value extends IFormFieldValue
// > = Omit<ICoreFormFieldProps<FieldElementProps<FieldElement>, Value>, 'children'> & {
//   label?: ReactNode | string;
//   children?: IRenderFormField<FieldElementProps<FieldElement>, Value> | ReactElement;
// };

// export type IFormFieldPropsEnhanced<
//   FieldElement extends IFieldElement = 'input',
//   Value extends IFormFieldValue = string
// > = ICoreFormFieldPropsEnhanced<FieldElementProps<FieldElement>, Value>;

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
