import { TextField } from "@mui/material"

import {
  specInputStaticProps,
  type SpecInputPropsType
} from "../../utils/textFieldProps";
import { textFieldBaseStyles } from "../ui/FormikTextField";
import { useEffect, useState } from "react";
import type { FieldDataType } from "../types";

type ControlsTextFieldType = Omit<FieldDataType, "isAdditionList"> & {
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement, Element>;
  specInputDynamicProps?: SpecInputPropsType;
}

export const ControlsTextField = ({
  id,
  label,
  value,
  onChange,
  isMultilines,
  specInputDynamicProps,  // зависит от других полей
}: ControlsTextFieldType) => {
  const specInputProps = { ...specInputStaticProps, ...specInputDynamicProps };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // или skeleton/placeholder
  }


  return (
    <TextField
      id={`${id}-textfield`}
      label={label}
      value={value}
      onChange={onChange}
      margin="dense"
      slotProps={{ htmlInput: { multiple: true }, inputLabel: { shrink: true } }}
      // дефолтные стили
      {...textFieldBaseStyles}
      // зависимость от id
      {...specInputProps[id]}
      // зависимость от isMultilines
      {...{
        minRows: isMultilines ? 3 : undefined,
        multiline: isMultilines,
        size: isMultilines ? "medium" : "small",
      }}
    />
  )
}