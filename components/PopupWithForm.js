import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector('.form');
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._form.reset();
  }

  // Добавляет попапу функции закрытия по кнопке и по оверлею, а также останавливает всплытие событий на контейнере попапа
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

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


// Функция возвращает объект с двумя свойствами для генерации карточки. Значения свойств вводятся пользователем.
function getCardDataFromInput() {
  return {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
}
