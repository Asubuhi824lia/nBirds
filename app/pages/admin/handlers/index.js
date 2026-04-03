function addListItem(listId) {
  const field = document.getElementById(listId)

  let text = field.textContent || field.value;
  field.textContent = null;
  field.value = null;

  if (!text || !text.trim()) null;
  else {
    const list = document.querySelector(`.field-block:has(#${listId}) .addition-list`);
    const div = createFormCardNode(text, list.childElementCount);
    list.prepend(div);
  }
}

function generateJSON() {
  return ({
    ...generateListJSON(),
    photoUrls: getListValues("photoUrls")
  })
}