import { useRef, useState } from "react";
import type { FieldDataType } from "../types";

// TODO: добавить хэндлер как в интерфейс

type FieldBlockControlsType = FieldDataType & {
  addList: (newItem: string) => void;
}

export const FieldBlockControls = ({
  id,
  isMultilines,
  isAdditionList,
  defaultValue,
  addList
}: FieldBlockControlsType) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [text, setText] = useState<string>(defaultValue || "");

  interface specInputPropsType {
    [key: string]: React.InputHTMLAttributes<HTMLInputElement>
  }
  const specInputProps: specInputPropsType = {
    photoUrls: { type: "url" },
    photoFiles: { type: "file", multiple: true },
    nameLatin: { lang: "la", pattern: "[a-z A-Z]+", required: true }
  }

  const addItemHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (text?.trim()) addList(text);
    setText("");
  }

  return (
    <div className="addition-list-controls">
      {isMultilines ? (
        <textarea ref={textareaRef} id={id} onChange={(e) => setText(e.target.value)}>{text}</textarea>
      ) : (
        <input ref={inputRef} id={id} value={text} onChange={(e) => setText(e.target.value)} {...specInputProps[id]} />
      )}
      {isAdditionList && (<button id={`${id}Btn`} onClick={addItemHandler}>+</button>)}
    </div>
  );
}