import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._element.querySelector('.form');
  }

  // Для универсальности
  setSubmitHandler = (submitHandler) => {
    this._handleFormSubmit = submitHandler;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit()
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.close();
      });
    });

    super.setEventListeners();
  }
}
