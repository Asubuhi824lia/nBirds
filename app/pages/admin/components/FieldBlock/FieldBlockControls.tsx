import { useRef } from "react";
import type { FieldBlockType } from "../types";

// TODO: добавить хэндлер как в интерфейс

type FieldBlockControlsType = FieldBlockType & {
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
    // TODO: добавление элементов через пополнение общего массива списка
    // TODO: (textareaRef.current || inputRef.current)?.value
    const newText =
      isMultilines
        ? textareaRef.current?.value || textareaRef.current?.innerText
        : inputRef.current?.value;
    if (!newText || !newText.trim()) return;

    console.log(isMultilines, inputRef.current?.value, !inputRef.current)

    if (isMultilines) {
      if (!textareaRef.current) return;
      textareaRef.current.textContent = null;
      textareaRef.current.value = "";
    } else {
      if (!inputRef.current) return;
      inputRef.current.value = "";
    }

    if (newText) addList(newText);
  }

  return (
    <div className="addition-list-controls">
      {isMultilines ? (
        <textarea ref={textareaRef} id={id}>{defaultValue}</textarea>
      ) : (
        <input ref={inputRef} id={id} value={defaultValue} {...specInputProps[id]} />
      )}
      {isAdditionList && (<button id={`${id}Btn`} onClick={addItemHandler}>+</button>)}
    </div>
  );
}