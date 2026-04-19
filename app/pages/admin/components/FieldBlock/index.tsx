import { useState } from "react";
import type { FieldBlocksKeys, FieldDataType } from "../types";
import { FieldBlockControls } from "./FieldBlockControls";
import { ListItem } from "./ListItem";
import type { FieldsDataIds } from "../../utils";

type SingleValueFieldKey = "photoUrls" | "nameMain" | "nameLatin";
// TODO: FieldsDataIdsKeys и FieldBlocksKeys одинаковы, пересмотреть
interface FieldBlockProps {
  blockId: FieldBlocksKeys;
  block: Omit<FieldDataType, "id"> & { id: FieldsDataIds[FieldBlocksKeys] };
  handleAddData: <T extends FieldsDataIds[FieldBlocksKeys]>({ key, data }: {
    key: T,
    data?: null | (T extends SingleValueFieldKey ? string : string[])
  }) => void;
}

export const FieldBlock = ({ blockId, block, handleAddData }: FieldBlockProps) => {
  const [list, setList] = useState<string[]>([]);

  const { id, label, isAdditionList } = block;

  const addListHandler = (newItem: string) => {
    const newList = [...list, newItem];
    setList(newList);
    handleAddData({ key: id, data: newList });
  }

  return (
    <>
      {/* TODO: +подкрепление источниками, почему именно это */}
      {/* TODO: +сортировка по типу дачи названия */}

      {/* TODO: как связать с основным названием? */}
      {label && (<label htmlFor={label}>{label}</label>)}
      <FieldBlockControls {...block} addList={addListHandler} />
      {blockId === "blockImages" && (<input id="photoFiles" type="file" multiple />)}
      {isAdditionList && (<div className="addition-list">
        {list.map((text, index) => (
          // TODO: проверить как правильно задавать key компоненту
          <ListItem key={`${id}-${index}`} printedText={text} />
        ))}
      </div>)}
    </>
  );
}