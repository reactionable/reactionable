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
import { IFormFieldValue } from "@reactionable/core/lib/form/FormField";
import { getFormFieldLabelContent } from "@reactionable/core/lib/form/RenderFormField";
import { ReactElement } from "react";
import { IFieldElementProps, IFormFieldPropsEnhanced } from "./FormField";

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

  const labelContent = getFormFieldLabelContent(label, field.required);

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
      // eslint-disable-next-line no-case-declarations
      fieldContent = <Select {...(fieldProps as SelectProps)} label={labelContent} />;
      if (labelContent) {
        fieldContent = (
          <>
            <InputLabel htmlFor={field.id} id={inputLabelId}>
              {labelContent}
            </InputLabel>
            {fieldContent}
          </>
        );
      }
      break;

    case field.as === "textarea":
      fieldContent = <TextareaAutosize {...(fieldProps as TextareaAutosizeProps)} />;
      if (labelContent) {
        fieldContent = (
          <>
            <InputLabel htmlFor={field.id} id={inputLabelId}>
              {labelContent}
            </InputLabel>
            {fieldContent}
          </>
        );
      }
      break;

    default:
      fieldContent = <TextField {...(fieldProps as TextFieldProps)} label={label} />;
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
