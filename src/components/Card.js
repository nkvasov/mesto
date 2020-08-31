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
    // _isOwner === true, если карточка создавалась пользователем
    this._isOwner = (owner._id === userId);
    // _isLiked === true, если в массиве лайков есть id пользователя
    this._isLiked = likes.some(user => user._id === userId);

  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .cloneNode(true);
    return cardElement;
  }

  _deleteCard = () => {
    return this._deleteCardFromServer(this._id)
    .then(() => {
      this._card.remove();
    });
  }

  // Передает наружу приватный метод по удалению карточки, привязанный к указанному экземпляру класса
  getActionToConfirm = (card) => {
    return this._deleteCard.bind(card);
  }


  _toggleLikeIcon() {
    this._likeBtn.classList.toggle('card__like-btn_enabled');
  }

  _updateCardLikes = (cardData) => {
    this._toggleLikeIcon();
    // Если лайков нет, то будет пустая строка вместо 0
    this._likeNumbersElement.textContent = cardData.likes.length || '';
    this._isLiked = !this._isLiked;
  }

  _toggleLikeCard = () => {
    if(this._isLiked) {
     return this._unlike(this._id);
    } else {
      return this._like(this._id);
    }
  }

  _setCardListeners() {
    this._trashBtn.addEventListener('click', this._openDeleteConfirmation);
    this._likeBtn.addEventListener('click', () => {
      this._toggleLikeCard()
      .then((cardData) => {
        this._updateCardLikes(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
    });
    this._image.addEventListener('click', this._openImage);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._card = this._element.querySelector('.card');
    this._likeBtn = this._element.querySelector('.card__like-btn');
    this._trashBtn = this._element.querySelector('.card__trash-btn');
    this._image = this._element.querySelector('.card__image');
    this._likeNumbersElement = this._element.querySelector('.card__like-numbers');
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeNumbersElement.textContent = this._likes.length ? this._likes.length : '';
    this._image.src = this._link;
    this._image.alt = `фото ${this._name}`;

    if(this._isOwner) {
      this._trashBtn.classList.add('card__trash-btn_enabled');
    }
    if(this._isLiked) {
      this._toggleLikeIcon();
    }
    this._setCardListeners();
    return this._element;
  }
}
