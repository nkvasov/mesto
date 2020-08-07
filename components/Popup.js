export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  // _handleEscClose(evt) {
  //   if (evt.key === 'Escape') {
  //     const popup = document.querySelector('.popup_opened');
  //     popup.classList.remove('popup_opened');
  //   }
  // }


  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _toggle() {
    this._element.classList.toggle('popup_opened');
  }

  open() {
    this._toggle();
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._toggle();
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    this._element.querySelector('.close-btn').addEventListener('click', () => {
      this.close();
    });
  }
}


// Добавляет попапам функции закрытия по кнопке и по оверлею, а также останавливает всплытие событий на контейнере попапа
function setPopupListeners() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', closeOnOverlayClick);
    popupElement.querySelector('.close-btn').addEventListener('click', () => {
      closePopup(popupElement);
    });
    popupElement.querySelector('.popup__container').addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
  });
}

// Функция меняет видимость заданного попапа.
const togglePopup = function(popup) {
  popup.classList.toggle('popup_opened');
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

// Обработчик нажатия клавиши ESC
function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Обработчик клика по оверлею
function closeOnOverlayClick(evt) {
  const popup = evt.currentTarget;
  closePopup(popup);
}

// Открывает указанный попап и навешивает обработчик ESC
// из задания: Слушатель событий, закрывающий модальное окно по нажатию на Esc, добавляется при открытии модального окна и удаляется при его закрытии.
function openPopup(popup) {
  togglePopup(popup);
  document.addEventListener('keydown', closeOnEsc);
}

// Открывает попап с картинкой, предварительно поставив туда данные из кликнутой карточки.
function openImage(evt) {
  const currentCard = evt.target.closest('.card');
  figureImage.src = evt.target.src;
  figureImage.alt = evt.target.alt;
  figureCaption.textContent = currentCard.querySelector('.card__title').textContent;
  openPopup(figurePopup);
}

export {openPopup, closePopup, closeOnOverlayClick, openImage};
