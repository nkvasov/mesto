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

// Открытый попап
let currentPopup = null;

// Секция карточек на странице
const cardsContainer = document.querySelector('.cards__container');

// Исходный массив карточек
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка бла бла Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam delectus quasi obcaecati quisquam. A alias tenetur nemo! Quas illo nesciunt culpa, quae et cumque, deserunt, nobis sapiente beatae officiis dolore! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto veniam in nostrum facere, repudiandae velit soluta, alias porro fugit odio nisi, quo omnis explicabo iste laboriosam mollitia nam voluptas dolores!',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// заполняем секцию карточками
initialCards.forEach(card => {
  addCard(card.name, card.link);
})

profileEditBtn.addEventListener('click', editProfile); // обработка нажатия кнопки редактирования профиля

addCardBtn.addEventListener('click', openPopup);

profileForm.addEventListener('submit', formSubmitHandler); // обработка нажатия кнопки "Cохранить" попап или клавиши Enter

cardForm.addEventListener('submit', cardFormSubmitHandler);

// Функция клонирует карточку по шаблону, заполняет значениями и добавляет на страницу.
function addCard(cardTitle, cardLink) {
  const newCard = document.querySelector('.card-template').content.cloneNode(true);
  newCard.querySelector('.card__title').textContent = cardTitle;
  newCard.querySelector('.card__image').src = cardLink;
  newCard.querySelector('.card__image').alt = 'фото ' + cardTitle ;
  addCardListeners(newCard);
  cardsContainer.prepend(newCard);
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

// Функция открывает нужный попап и навешивает обработчик на кнопку закрытия
function openPopup(evt) {
  setCurrentPopup(evt);
  popupToggle();
  currentPopup.querySelector('.close-btn').addEventListener('click', closePopup);
}

function closePopup() {
  popupToggle();
  currentPopup = null;
}

// Функция устанавливает текущий попап в зависимости от источника события
function setCurrentPopup(evt) {
  if (evt.target === profileEditBtn) {
    currentPopup = profilePopup;
  } else if (evt.target === addCardBtn) {
    currentPopup = cardPopup;
  } else if (evt.target.classList.contains('card__image')) {
    currentPopup = figurePopup;
  }
}

function popupToggle() {
  currentPopup.classList.toggle('popup_opened');
}

function editProfile(evt) {
  const currentEvt = evt;
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(currentEvt);
}

function openImage(evt) {
  const currentCard = evt.target.closest('.card');
  figureImage.src = evt.target.src;
  figureCaption.textContent = currentCard.querySelector('.card__title').textContent;
  openPopup(evt);
}

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup();
}

function cardFormSubmitHandler (evt) {
  evt.preventDefault();
  addCard(cardNameInput.value, cardLinkInput.value);
  cardLinkInput.value = '';
  cardNameInput.value = '';
  closePopup();
}
