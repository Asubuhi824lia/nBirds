import { useState } from "react";
import type { FieldDataType } from "../types";
import { Button, Grid, TextField } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import { specInputStaticProps, textFieldBaseStyles, type SpecInputPropsType } from "../../utils/textFieldProps";

// TODO: добавить хэндлер как в интерфейс

type FieldBlockControlsType = FieldDataType & {
  defaultValue?: string;
  specInputDynamicProps?: SpecInputPropsType;
  addList: (newItem: string) => void;
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

  // defaultValue — string | string[]
  const [text, setText] = useState<string>(defaultValue);

  const specInputProps = { ...specInputStaticProps, ...specInputDynamicProps };

  const addItemHandler = () => {
    if (text?.trim()) addList(text);
    setText("");
  }

  const handleChangeInput = (value: string) => {
    setText(value);
    if (text && !isAdditionList) addList(text);
  }

  // TODO: сделать чтобы при вводе пропсе уже на «=» автокомплит скобок
  // TODO: полю "Название (лат.)" паттерн что только 2 слова
  return (
    // TODO: ограничить ширину контейнеру
    <div className="addition-list-controls">
      <Grid container spacing={isAdditionList ? 0.5 : 0}>
        <Grid size="grow">
          <TextField
            id={id}
            label={label}
            value={text}
            onPaste={(e) => handleChangeInput(e.clipboardData.getData('text'))} // TODO: to check
            margin="normal"
            slotProps={{ inputLabel: { shrink: true } }}
            // общее.
            {...textFieldBaseStyles}
            // зависимость от id
            {...specInputProps[id]}
            // зависимость от isMultilines
            {...{
              multiline: isMultilines,
              minRows: isMultilines ? 3 : undefined,
              onChange: (e) =>
                isMultilines
                  ? setText(e.target.value)
                  : handleChangeInput(e.target.value),
              size: isMultilines ? "medium" : "small",
            }}
          />
        </Grid>
        {isAdditionList && (
          <Grid size="auto" direction="row" sx={{ display: "flex", alignItems: "center", pt: 2, pb: 1 }} >
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