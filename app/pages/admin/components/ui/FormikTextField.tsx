import { useField } from 'formik';
import { TextField, type TextFieldProps, type TextFieldVariants } from '@mui/material';

export const textFieldBaseStyles = {
  fullWidth: true,
  color: "secondary" as TextFieldProps["color"],
  variant: "outlined" as TextFieldVariants
}

export function FormikTextField({ name, label, ...props }: TextFieldProps) {
  const [field, meta] = useField(name || "");

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