import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import { ControlsTextField } from "./ControlsTextField";
import { type FieldDataType } from "../types";
import { type SpecInputPropsType } from "../../utils/data/textFieldProps";

// TODO: добавить хэндлер как в интерфейс
type FieldBlockControlsType = FieldDataType & {
  defaultValue?: string;
  addList?: (obj: string) => void;
  specInputDynamicProps?: SpecInputPropsType;
}

export const FieldBlockControls = ({
  id,
  label,
  isMultilines,
  isAdditionList,
  defaultValue = "",
  specInputDynamicProps,  // зависит от других полей
  addList
}: FieldBlockControlsType) => {

  const [text, setText] = useState<string>(defaultValue);

  const addItemHandler = () => {
    // Перед отправкой
    if (!text.trim()) return;

    // Стандартная обработка
    addList?.(text);
    setText('');
  }

  // TODO: сделать чтобы при вводе пропсе уже на «=» автокомплит скобок
  // TODO: полю "Название (лат.)" паттерн что только 2 слова
  return (
    // TODO: ограничить ширину контейнеру
    <div className="addition-list-controls">
      <Grid container spacing={isAdditionList ? 0.5 : 0}>
        <Grid size="grow">
          <ControlsTextField
            id={id}
            label={label}
            value={text}
            isAdditionList={isAdditionList}
            isMultilines={isMultilines}
            specInputDynamicProps={specInputDynamicProps}
            onChange={setText}
            addItemHandler={addItemHandler}
          />
        </Grid>
        {isAdditionList && (
          <Grid size="auto" direction="row" sx={{ display: "flex", alignItems: "center", pt: 1, pb: 0.5 }} >
            <Button
              id={`${id}Btn`}
              name="action"
              value="delete"
              size="small"
              variant="outlined"
              color="secondary"
              onClick={addItemHandler}
              sx={{ height: "100%", minWidth: "fit-content" }}
            >
              <AddIcon color="secondary" fontSize="medium" />
            </Button>
          </Grid>
        )}
      </Grid>
    </div>
  );
}