import type { FieldBlockControlsType } from "../types";
import { FieldBlockControls } from "./FieldBlockControls";

export const FieldBlock = (props: FieldBlockControlsType) => {
  const { id, label, isAdditionList } = props;

  return (
    <>
      {/* TODO: +подкрепление источниками, почему именно это */}
      {/* TODO: +сортировка по типу дачи названия */}

      {/* TODO: как связать с основным названием? */}
      {label && (<label htmlFor={label}>{label}</label>)}
      <FieldBlockControls {...props} />
      {id === "blockImages" && (<input id="photoFiles" type="file" multiple />)}
      {isAdditionList && (<div className="addition-list"></div>)}
    </>
  );
}