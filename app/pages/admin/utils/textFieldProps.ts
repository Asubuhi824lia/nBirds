import type { TextFieldProps, TextFieldVariants } from "@mui/material"

export const textFieldBaseStyles = {
  fullWidth: true,
  color: "secondary" as TextFieldProps["color"],
  variant: "outlined" as TextFieldVariants
}

// Только для FieldBlockControls
export interface SpecInputPropsType {
  [key: string]: Pick<React.InputHTMLAttributes<HTMLInputElement>,
    "type" |
    "multiple" |
    "lang" |
    "pattern" |
    "required" |
    "disabled"
  >
}
export const specInputStaticProps: SpecInputPropsType = {
  photoUrls: { type: "url" },
  photoFiles: { type: "file", multiple: true },
  nameLatin: { lang: "la", pattern: "[a-z A-Z]+", required: true }
}