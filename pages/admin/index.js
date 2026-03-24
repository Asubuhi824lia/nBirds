const listIds = [
  "photoUrl",
  "nameAlternative",
  "nameEtymology",
  "interestFacts",
  "statisticFacts",
  "similarSpecies"
]

listIds.forEach((fieldId) => {
  const btn = document.getElementById(`${fieldId}Btn`);
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    addListItem(fieldId);
  });
})

const submit = document.querySelector("button[type=submit]")
submit.addEventListener('click', (e) => {
  e.preventDefault();
  const json = generateJSON(listIds);
  console.log(json);
})

// TODO: for test
listIds.forEach((fieldId) => {
  addListItem(fieldId);
})