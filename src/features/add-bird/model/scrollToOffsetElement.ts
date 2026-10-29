export const scrollToOffsetElement = (element: any, offset = 150) => {
  const elemPos = element.getBoundingClientRect().top;
  const offsetPos = elemPos + window.scrollY - offset;

  window.scrollTo({
    top: offsetPos,
    behavior: "smooth"
  })
}