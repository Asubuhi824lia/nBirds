import React, { useState } from "react";
import type { FieldDataType } from "../types";
import { IconButton, TextField } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
interface specInputPropsType {
  [key: string]: Pick<React.InputHTMLAttributes<HTMLInputElement>,
    "type" |
    "multiple" |
    "lang" |
    "pattern" |
    "required"
  >
}

// TODO: добавить хэндлер как в интерфейс

type FieldBlockControlsType = FieldDataType & {
  defaultValue?: string;
  addList: (newItem: string) => void;
}

export const FieldBlockControls = ({
  id,
  label,
  isMultilines,
  isAdditionList,
  defaultValue = "",
  addList
}: FieldBlockControlsType) => {

  // defaultValue — string | string[]
  const [text, setText] = useState<string>(defaultValue);

  const specInputProps: specInputPropsType = {
    photoUrls: { type: "url" },
    photoFiles: { type: "file", multiple: true },
    nameLatin: { lang: "la", pattern: "[a-z A-Z]+", required: true }
  }

  const addItemHandler = () => {
    if (text?.trim()) addList(text);
    setText("");
  }

  const handleChangeInput = (value: string) => {
    setText(value);
    if (text && !isAdditionList) addList(text);
  }

  // TODO: сделать чтобы при вводе пропсе уже на «=» автокомплит скобок
  // TODO: полю "Название (лат.)" паттерн что только 2 слова
  return (
    <div className="addition-list-controls">
      <TextField
        id={id}
        label={label}
        value={text}
        onPaste={(e) => handleChangeInput(e.clipboardData.getData('text'))} // TODO: to check
        color="secondary"
        variant="outlined"
        slotProps={{ inputLabel: { shrink: true } }}
        {...specInputProps[id]}
        {...{
          multiline: isMultilines,
          minRows: isMultilines ? 3 : undefined,
          onChange: (e) =>
            isMultilines
              ? setText(e.target.value)
              : handleChangeInput(e.target.value),
          size: isMultilines ? "medium" : "small",
        }}
      />
      {isAdditionList && (
        <IconButton id={`${id}Btn`} name="action" value="delete" onClick={addItemHandler}>
          <AddIcon color="secondary" fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}