import {openImage} from './popupHandlers.js'
export default class Card {
  constructor(cardData, cardTemplateSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .cloneNode(true);
    return cardElement;
  }

  _deleteCard(evt) {
    evt.target.closest('.card').remove();
  }

  _toggleLikeCard(evt) {
    evt.target.classList.toggle('card__like-btn_enabled');
  }

  _openImage = openImage;

  _setCardListeners() {
    this._element.querySelector('.card__trash-btn').addEventListener('click', this._deleteCard);
    this._element.querySelector('.card__like-btn').addEventListener('click', this._toggleLikeCard);
    this._element.querySelector('.card__image').addEventListener('click', this._openImage);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = `фото ${this._name}`;
    this._setCardListeners();
    return this._element;
  }
}
