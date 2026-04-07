import { useState } from "react";
import type { FieldBlockType } from "../types";
import { FieldBlockControls } from "./FieldBlockControls";
import { ListItem } from "./ListItem";

export const FieldBlock = (props: FieldBlockType) => {
  const [list, setList] = useState<string[]>([]);

  const { id, label, isAdditionList } = props;

  return (
    <>
      {/* TODO: +подкрепление источниками, почему именно это */}
      {/* TODO: +сортировка по типу дачи названия */}

      {/* TODO: как связать с основным названием? */}
      {label && (<label htmlFor={label}>{label}</label>)}
      <FieldBlockControls {...props} addList={(newItem) => setList([...list, newItem])} />
      {id === "blockImages" && (<input id="photoFiles" type="file" multiple />)}
      {isAdditionList && (<div className="addition-list">
        {list.map((text, index) => (
          // TODO: проверить как правильно задавать key компоненту
          <ListItem key={`${id}-${index}`} printedText={text} />
        ))}
      </div>)}
    </>
  );
}