function addListItem(listId) {
  const field = document.getElementById(listId)

  let text = "";
  if (isTagNameInput(field)) {
    text = field.value;
    field.value = null;
  }
  else if (isTagNameTextarea(field)) {
    text = field.textContent
    field.textContent = null
  }

  if (!text) null;
  else {
    const list = document.querySelector(`.field-block:has(#${listId}) .addition-list`);
    const div = createFormCardNode(text, list.childElementCount);
    list.prepend(div);
  }
}

function generateJSON(fieldNames) {
  const nameMain = document.getElementById("nameMain")

  return ({
    ...generateListJSON(fieldNames),
    nameMain: nameMain.value
  })
}