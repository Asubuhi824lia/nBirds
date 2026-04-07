function generateJSON() {
  return ({
    ...generateListJSON(),
    photoUrls: getListValues("photoUrls")
  })
}