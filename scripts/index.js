// Элементы секции Профиль на странице
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__description');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const addCardBtn = profile.querySelector('.add-btn');

// Элементы попапа "Редактирование профиля"
const profileForm = document.querySelector('[name="edit-profile"]');
const profilePopup = profileForm.closest('.popup');
const profileNameInput = profileForm.querySelector('[name="profile-name"]');
const profileJobInput = profileForm.querySelector('[name="profile-description"]');

// Элементы попапа "Добавление карточки"
const cardForm = document.querySelector('[name="add-card"]');
const cardPopup = cardForm.closest('.popup');
const cardNameInput = cardForm.querySelector('[name="card-name"]');
const cardLinkInput = cardForm.querySelector('[name="card-link"]');

// Элементы попапа картинки
const figurePopup = document.querySelector('.popup_content_figure');
const figure = figurePopup.querySelector('.figure');
const figureCaption = figurePopup.querySelector('.figure__caption');
const figureImage = figurePopup.querySelector('.figure__image');

// Секция карточек на странице
const cardsContainer = document.querySelector('.cards__container');

// Шаблон карточки
const cardTemplate = document.querySelector('.card-template');


// Функция меняет видимость заданного попапа.
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

// Функция переключения иконки Like
function toggleLikeCard(evt) {
  evt.target.classList.toggle('card__like-btn_enabled');
}

// Открывает указанный попап и навешивает обработчик ESC
// из задания: Слушатель событий, закрывающий модальное окно по нажатию на Esc, добавляется при открытии модального окна и удаляется при его закрытии.
function openPopup(popup) {
  togglePopup(popup);
  document.addEventListener('keydown', closeOnEsc);
}

// Сбрасывает поля формы в попапе, если она существует в попапе
function resetPopupForm(popup) {
  const popupForm = popup.querySelector('.form');
  if (popupForm) {
    popupForm.reset();
  }
}

// Закрывает указанный попап, удаляет обработчик ESC
function closePopup(popup) {
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

// Функция открывает попап с картинкой, предварительно поставив туда данные из кликнутой карточки.
function openImage(evt) {
  const currentCard = evt.target.closest('.card');
  figureImage.src = evt.target.src;
  figureImage.alt = evt.target.alt;
  figureCaption.textContent = currentCard.querySelector('.card__title').textContent;
  openPopup(figurePopup);
}

// Функция навешивает обработчики событий на карточку
function addCardListeners(card) {
  card.querySelector('.card__trash-btn').addEventListener('click', deleteCard);
  card.querySelector('.card__like-btn').addEventListener('click', toggleLikeCard);
  card.querySelector('.card__image').addEventListener('click', openImage);
}

// Функция создает карточку по шаблону, заполняет значениями, навешивает обработчики на кнопки и возвращает эту карточку.
function generateCard(cardData) {
  const newCard = cardTemplate.content.cloneNode(true);
  newCard.querySelector('.card__title').textContent = cardData.name;
  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__image').alt = 'фото ' + cardData.name ;
  addCardListeners(newCard);
  return newCard;
}

// Функция добавляет на страницу карточку с указанными данными в указанный контейнер.
function addCard(container, cardData) {
  const newCard = generateCard(cardData);
  container.prepend(newCard);
}

// Функция открывает попап редактирования профиля, предварительно заполняет поля значениями со страницы
function editProfile() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profilePopup);
}


// Функция размещает введенные данные Профиля на страницу и закрывает форму.
function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profilePopup);
}

// Функция возвращает объект с двумя свойствами для генерации карточки. Значения свойств вводятся пользователем.
function getCardDataFromInput() {
  return {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  }
}

// Функция запускает создание новой карточки на основе введенных данных, размещает карточку на странице и закрывает форму.
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  addCard(cardsContainer, getCardDataFromInput());
  closePopup(cardPopup);
}

// Добавляет попапам функции закрытия по кнопке и по оверлею, а также останавливает всплытие событий на контейнере попапа
function addPopupListeners() {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', closeOnOverlayClick)
    popupElement.querySelector('.close-btn').addEventListener('click', () => {
      closePopup(popupElement);
    })
    popupElement.querySelector('.popup__container').addEventListener('click', (evt) => {
      evt.stopPropagation();
    })
  })
}

// заполняем секцию карточками
initialCards.forEach((cardData) => {
  addCard(cardsContainer, cardData);
})

// обработка нажатия кнопки редактирования профиля
profileEditBtn.addEventListener('click', editProfile);

// обработка нажатие кнопки Добавления карточки
addCardBtn.addEventListener('click', () => {
  openPopup(cardPopup);
});

// обработка события submit формы Профиля
profileForm.addEventListener('submit', profileFormSubmitHandler);

// обработка события submit формы Карточки
cardForm.addEventListener('submit', cardFormSubmitHandler);

addPopupListeners();
