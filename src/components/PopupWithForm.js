import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._element.querySelector('.form');
    this._submitBtn = this._form.querySelector('.form__submit-btn');
    this._submitBtnMainText = this._submitBtn.textContent;
  }

  // Возвращает объект с данными полей ввода формы
  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  _renderLoading(isLoading) {
    if(isLoading) {
      this._submitBtn.textContent = 'Сохранение...';
    } else {
      this._submitBtn.textContent = this._submitBtnMainText;
    }
  }

  // Расширяет родительскую функцию добавлением обработки submit
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      this._renderLoading(true);
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this._renderLoading(false);
        this.close();
      });
    });
    super.setEventListeners();
  }
}
