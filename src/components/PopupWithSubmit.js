import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._element.querySelector('.form');
  }

  open(originObject) {
    super.open();
    this._originObject = originObject;
  }

  setSubmitHandler = (submitHandler) => {
    this._handleFormSubmit = submitHandler;
  }


  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._originObject);
      this.close();
    });

    super.setEventListeners();


  }

}
