import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initial-cards.js';
import {mestoFormsSet} from './mestoFormsSet.js';
import {openPopup, closePopup, closeOnOverlayClick} from './popupHandlers.js';

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

// Секция карточек на странице
const cardsContainer = document.querySelector('.cards__container');

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
  };
}

// Создает новую карточку и добавляет в указанное место
function addCard(container, cardData) {
  const card = new Card(cardData, '.card-template');
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

// Функция запускает создание новой карточки на основе введенных данных, размещает карточку на странице и закрывает форму.
function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardData = getCardDataFromInput();
  addCard(cardsContainer, cardData);
  closePopup(cardPopup);
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

// заполняем секцию карточками
initialCards.forEach((cardData) => {
  addCard(cardsContainer, cardData);
});

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

setPopupListeners();

function enableValidation(formSettings) {
  const forms = Array.from(document.querySelectorAll('.form'));
  forms.forEach((form) => {
    const formValidator = new FormValidator(formSettings, form);
    formValidator.enableValidation();
  });
}

enableValidation(mestoFormsSet);

