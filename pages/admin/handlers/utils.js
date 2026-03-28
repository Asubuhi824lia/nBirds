// TODO: createRange() | importNode() 
// — отображение группы полей в модалке добавления

// TODO: createDocumentFragment() — в контейнер для множества элементов (фрагмент не виден) 
// (список данных/карточек/названий)
// Оптимизация. Манипулирование узлами без перерисовки страницы (reflow)

// TODO: startViewTransition() — в добавлении данных в форме


// TODO: createComment() — новая отладка! якорь вставки :0


// TODO: URLSearchParams() — поисковые параметны к fetch-допросу до useQuery

// TODO: window.matchMedia — это эффективная альтернатива событию resize


// TODO: new FormData() — передача файла


// TODO: document.hasFocus() — показывает, находится ли документ или любой элемент внутри него в фокусе

// TODO: document.getAnimations() — получить все анимации, действующие на данный момент
// 1.остановить анимации, когда юзер ушел со страницы?

// TODO: .elementsFromPoint(x, y) — Drag-and-Drop 

// TODO: .createNodeIterator() — обработка узлов В ПРОЦЕССЕ итерации
// Фильтр узлов-имён таксона

// TODO: .adoptNode() — перенос узла для переноса фактов между группами

const listClassNames = {
  _name: 'addition-list-item',
  item: {
    info: 'item-info',
    menu: 'item-actions'
  }
}


// Btn Group 
const addBtnAttributes = (btn, type) => {
  const name = document.createAttribute('name');
  name.value = "action";
  const value = document.createAttribute('value');
  value.value = type;
  btn.setAttributeNode(name);
  btn.setAttributeNode(value);
}

const createBtnGroup = (container, info, editInfo) => {
  const editBtn = document.createElement('button');
  editBtn.innerText = "edit";
  addBtnAttributes(editBtn, "edit");
  const saveBtn = document.createElement('button');
  saveBtn.innerText = "save";
  addBtnAttributes(saveBtn, "save");
  const delBtn = document.createElement('button');
  delBtn.innerText = "delete";
  addBtnAttributes(delBtn, "delete");

  const handleEvent = "blur";
  editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.replaceWith(saveBtn);

    editInfo.addEventListener(handleEvent, showIsNotValidHandler);

    const textNode = document.createTextNode(info.innerText);
    editInfo.replaceChildren(textNode);
    info.replaceWith(editInfo);
  })
  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.replaceWith(editBtn);

    editInfo.removeEventListener(handleEvent, showIsNotValidHandler);

    const textNode = document.createTextNode(editInfo.value);
    editInfo.setCustomValidity("");
    info.replaceChildren(textNode);
    editInfo.replaceWith(info);
  })
  delBtn.addEventListener('click', () => {
    editInfo.removeEventListener(handleEvent, showIsNotValidHandler);
    container.remove();
  });

  // для семантического стандарта HTML
  const editLi = document.createElement('li');
  editLi.appendChild(editBtn)
  const delLi = document.createElement('li');
  delLi.appendChild(delBtn)

  const menu = document.createElement('menu');
  menu.append(editLi, delLi);
  return menu;
}

const createFormCardNode = function (text, index) {
  // createTextNode — escape HTML characters (convert into text)
  const newText = document.createTextNode(text);
  const info = document.createElement('span');
  info.appendChild(newText);

  const editInfo = document.createElement('textarea');
  editInfo.setAttribute("rows", 5);

  const container = document.createElement('div');
  const actions = createBtnGroup(container, info, editInfo);

  container.appendChild(info).classList.add(listClassNames.item.info);
  container.appendChild(actions).classList.add(listClassNames.item.menu);
  container.classList.add(listClassNames._name);
  container.setAttribute('key', `${listClassNames._name}-${index}`)

  return container;
}


// validate
const errors = {
  INCOMPLETE_ITEM: "Поле заполнено, но значение не добавлено",
  EDITING_STATE: "Завершите редактирование перед отправкой"
}

const validIncompleteItem = function (field, text) {
  let isValid = true;
  if (text.trim().length > 0 && isValid) {
    const previousNodeName = field.closest('.field-block').previousElementSibling.nodeName;
    if (previousNodeName != 'DIV') {
      // в начало блока формы
      field.closest(".form-block").scrollIntoView();
    }
    else {
      // в начало блока поля
      field.closest(".field-block").scrollIntoView();
    }

    field.setCustomValidity(errors.INCOMPLETE_ITEM);
    isValid = false;
  }
  else {
    // очищаем ошибку предыдущего шага, если была
    field.setCustomValidity("");
  }
  return isValid;
}

const validEditingState = function (field) {
  let isValid = true;

  const blockField = field.closest(".field-block");
  const list = blockField.lastElementChild;

  // поиск относительно постоянной кнопки
  for (const delLi of list.querySelectorAll(`li:has([value="delete"])`)) {
    const btnValue = delLi.previousElementSibling.firstElementChild;
    if (btnValue.value === "save") {
      isValid = false;

      const item = delLi.closest(".addition-list-item");
      scrollToOffsetElement(item);

      const editField = item.querySelector("textarea");
      editField.setCustomValidity(errors.EDITING_STATE);
      break;
    }
  }
  return isValid;
}

const validBuiltIn = function () {
  const field = document.getElementById("nameMain");
  field.addEventListener("blur", showIsNotValidHandler);
  return field.checkValidity();
}

function validateForm(listIds) {
  let isValid = true;

  for (const fieldId of listIds) {
    const field = document.getElementById(fieldId);
    const text = field.value || field.textContent;

    isValid =
      validBuiltIn()
      && validIncompleteItem(field, text)
      && validEditingState(field);

    if (!isValid) break;
  }
  return isValid;
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