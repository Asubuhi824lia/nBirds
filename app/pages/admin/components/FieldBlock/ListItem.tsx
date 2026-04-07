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
  const toEditHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    editFieldRef.current?.addEventListener(handleEvent, showIsNotValid)
    setIsEditMode(true);
  }
  const saveEditedHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    editFieldRef.current?.removeEventListener(handleEvent, showIsNotValid)

    if (editFieldRef.current?.value) setText(editFieldRef.current?.value);
    else console.log("Ошибка получения текста поля ввода", editFieldRef.current);

    editFieldRef.current?.setCustomValidity("");
    setIsEditMode(false);
  }
  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    editFieldRef.current?.removeEventListener(handleEvent, showIsNotValid)
    itemRef.current?.remove();
  }

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
            <button name="action" value="save" onClick={saveEditedHandler}>save</button>
          ) : (
            <button name="action" value="edit" onClick={toEditHandler}>edit</button>
          )}
        </li>
        <li>
          <button name="action" value="delete" onClick={deleteHandler}>delete</button>
        </li>
      </menu>
    </div>
  );
}