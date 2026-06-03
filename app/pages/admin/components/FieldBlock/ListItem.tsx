import { Button, ButtonGroup } from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRef, useState } from "react";

type ListItemProps = {
  printedText: string;
}
export const ListItem = ({ printedText }: ListItemProps) => {
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
    <div ref={itemRef} className="addition-list-item">
      {/* TODO: отдельный элемент с общим children */}
      {isEditMode ? (
        <textarea ref={editFieldRef} rows={5}>{text}</textarea>
      ) : (
        <span className="item-info">{text}</span>
      )}
      <ButtonGroup variant="outlined" color="secondary"size="small" orientation="horizontal">
        {isEditMode ? (
          // TODO: add Icon, Loadre on saveClk
          <Button name="action" value="save" onClick={saveEditedHandler}>
            <SaveIcon fontSize="small" />
          </Button>
        ) : (
          <Button name="action" value="edit" onClick={toEditHandler}>
            <EditIcon fontSize="small" />
          </Button>
        )}
        <Button name="action" value="delete" onClick={deleteHandler}>
          <DeleteIcon fontSize="small" />
        </Button>
      </ButtonGroup>
    </div>
  );
}