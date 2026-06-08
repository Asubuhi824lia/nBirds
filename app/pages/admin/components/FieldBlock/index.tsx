import { useState } from "react";
import type { FieldBlocksKeys, FieldDataType } from "../types";
import { FieldBlockControls } from "./FieldBlockControls";
import { FieldListItem } from "./ListItem";
import type { FieldsDataIds } from "../../utils";
import { List, TextField } from "@mui/material";
import { textFieldBaseStyles } from "../../utils/textFieldProps";

type HandleAddDataProps<T> =
  | { key: T; data?: null | string[] }
  | { key: T; data?: null | string };

// TODO: FieldsDataIdsKeys и FieldBlocksKeys одинаковы, пересмотреть
interface FieldBlockProps<
  T extends FieldsDataIds[FieldBlocksKeys],
  K extends boolean
> {
  blockId: FieldBlocksKeys;
  // TODO: проверить с чем сочитается block с таким
  block: Omit<FieldDataType, "id" | "isAdditionList"> & { id: T, isAdditionList: K };
  defaultValue?: null | (K extends true ? string[] : string);
  handleAddData: ({ key, data }: HandleAddDataProps<T>) => void;
}

export const FieldBlock = <T extends FieldsDataIds[FieldBlocksKeys], K extends boolean>({
  blockId,
  block,
  defaultValue,
  handleAddData
}: FieldBlockProps<T, K>) => {
  const [list, setList] = useState<string[]>(Array.isArray(defaultValue) ? [...defaultValue] : []);

  const { id, isAdditionList, isMultilines } = block;

  const addListHandler = (newItem: string) => {
    if (isAdditionList) {
      const newList = [newItem, ...list];
      setList(newList);
      handleAddData({ key: id, data: newList });
    } else {
      handleAddData({ key: id, data: newItem });
    }
  }

  // TODO: каждый файл называть именем компонента, доб. отдельный index.tsx
  return (
    <>
      {/* TODO: +подкрепление источниками, почему именно это */}
      {/* TODO: +сортировка по типу дачи названия */}
      {/* TODO: плейсхолдер для фото */}
      {/* TODO: как связать с основным названием? */}
      <FieldBlockControls
        {...block}
        addList={addListHandler}
      /**
       * TODO: прописать ПОСЛЕ подключения формы
       * nameAlternatives: { 
       *   disabled: !nameMain.value,
       *   helperText: !nameMain.value && "Сперва укажите основное название"
       * }
       * nameEtymologies: { 
       *   disabled: !nameMain.value || !nameLatin.value || !nameAlternatives.length,
       *   helperText: "Разбор значений названий!" 
       * }
       */
      // specInputDynamicProps={{}}
      />
      {blockId === "blockImages" && (
        <TextField
          id="photoFiles"
          type="file"
          size="small"
          slotProps={{ htmlInput: { multiple: true } }}
          {...textFieldBaseStyles}
        />
      )}
      {isAdditionList && (
        <List>
          {list.map((text, index) => (
            // TODO: проверить как правильно задавать key компоненту
            <FieldListItem key={`${id}-${index}`} printedText={text} isMultilines={isMultilines} />
          ))}
        </List>
      )}
    </>
  );
}