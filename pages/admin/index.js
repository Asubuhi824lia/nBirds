const inputIds = [
  "photoUrl",
  "nameAlternative",
]

const textareaIds = [
  "nameEtymology",
  "interestFacts",
  "statisticFacts",
  "similarSpecies"
]

const listIds = [...inputIds, ...textareaIds];

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

// установить добавление по Enter из поля в фокусе
document.addEventListener('keydown', (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    if (listIds.includes(document.activeElement.id)) {
      addListItem(document.activeElement.id);
      e.preventDefault(); // Запрещает перенос по Enter
    }
  }
})

const submit = document.querySelector("button[type=submit]")
submit.addEventListener('click', (e) => {
  // валидация
  if (validateForm(listIds)) {
    e.preventDefault();
    // сгенерировать JSON
    const json = generateJSON(listIds);
    console.log(json);

    clearFormFields();
    window.scrollTo({ top, behavior: "smooth" });
  }
})

// TODO: for test
listIds.forEach((fieldId) => {
  addListItem(fieldId);
})