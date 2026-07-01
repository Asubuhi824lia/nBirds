import { FormBirdAdd } from "~/pages/admin/widgets/FormBirdAdd/FormBirdAdd";

export default function Home() {
  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      <FormBirdAdd />
    </section>
  )
}


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


// TODO: document.hasFocus() 
// | "visibilitychange" [Page Visibility API]
// — показывает, находится ли документ или любой элемент внутри него в фокусе

// TODO: document.getAnimations() — получить все анимации, действующие на данный момент
// 1.остановить анимации, когда юзер ушел со страницы?

// TODO: .elementsFromPoint(x, y) — Drag-and-Drop 

// TODO: .createNodeIterator() — обработка узлов В ПРОЦЕССЕ итерации
// Фильтр узлов-имён таксона

// TODO: .adoptNode() — перенос узла для переноса фактов между группами

// TODO: FileReader: readAsDataURL() | URL.createObjectURL(object)
// - отображать фото птицы при загрузки с компа


// Служебное !

// TODO: document.designMode = "on" — делает всю веб-страницу редактируемой

// TODO: document.referrer — сымитировать хлебные крошки
// возвращает URI страницы, с которой пользователь перешел на текущую страницу.

// TODO: .defaultView — получить window родителя или фрейма кода внутри другого документа

// TODO: .adoptedStyleSheets = [sheet]
// добавление группы "общих" стилей к DOM-/shadow-элементу


// TODO: "securitypolicyviolation" — фиксирование нарушений (на сервер)
