// TODO: createRange() | importNode() 
// — отображение группы полей в модалке добавления

// TODO: createDocumentFragment() — в контейнер для множества элементов (фрагмент не виден) 
// (список данных/карточек/названий)
// Оптимизация. Манипулирование узлами без перерисовки страницы (reflow)

// TODO: createAttribute() — кнопкам "Удалить" / "Отредактировать" значения поля
// name="N-action" value="N-delete"("edit")

// TODO: replaceChildren() — заменить текст на текстовое поле редактирования (edit)

// TODO: startViewTransition() — в добавлении данных в форме


// TODO: createComment() — новая отладка! якорь вставки :0


// TODO: URLSearchParams() — поисковые параметны к fetch-допросу до useQuery

// TODO: window.matchMedia — это эффективная альтернатива событию resize


// TODO: new FormData() — передача файла


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
    const div = document.createElement('div');
    div.classList.add(`addition-list-item`);

    const span = document.createElement('span');
    // createTextNode — escape HTML characters
    const newText = document.createTextNode(text);
    span.appendChild(newText);
    div.append(span);

    const list = document.querySelector(`.field-block:has(#${listId}) .addition-list`);
    list.append(div);
  }
}


// JSON
function generateListJSON(fieldNames) {
  const json = new Object();

  fieldNames.forEach((fieldId) => {
    const list = document.querySelector(`.field-block:has(#${fieldId}) .addition-list`);
    const answers = Array.from(list.getElementsByTagName('div'))

    json[fieldId] = answers
  })

  return json;
}

function generateJSON(fieldNames) {
  const nameMain = document.getElementById("nameMain")

  return ({
    ...generateListJSON(fieldNames),
    nameMain: nameMain.value
  })
}