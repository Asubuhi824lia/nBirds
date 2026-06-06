import { useRef, useState } from "react";
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
  // const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="addition-list-controls">
      {isMultilines ? (
        <TextField
          id={id}
          // ref={inputRef}
          onChange={(e) => handleChangeInput(e.target.value)}
          onPaste={(e) => handleChangeInput(e.clipboardData.getData('text'))}
          value={text}
          multiline
          minRows={3}
          size="medium"
          label={label}
          variant="outlined"
          color="secondary"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        // <textarea
        //   ref={textareaRef}
        //   id={id}
        //   onChange={(e) => setText(e.target.value)}
        //   value={text}
        // ></textarea>
      ) : (
        // TODO: сделать чтобы при вводе пропсе уже на «=» автокомплит скобок
        // <input
        //   ref={inputRef}
        //   id={id}
        //   onChange={(e) => handleChangeInput(e.target.value)}
        //   onPaste={(e) => handleChangeInput(e.clipboardData.getData('text'))}
        //   value={text}
        //   {...specInputProps[id]}
        <TextField
          id="standard-basic"
          label={label}
          variant="standard"
          slotProps={{ inputLabel: { shrink: true } }}
          {...specInputProps[id]}
        />
        // {...register(id)}
        // />
      )}
      {isAdditionList && (
        <IconButton id={`${id}Btn`} name="action" value="delete" onClick={addItemHandler}>
          <AddIcon color="secondary" fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}