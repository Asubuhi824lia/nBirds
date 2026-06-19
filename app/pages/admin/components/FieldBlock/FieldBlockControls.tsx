import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material';
import type { FieldDataType } from "../types";
import {
  specInputStaticProps,
  type SpecInputPropsType
} from "../../utils/textFieldProps";
import { textFieldBaseStyles } from "../ui/FormikTextField";

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

  const specInputProps = { ...specInputStaticProps, ...specInputDynamicProps };

  // TODO: сделать чтобы при вводе пропсе уже на «=» автокомплит скобок
  // TODO: полю "Название (лат.)" паттерн что только 2 слова
  return (
    // TODO: ограничить ширину контейнеру
    <div className="addition-list-controls">
      <Grid container spacing={isAdditionList ? 0.5 : 0}>
        <Grid size="grow">
          <TextField
            id={`${id}-textfield`}
            label={label}
            value={text}
            onChange={e => setText(e.target.value)}
            margin="dense"
            slotProps={{ htmlInput: { multiple: true }, inputLabel: { shrink: true } }}
            // дефолтные стили
            {...textFieldBaseStyles}
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
              onClick={() => (addList?.(text), console.log(`${id}Btn`, text))}
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