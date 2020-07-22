// Элементы попапа картинки
const figurePopup = document.querySelector('.popup_content_figure');
const figureCaption = figurePopup.querySelector('.figure__caption');
const figureImage = figurePopup.querySelector('.figure__image');

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
