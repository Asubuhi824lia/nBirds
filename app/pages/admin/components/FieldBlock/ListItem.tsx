import { Button, ButtonGroup, ListItemText, ListItem, TextField } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRef, useState } from "react";
import { textFieldBaseStyles } from "../../utils/textFieldProps";

type ListItemProps = {
  isMultilines?: boolean;
  printedText: string;
}
export const FieldListItem = ({ isMultilines, printedText }: ListItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const editFieldRef = useRef<HTMLTextAreaElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(printedText);


  const handleEvent = "blur";
  const showIsNotValid = () => {
    if (!editFieldRef.current?.checkValidity()) {
      editFieldRef.current?.reportValidity();
    }
  }

  // removeEventListener || addEventListener — не заменить в React?
  const toEditHandler = () => {
    editFieldRef.current?.addEventListener(handleEvent, showIsNotValid)
    setIsEditMode(true);
  }
  const saveEditedHandler = () => {
    editFieldRef.current?.removeEventListener(handleEvent, showIsNotValid)

    if (editFieldRef.current?.value) setText(editFieldRef.current?.value);
    else console.log("Ошибка получения текста поля ввода", editFieldRef.current);

    editFieldRef.current?.setCustomValidity("");
    setIsEditMode(false);
  }
  const deleteHandler = () => {
    editFieldRef.current?.removeEventListener(handleEvent, showIsNotValid)
    itemRef.current?.remove();
  }
  // TODO: иконки — отдельный компонент (единообразить стили), передавать только название
  return (
    <div ref={itemRef}>
      <ListItem alignItems="flex-start" dense disableGutters>
        {/* TODO: отдельный элемент с общим children */}
        {isEditMode ? (
          <TextField
            inputRef={editFieldRef}
            defaultValue={text}
            size="small"
            {...textFieldBaseStyles}
            {...{
              multiline: isMultilines,
              minRows: isMultilines ? 5 : 1,
            }}
          />
        ) : (
          <ListItemText>{text}</ListItemText>
        )}
        <ButtonGroup variant="outlined" color="secondary" size="small" orientation="horizontal" sx={{ ml: 1 }}>
          {isEditMode ? (
            // TODO: add Icon, Loadre on saveClk
            <Button name="action" value="save" onClick={saveEditedHandler} sx={{ minWidth: 'min-content !important', px: 0.75 }}>
              <SaveIcon fontSize="small" />
            </Button>
          ) : (
            <Button name="action" value="edit" onClick={toEditHandler} sx={{ minWidth: 'min-content !important', px: 0.75 }}>
              <EditIcon fontSize="small" />
            </Button>
          )}
          <Button name="action" value="delete" onClick={deleteHandler} sx={{ minWidth: 'min-content !important', px: 0.75 }}>
            <DeleteIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </ListItem>
    </div>
  );
}