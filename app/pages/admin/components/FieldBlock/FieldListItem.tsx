import { Button, ButtonGroup, ListItemText, ListItem, type ListItemProps, TextField } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRef, useState } from "react";

const btnBaseStyles = {
  px: 0.75,
  minWidth: 'min-content !important'
}

interface FieldListItemProps extends ListItemProps {
  isMultilines?: boolean;
  printedText: string;
  onDelete: () => void;
  onEdit: (value: string) => void;
};

export const FieldListItem = ({
  id,
  isMultilines,
  printedText,
  onDelete,
  onEdit
}: FieldListItemProps) => {
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

    if (editFieldRef.current?.value) {
      setText(editFieldRef.current?.value);
      onEdit(editFieldRef.current?.value);
    }
    else console.log("Ошибка получения текста поля ввода", editFieldRef.current);

    editFieldRef.current?.setCustomValidity("");
    setIsEditMode(false);
  }
  // TODO: иконки — отдельный компонент (единообразить стили), передавать только название
  return (
    <div key={id}>
      <ListItem alignItems="flex-start" dense disableGutters>
        {/* TODO: отдельный элемент с общим children */}
        {isEditMode ? (
          // TODO:  вот вроде форма значение отсюда не берет, 
          //        но ошибку если такое поле открыто выдаёт
          <TextField
            inputRef={editFieldRef}
            defaultValue={text}
            size="small"
            {...{
              multiline: isMultilines,
              minRows: isMultilines ? 5 : 1,
            }}
          />
        ) : (
          <ListItemText sx={{ wordBreak: 'break-word' }}>{text}</ListItemText>
        )}
        <ButtonGroup variant="outlined" color="secondary" size="small" orientation="horizontal" sx={{ ml: 1 }}>
          {isEditMode ? (
            // TODO: add Icon, Loadre on saveClk
            <Button name="action" value="save" onClick={saveEditedHandler} sx={btnBaseStyles}>
              <SaveIcon fontSize="small" />
            </Button>
          ) : (
            <Button name="action" value="edit" onClick={toEditHandler} sx={btnBaseStyles}>
              <EditIcon fontSize="small" />
            </Button>
          )}
          <Button name="action" value="delete" onClick={onDelete} sx={btnBaseStyles}>
            <DeleteIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </ListItem>
    </div>
  );
}