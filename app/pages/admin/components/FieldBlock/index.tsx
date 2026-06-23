import { List } from "@mui/material";
import type { FieldBlocksKeys, FieldDataType } from "../types";
import { FieldBlockControls } from "./FieldBlockControls";
import { FieldListItem } from "./FieldListItem";
import type { FieldsDataIds } from "../../utils";
import { FormikTextField } from "../ui";
import { FieldArray, useField } from "formik";
import type { FormValues } from "../../FormBirdAdd";

// TODO: FieldsDataIdsKeys и FieldBlocksKeys одинаковы, пересмотреть
interface FieldBlockProps<
  T extends FieldsDataIds[FieldBlocksKeys],
  K extends boolean
> {
  blockId: FieldBlocksKeys;
  // TODO: проверить с чем сочитается block с таким
  block: Omit<FieldDataType, "id" | "isAdditionList"> & { id: T, isAdditionList: K };
}

export const FieldBlock = <T extends FieldsDataIds[FieldBlocksKeys], K extends boolean>({
  blockId,
  // почему запись «{ block: {...} }» не то же что запись { {...} } ?
  block
}: FieldBlockProps<T, K>) => {
  const { id, isAdditionList, isMultilines } = block;

  // TODO: каждый файл называть именем компонента, доб. отдельный index.tsx

  const [field] = useField<FormValues[typeof id]>(id);


  if (!isAdditionList) {
    return (
      // TODO: сравненить практики spread или явное указание полей
      <FieldBlockControls {...block} />
    )
  }
  return (
    <>
      {/* TODO: +подкрепление источниками, почему именно это */}
      {/* TODO: +сортировка по типу дачи названия */}
      {/* TODO: плейсхолдер для фото */}
      {/* TODO: как связать с основным названием? */}
      {/* /**
         * TODO: прописать ПОСЛЕ подключения формы
         * nameAlternatives: { 
         *   disabled: !nameMain.value,
         *   helperText: !nameMain.value && "Сперва укажите основное название"
         * }
         * nameEtymologies: { 
         *   disabled: !nameMain.value || !nameLatin.value || !nameAlternatives.length,
         *   helperText: "Разбор значений названий!" 
         * }
         */}
      {/* specInputDynamicProps={{}} */}
      <FieldArray name={id}>
        {({ remove, replace, unshift }) => (
          <div>
            <div>
              {blockId === "blockImages" && (
                <FormikTextField
                  name="photoFiles"
                  type="file"
                  size="small"
                  margin="dense"
                  slotProps={{ htmlInput: { multiple: true } }}
                />
              )}
              <FieldBlockControls
                {...block}
                addList={unshift}
              />
            </div>
            {/* TODO: возможен рассинхрон м/у isAdditionList и типом field.value => прописать текст ошибки */}
            {Array.isArray(field.value) && !!field.value.length && (
              <List dense sx={{ pl: 1.5 }}>
                {field.value.map((text, index) => (
                  // TODO: проверить как правильно задавать key компоненту
                  <FieldListItem
                    id={`${id}.${index}`}
                    key={`${id}.${index}`}
                    printedText={text}
                    isMultilines={isMultilines}
                    onDelete={() => remove(index)}
                    onEdit={(value) => replace(index, value)}
                  />
                ))}
              </List>
            )}
          </div>
        )}
      </FieldArray>
    </>
  );
}