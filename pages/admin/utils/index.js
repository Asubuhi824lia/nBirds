// Служебное !

// TODO: document.designMode = "on" — делает всю веб-страницу редактируемой

// TODO: document.referrer — сымитировать хлебные крошки
// возвращает URI страницы, с которой пользователь перешел на текущую страницу.

// TODO: .defaultView — получить window родителя или фрейма кода внутри другого документа

// TODO: .adoptedStyleSheets = [sheet]
// добавление группы "общих" стилей к DOM-/shadow-элементу


// TODO: "securitypolicyviolation" — фиксирование нарушений (на сервер)


const scrollToOffsetElement = (element, offset = 150) => {
  const elemPos = element.getBoundingClientRect().top;
  const offsetPos = elemPos + window.scrollY - offset;

  window.scrollTo({
    top: offsetPos,
    behavior: 'smooth'
  })
}


// ************************************************************
// TODO: lifecycle
// "readystatechange" document.readyState === "interactive"
// | "DOMContentLoaded" 
// | window.onload
// DOM построено. Идеально для навешивания обработчиков событий, манипуляций с DOM
// "readystatechange" document.readyState === "complete"
// Страница и все ресурсы (картинки, стили) загружены. Идеально для получения размеров