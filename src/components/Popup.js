export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  // Обработчик Esc
  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // _handleEscClose(evt) {
  //   if (evt.key === 'Escape') {
  //     this.close();
  //   }
  // }

  // Открывает попап и навешивает обработчик ESC
  open() {
    this._element.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Закрывает  попап, удаляет обработчик ESC
  close() {
    this._element.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Добавляет попапу функции закрытия по кнопке и по оверлею, а также останавливает всплытие событий на контейнере попапа
  setEventListeners() {
    this._element.querySelector('.close-btn').addEventListener('click', () => {
      this.close();
    });
    this._element.querySelector('.popup__container').addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
    this._element.addEventListener('click', () => {
      this.close();
    });
  }
}



// Сбрасывает поля формы в попапе, если она существует в попапе
const resetPopupForm = function(popup) {
  const popupForm = popup.querySelector('.form');
  if (popupForm) {
    popupForm.reset();
  }
}

// Закрывает указанный попап, удаляет обработчик ESC
const closePopup = function(popup) {
  togglePopup(popup);
  resetPopupForm(popup);
  document.removeEventListener('keydown', closeOnEsc);
}

// Открывает попап с картинкой, предварительно поставив туда данные из кликнутой карточки.
function openImage(evt) {
  const currentCard = evt.target.closest('.card');
  figureImage.src = evt.target.src;
  figureImage.alt = evt.target.alt;
  figureCaption.textContent = currentCard.querySelector('.card__title').textContent;
  openPopup(figurePopup);
}

