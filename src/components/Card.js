export default class Card {
  constructor({name, link, likes, owner, _id}, {cardTemplateSelector, handleImageClick, handleTrashClick, handleCardDelete, handleLikeClick, handleUnlikeClick, userId}) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardTemplateSelector = cardTemplateSelector;
    this._openImage = handleImageClick;
    this._openDeleteConfirmation = handleTrashClick
    this._deleteCardFromServer = handleCardDelete;
    this._like = handleLikeClick;
    this._unlike = handleUnlikeClick;
    this._id = _id;
    this._isOwner = (owner._id === userId);
    this._isLiked = likes.some(user => user._id === userId);

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

  _toggleLikeCardLayout() {
    this._likeBtn.classList.toggle('card__like-btn_enabled');
  }

  _toggleLikeCard = () => {
    if(!this._isLiked) {
     this._like(this._id)
     .then((cardData) => {
        this._toggleLikeCardLayout();
        this._likeNumbersElement.textContent = cardData.likes.length ? cardData.likes.length : '';
        this._isLiked = !this._isLiked;
      });
    } else {
      this._unlike(this._id)
      .then((cardData) => {
        this._toggleLikeCardLayout();
        this._likeNumbersElement.textContent = cardData.likes.length ? cardData.likes.length : '';
        this._isLiked = !this._isLiked;
      });
    }
  }

  _setCardListeners() {
    this._trashBtn.addEventListener('click', this._openDeleteConfirmation);
    this._likeBtn.addEventListener('click', this._toggleLikeCard);
    this._image.addEventListener('click', this._openImage);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._card = this._element.querySelector('.card');
    this._likeNumbersElement = this._element.querySelector('.card__like-numbers')
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeNumbersElement.textContent = this._likes.length ? this._likes.length : '';
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = `фото ${this._name}`;
    this._likeBtn = this._element.querySelector('.card__like-btn');
    this._trashBtn = this._element.querySelector('.card__trash-btn');
    if(this._isOwner) {
      this._trashBtn.classList.add('card__trash-btn_enabled');
    }
    if(this._isLiked) {
      this._toggleLikeCardLayout();
    }
    this._setCardListeners();
    console.log(this._card);
    return this._element;
  }
}
