import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._element.querySelector('.figure__image');
    this._caption = this._element.querySelector('.figure__caption');
  }

  open(evt) {
    const originCard = evt.target.closest('.card');
    this._image.src = evt.target.src;
    this._image.alt = evt.target.alt;
    this._caption.textContent = originCard.querySelector('.card__title').textContent;
    super.open();
  }
}
