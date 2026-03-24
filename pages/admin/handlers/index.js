// TODO: createRange() | importNode() 
// — отображение группы полей в модалке добавления

// TODO: createDocumentFragment() — в контейнер для множества элементов (фрагмент не виден) 
// (список данных/карточек/названий)
// Оптимизация. Манипулирование узлами без перерисовки страницы (reflow)

// TODO: replaceChildren() — заменить текст на текстовое поле редактирования (edit)

// TODO: startViewTransition() — в добавлении данных в форме


// TODO: createComment() — новая отладка! якорь вставки :0


// TODO: URLSearchParams() — поисковые параметны к fetch-допросу до useQuery

// TODO: window.matchMedia — это эффективная альтернатива событию resize


// TODO: new FormData() — передача файла

const listClassNames = {
  _name: 'addition-list-item',
  item: {
    info: 'item-info',
    menu: 'item-actions'
  }
}


// START Btn Group 
const addBtnAttributes = (btn, type) => {
  const name = document.createAttribute('name');
  name.value = "action";
  const value = document.createAttribute('value');
  value.value = type;
  btn.setAttributeNode(name);
  btn.setAttributeNode(value);
}

const createBtnGroup = () => {
  const editBtn = document.createElement('button');
  editBtn.innerText = "edit";
  addBtnAttributes(editBtn, "edit");
  const delBtn = document.createElement('button');
  delBtn.innerText = "delete";
  addBtnAttributes(delBtn, "delete");

  const editLi = document.createElement('li');
  editLi.appendChild(editBtn)
  const delLi = document.createElement('li');
  delLi.appendChild(delBtn)

  const menu = document.createElement('menu');
  menu.append(editLi, delLi);
  return menu;
}
// END

const createFormCardNode = function (text, index) {
  // createTextNode — escape HTML characters (convert into text)
  const newText = document.createTextNode(text);
  const info = document.createElement('span');
  info.appendChild(newText);

  const actions = createBtnGroup();

  const container = document.createElement('div');
  container.appendChild(info).classList.add(listClassNames.item.info);
  container.appendChild(actions).classList.add(listClassNames.item.menu);
  container.classList.add(listClassNames._name);
  container.setAttribute('key', `${listClassNames._name}-${index}`)
  return container;
}

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