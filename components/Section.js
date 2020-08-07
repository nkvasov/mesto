import { initialCards } from '../utils/initial-cards.js';
import {
  cardsContainerSelector
} from '../utils/constants.js';

export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}




// Создает новую карточку и добавляет в указанное место
function addCard(container, cardData) {
  const card = new Card(cardData, '.card-template');
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

// Функция запускает создание новой карточки на основе введенных данных, размещает карточку на странице и закрывает форму.
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardData = getCardDataFromInput();
  addCard(cardsContainer, cardData);
  closePopup(cardPopup);
}
