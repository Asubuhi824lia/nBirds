import { useEffect, useState } from "react";
import { IconButton, TextField } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material";
import {
  specInputStaticProps,
  type SpecInputPropsType
} from "../../utils/textFieldProps";
import { textFieldBaseStyles } from "../ui/FormikTextField";
import type { FieldDataType } from "../types";

type ControlsTextFieldType = Omit<FieldDataType, "isAdditionList"> & {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
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
  const [isFocused, setIsFocused] = useState(false);


  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // или skeleton/placeholder
  }


  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    const text = e.target.value;

    if (text[0]?.match(/\s/g))
      return;
    else
      onChange(text);
  };

  const clearHandler = () => onChange('');


  return (
    <TextField
      id={`${id}-textfield`}
      label={label}
      value={value}
      onChange={changeHandler}
      onFocus={() => {
        // TODO:  change color of <IconButton> to secondary
        //        or — if text exist
        setIsFocused(true);
      }}
      onBlur={() => {
        // TODO: change color of <IconButton> to action
        setIsFocused(false);
      }}
      margin="dense"
      slotProps={{
        htmlInput: { multiple: true },
        inputLabel: { shrink: true },
        input: {
          endAdornment: (
            <IconButton name="action" value="edit" size="small" onClick={clearHandler}>
              <CloseIcon
                color={isFocused ? 'secondary' : (value ? 'action' : 'disabled')}
                fontSize="small"
              />
            </IconButton>
          )
        }
      }}
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