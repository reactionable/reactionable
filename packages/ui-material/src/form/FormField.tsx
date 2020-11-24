import { InputLabel, TextField, TextFieldProps } from "@material-ui/core";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox/Checkbox";
import FormControl from "@material-ui/core/FormControl/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText/FormHelperText";
import Select, { SelectProps } from "@material-ui/core/Select/Select";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@material-ui/core/TextareaAutosize/TextareaAutosize";
import {
  FormField as CoreFormField,
  IFieldElementProps as ICoreFieldElementProps,
  IFormFieldProps as ICoreFormFieldProps,
  IFormFieldPropsEnhanced as ICoreFormFieldPropsEnhanced,
  IFormFieldValue,
  IRenderFormField,
} from "@reactionable/core/lib/form/FormField";
import React, { ReactElement, ReactNode } from "react";

export type IFieldElementProps = ICoreFieldElementProps & {
  label?: ReactNode | string;
};

export type IFormFieldProps<
  FieldElement extends IFieldElementProps,
  Value extends IFormFieldValue
> = Omit<ICoreFormFieldProps<FieldElement, Value>, "children"> & {
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
}: IFormFieldPropsEnhanced<FieldElementProps, Value>): ReactElement {
  let fieldContent: ReactElement;

  const inputLabelId = field.id ? `${field.id}-label` : undefined;
  const helperTextId = field.id ? `${field.id}-helper-text` : undefined;

  const fieldProps = field;

  const labelContent: ReactNode | undefined = label ?? undefined;

  switch (true) {
    case field.as === "checkbox":
    case field.type === "checkbox":
      fieldContent = (
        <FormControlLabel
          disabled={field.disabled}
          control={<Checkbox {...(fieldProps as CheckboxProps)} />}
          label={labelContent}
        />
      );
      break;

    case field.as === "select":
      fieldContent = <Select {...(fieldProps as SelectProps)} label={labelContent} />;
      break;

    case field.as === "textarea":
      fieldContent = <TextareaAutosize {...(fieldProps as TextareaAutosizeProps)} />;
      if (labelContent) {
        fieldContent = (
          <>
            <InputLabel htmlFor={field.id} id={inputLabelId}>
              {labelContent}
              {field.required && "\u00a0*"}
            </InputLabel>
            {fieldContent}
          </>
        );
      }
      break;

    default:
      fieldContent = <TextField {...(fieldProps as TextFieldProps)} label={labelContent} />;
  }

  fieldContent = (
    <FormControl
      error={isInvalid}
      disabled={field.disabled}
      required={field.required}
      margin="normal"
    >
      {fieldContent}
      {error && <FormHelperText id={helperTextId}>{error}</FormHelperText>}
    </FormControl>
  );

  if (field.type === "hidden") {
    return fieldContent;
  }

  return <FormGroup>{fieldContent}</FormGroup>;
}

export function FormField<
  FieldElementProps extends IFieldElementProps = IFieldElementProps,
  Value extends IFormFieldValue = IFormFieldValue
>(props: IFormFieldProps<FieldElementProps, Value>): ReactElement {
  return <CoreFormField<ICoreFieldElementProps, Value> {...props} render={RenderFormField} />;
}
