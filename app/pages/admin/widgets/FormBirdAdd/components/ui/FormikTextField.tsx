import { useField } from 'formik';
import { TextField, type TextFieldProps, type TextFieldVariants } from '@mui/material';
import type { AddBirdForm } from '../../utils/types';

export const textFieldBaseStyles = {
  fullWidth: true,
  color: "secondary" as TextFieldProps["color"],
  variant: "outlined" as TextFieldVariants
}

type FormValuesKey = keyof AddBirdForm;

type FormValuesFieldTypes = {
  [K in keyof AddBirdForm]: AddBirdForm[K];
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