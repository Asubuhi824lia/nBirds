import type { FieldBlockControlsType } from "../types";


export const FieldBlockControls = ({
  id,
  isMultilines,
  isAdditionList,
  defaultValue
}: FieldBlockControlsType) => {

  interface specInputPropsType {
    [key: string]: React.InputHTMLAttributes<HTMLInputElement>
  }
  const specInputProps: specInputPropsType = {
    photoUrls: { type: "url" },
    photoFiles: { type: "file", multiple: true },
    nameLatin: { lang: "la", pattern: "[a-z A-Z]+", required: true }
  }

  return (
    <div className="addition-list-controls">
      {isMultilines ? (
        <textarea id={id}>{defaultValue}</textarea>
      ) : (
        <input id={id} value={defaultValue} {...specInputProps[id]} />
      )}
      {isAdditionList && (<button id={`${id}Btn`}>+</button>)}
    </div>
  );
}