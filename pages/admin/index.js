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
  const btn = document.getElementById(`${fieldId}Btn`);
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    addListItem(fieldId);
  });
})
// установить добавление по Enter из поля в фокусе
document.addEventListener('keydown', (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // Запрещает перенос по Enter
    if (listIds.includes(document.activeElement.id)) {
      addListItem(document.activeElement.id);
    }
  }
})

const submit = document.querySelector("button[type=submit]")
submit.addEventListener('click', (e) => {
  e.preventDefault();
  // валидация
  if (validateForm(listIds)) {
    // сгенерировать JSON
    const json = generateJSON(listIds);
    console.log(json);
  }
})

// TODO: for test
listIds.forEach((fieldId) => {
  addListItem(fieldId);
})