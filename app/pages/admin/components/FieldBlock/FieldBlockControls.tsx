import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import type { FieldDataType } from "../types";
import {
  specInputStaticProps,
  type SpecInputPropsType
} from "../../utils/textFieldProps";
import { FormikTextField } from "../ui";

// TODO: добавить хэндлер как в интерфейс

type FieldBlockControlsType = FieldDataType & {
  defaultValue?: string;
  specInputDynamicProps?: SpecInputPropsType;
  addList: (e: string | React.ChangeEvent<any>) => void;
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

  // TODO: сделать чтобы при вводе пропсе уже на «=» автокомплит скобок
  // TODO: полю "Название (лат.)" паттерн что только 2 слова
  return (
    // TODO: ограничить ширину контейнеру
    <div className="addition-list-controls">
      <Grid container spacing={isAdditionList ? 0.5 : 0}>
        <Grid size="grow">
          <FormikTextField
            name={id}
            label={label}
            margin="dense"
            slotProps={{ htmlInput: { multiple: true }, inputLabel: { shrink: true } }}
            // зависимость от id
            {...specInputProps[id]}
            // зависимость от isMultilines
            {...{
              multiline: isMultilines,
              minRows: isMultilines ? 3 : undefined,
              size: isMultilines ? "medium" : "small",
            }}
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