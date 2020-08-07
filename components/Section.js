export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Метод обрабатывает переданные в конструктор данные с помощью переданной функции и размещает их на страницу
  renderItems() {
    this._initialArray.forEach((item) => {
      const itemElement = this._renderer(item);
      this.addItem(itemElement);
    });
  }

// Метод добавляет указанный элемент на страницу (в контейнер экземпляра класса)
  addItem(element) {
    this._container.prepend(element);
  }
}




// Создает новую карточку и добавляет в указанное место
// function addCard(container, cardData) {
//   const card = new Card(cardData, '.card-template');
//   const cardElement = card.generateCard();
//   container.prepend(cardElement);
// }

// Функция запускает создание новой карточки на основе введенных данных, размещает карточку на странице и закрывает форму.
// function cardFormSubmitHandler(evt) {
//   evt.preventDefault();
//   const cardData = getCardDataFromInput();
//   addCard(cardsContainer, cardData);
//   closePopup(cardPopup);
// }
