export default class Card {
  constructor({name, link, likes, owner, _id}, {cardTemplateSelector, handleImageClick, handleTrashClick, handleCardDelete, userId}) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardTemplateSelector = cardTemplateSelector;
    this._openImage = handleImageClick;
    this._openDeleteConfirmation = handleTrashClick
    this._deleteCardFromServer = handleCardDelete;
    this._id = _id;
    if(owner._id === userId) {
      this._isOwner = true;
    } else {
      this._isOwner = false;
    }

  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .cloneNode(true);
    return cardElement;
  }

  _deleteCardFromLayout = () => {
    this._card = this._image.closest('.card');
    this._card.remove();
  }

  _deleteCard = () => {
    this._deleteCardFromServer(this._id)
    .then(() => {
      this._deleteCardFromLayout();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getDeleteHandler = () => {
    return this._deleteCard;
  }

  _toggleLikeCard(evt) {
    evt.target.classList.toggle('card__like-btn_enabled');
  }

  _setCardListeners() {
    this._element.querySelector('.card__trash-btn').addEventListener('click', this._openDeleteConfirmation);
    this._element.querySelector('.card__like-btn').addEventListener('click', this._toggleLikeCard);
    this._element.querySelector('.card__image').addEventListener('click', this._openImage);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__like-numbers').textContent = this._likes.length === 0 ? '' : this._likes.length;
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = `фото ${this._name}`;
    if(this._isOwner) {
      this._element.querySelector('.card__trash-btn').classList.add('card__trash-btn_enabled');
    };
    this._setCardListeners();
    return this._element;
  }
}
