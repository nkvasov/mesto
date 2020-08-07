import Popup from './Popup.js';
import {
  figureImage,
  figureCaption
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  // constructor(popupSelector) {
  //   super(popupSelector);
  // }

  open(evt) {
    const originCard = evt.target.closest('.card');
    figureImage.src = evt.target.src;
    figureImage.alt = evt.target.alt;
    figureCaption.textContent = originCard.querySelector('.card__title').textContent;
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
}




// function openImage(evt) {
//   const currentCard = evt.target.closest('.card');
//   figureImage.src = evt.target.src;
//   figureImage.alt = evt.target.alt;
//   figureCaption.textContent = currentCard.querySelector('.card__title').textContent;
//   openPopup(figurePopup);
// }
