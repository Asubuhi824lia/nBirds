import { useField } from 'formik';
import { TextField, type TextFieldProps, type TextFieldVariants } from '@mui/material';
import type { FormValues } from '../../FormBirdAdd';

export const textFieldBaseStyles = {
  fullWidth: true,
  color: "secondary" as TextFieldProps["color"],
  variant: "outlined" as TextFieldVariants
}

type FormValuesKey = keyof FormValues;

type FormValuesFieldTypes = {
  [K in keyof FormValues]: FormValues[K];
};

export function FormikTextField({ name, label, ...props }: TextFieldProps & { name: FormValuesKey }) {
  const [field, meta] = useField<FormValuesFieldTypes[typeof name]>(name || "");

  return (
    <TextField
      {...field}
      label={label}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...textFieldBaseStyles} // default styles
      {...props}
    />
  );
}