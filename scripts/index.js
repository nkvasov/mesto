// Элементы секции Профиль на странице
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__description');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const addCardBtn = profile.querySelector('.add-btn');

// Элементы попапа "Редактирование профиля"
const profileForm = document.forms['edit-profile'];
const profilePopup = profileForm.closest('.popup');
const profileNameInput = profileForm.elements['profile-name'];
const profileJobInput = profileForm.elements['profile-description'];

// Элементы попапа "Добавление карточки"
const cardForm = document.forms['add-card'];
const cardPopup = cardForm.closest('.popup');
const cardNameInput = cardForm.elements['card-name'];
const cardLinkInput = cardForm.elements['card-link'];

// Элементы попапа картинки
const figurePopup = document.querySelector('.popup_content_figure');
const figureCaption = figurePopup.querySelector('.figure__caption');
const figureImage = figurePopup.querySelector('.figure__image');

// Секция карточек на странице
const cardsContainer = document.querySelector('.cards__container');




// Функция создает карточку по шаблону, заполняет значениями, навешивает обработчики на кнопки и возвращает эту карточку.
function generateCard(cardData) {
  const newCard = document.querySelector('.card-template').content.cloneNode(true);
  newCard.querySelector('.card__title').textContent = cardData.name;
  newCard.querySelector('.card__image').src = cardData.link;
  newCard.querySelector('.card__image').alt = 'фото ' + cardData.name ;
  addCardListeners(newCard);
  return newCard;
}

// Функция навешивает обработчики событий на карточку
function addCardListeners(card) {
  card.querySelector('.card__trash-btn').addEventListener('click', deleteCard);
  card.querySelector('.card__like-btn').addEventListener('click', toggleLikeCard);
  card.querySelector('.card__image').addEventListener('click', openImage);
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function toggleLikeCard(evt) {
  evt.target.classList.toggle('card__like-btn_enabled');
}

// Функция добавляет на страницу карточку.
function addCard(container, cardData) {
  const newCard = generateCard(cardData);
  container.prepend(newCard);
}


// заполняем секцию карточками
initialCards.forEach(cardData => {
  addCard(cardsContainer, cardData);
})





profileEditBtn.addEventListener('click', editProfile); // обработка нажатия кнопки редактирования профиля

addCardBtn.addEventListener('click', () => {
  togglePopup(cardPopup);
});

profileForm.addEventListener('submit', profileFormSubmitHandler); // обработка нажатия кнопки "Cохранить" попап или клавиши Enter

cardForm.addEventListener('submit', cardFormSubmitHandler);



profilePopup.querySelector('.close-btn').addEventListener('click', () => {
  togglePopup(profilePopup);
});

cardPopup.querySelector('.close-btn').addEventListener('click', () => {
  togglePopup(cardPopup);
})

figurePopup.querySelector('.close-btn').addEventListener('click', () => {
  togglePopup(figurePopup);
})

// Функция меняет видимость заданного попапа.
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Функция открывает попап редактирования профиля, предварительно заполняет поля значениями со страницы
function editProfile() {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  togglePopup(profilePopup);
}

// Функция открывает попап с картинкой, предварительно поставив туда данные из кликнутой карточки.
function openImage(evt) {
  const currentCard = evt.target.closest('.card');
  figureImage.src = evt.target.src;
  figureCaption.textContent = currentCard.querySelector('.card__title').textContent;
  togglePopup(figurePopup);
}

// Функция размещает введенные данные на страницу и закрывает форму.
function profileFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  togglePopup(profilePopup);
}

// Функция возвращает объект данных карточки с двумя свойствами. Значения свойств вводятся пользователем.
function makeCardData() {
  const newCardObject = {};
  newCardObject.name = cardNameInput.value;
  newCardObject.link = cardLinkInput.value;
  return newCardObject;
}

// Функция запускает создание новой карточки на основе введенных данных, размещает карточку на странице и закрывает форму.
function cardFormSubmitHandler(evt) {
  evt.preventDefault ();
  addCard(cardsContainer, makeCardData());
  cardNameInput.value = '';
  cardLinkInput.value = '';
  togglePopup(cardPopup);
}


