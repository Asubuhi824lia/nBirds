import { IconButton } from "@mui/material";
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
      <menu className="item-actions">
        <li>
          {isEditMode ? (
            // TODO: add Icon, Loadre on saveClk
            <IconButton name="action" value="save" onClick={saveEditedHandler}>
              <SaveIcon color="secondary" fontSize="small" />
            </IconButton>
          ) : (
            <IconButton name="action" value="edit" onClick={toEditHandler}>
              <EditIcon color="secondary" fontSize="small" />
            </IconButton>
          )}
        </li>
        <li>
          <IconButton name="action" value="delete" onClick={deleteHandler}>
            <DeleteIcon color="secondary" fontSize="small" />
          </IconButton>
        </li>
      </menu>
    </div>
  );
}