export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  // Обработчик Esc
  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Открывает попап и навешивает обработчик ESC
  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрывает  попап, удаляет обработчик ESC
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }


  // Добавляет попапу функции закрытия по кнопке и по оверлею, а также останавливает всплытие событий на контейнере попапа
  setEventListeners() {
    this._element.querySelector('.close-btn').addEventListener('click', () => {
      this.close();
    });
    this._element.querySelector('.popup__container').addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
    this._element.addEventListener('click', () => {
      this.close();
    });
  }
}
