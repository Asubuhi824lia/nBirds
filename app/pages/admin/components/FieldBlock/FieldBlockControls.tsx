import { useRef, useState } from "react";
import type { FieldDataType } from "../types";
import { useForm } from "react-hook-form";
import type { AddBirdForm } from "../../utils";
interface specInputPropsType {
  [key: string]: React.InputHTMLAttributes<HTMLInputElement>
}

// TODO: добавить хэндлер как в интерфейс

type FieldBlockControlsType = FieldDataType & {
  defaultValue?: string;
  addList: (newItem: string) => void;
}

export const FieldBlockControls = ({
  id,
  isMultilines,
  isAdditionList,
  defaultValue = "",
  addList
}: FieldBlockControlsType) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // defaultValue — string | string[]
  const [text, setText] = useState<string>(defaultValue);

  const { register } = useForm<AddBirdForm>();

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
        <textarea
          ref={textareaRef}
          id={id}
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
      ) : (
        <input
          ref={inputRef}
          id={id}
          onChange={(e) => handleChangeInput(e.target.value)}
          onPaste={(e) => handleChangeInput(e.clipboardData.getData('text'))}
          value={text}
          {...specInputProps[id]}
          // {...register(id)}
        />
      )}
      {isAdditionList && (<button id={`${id}Btn`} onClick={addItemHandler}>+</button>)}
    </div>
  );
}