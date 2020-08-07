import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    this._element.querySelector('.figure__image')
    figureImage.src = evt.target.src;
    figureImage.alt = evt.target.alt;
    figureCaption.textContent = currentCard.querySelector('.card__title').textContent;
    this._toggle();
    document.addEventListener('keydown', this._handleEscClose);
  }
}

// Элементы попапа картинки
const figurePopup = document.querySelector('.popup_content_figure');
const figureCaption = figurePopup.querySelector('.figure__caption');
const figureImage = figurePopup.querySelector('.figure__image');

function openImage(evt) {
  const currentCard = evt.target.closest('.card');
  figureImage.src = evt.target.src;
  figureImage.alt = evt.target.alt;
  figureCaption.textContent = currentCard.querySelector('.card__title').textContent;
  openPopup(figurePopup);
}
