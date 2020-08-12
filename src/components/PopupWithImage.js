import Popup from './Popup.js';
import {
  figureImage,
  figureCaption
} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  open(evt) {
    const originCard = evt.target.closest('.card');
    figureImage.src = evt.target.src;
    figureImage.alt = evt.target.alt;
    figureCaption.textContent = originCard.querySelector('.card__title').textContent;
    super.open();
  }
}
