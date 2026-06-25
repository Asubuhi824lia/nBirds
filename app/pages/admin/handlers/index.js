// Служебное !

// TODO: document.designMode = "on" — делает всю веб-страницу редактируемой

// TODO: document.referrer — сымитировать хлебные крошки
// возвращает URI страницы, с которой пользователь перешел на текущую страницу.

// TODO: .defaultView — получить window родителя или фрейма кода внутри другого документа

// TODO: .adoptedStyleSheets = [sheet]
// добавление группы "общих" стилей к DOM-/shadow-элементу


// TODO: "securitypolicyviolation" — фиксирование нарушений (на сервер)


const inputIds = [
  "photoUrls",
  "nameAlternatives",
]

const textareaIds = [
  "nameEtymologies",
  "interestFacts",
  "statisticFacts",
  "similarSpecies"
]

const listIds = [...inputIds, ...textareaIds];


export const scrollToOffsetElement = (element: any, offset = 150) => {
  const elemPos = element.getBoundingClientRect().top;
  const offsetPos = elemPos + window.scrollY - offset;

  window.scrollTo({
    top: offsetPos,
    behavior: 'smooth'
  })
}


// установить добавление по кнопке
listIds.forEach((fieldId) => {
  const field = document.getElementById(fieldId);

  const btn = document.getElementById(`${fieldId}Btn`);
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    addListItem(fieldId);

    if (!field.checkValidity() && field.validationMessage === errors.INCOMPLETE_ITEM) {
      field.setCustomValidity("");
    }
  });

  // регулирование валидации
  field.addEventListener('input', () => {
    if (field.checkValidity() === true) return;

    const text = field.value || field.textContent;
    if (!text.trim()) field.setCustomValidity("");
  })
  // показ сообщения ошибки 
  // при фиксации не ставшего валидным значения
  field.addEventListener('blur', () => showIsNotValid(field))
})

const submit = document.querySelector("button[type=submit]")
submit.addEventListener('click', (e) => {
  // валидация
  if (validateForm(listIds)) {
    e.preventDefault();
    // сгенерировать JSON
    const json = generateJSON();
    console.log(json);
    const files = generateListImageFiles();

    clearFormFields();
    window.scrollTo({ top, behavior: "smooth" });
  }
})

// TODO: for test
listIds.forEach((fieldId) => {
  addListItem(fieldId);
})