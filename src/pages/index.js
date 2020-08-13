import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import {mestoFormsSet} from '../utils/mestoFormsSet.js';
import {initialCards} from '../utils/initial-cards.js';
import {
  cardsContainerSelector,
  profileEditBtn,
  profilePopupSelector,
  profileNameSelector,
  profileJobSelector,
  profileNameInput,
  profileJobInput,
  cardPopupSelector,
  addCardBtn,
  cardTemplateSelector
} from '../utils/constants.js';

import {
  enableValidation,
  getCardDataFromInput
} from '../utils/utils.js';

import './index.css';


// Создаем экземпляр класса PopupWithImage, и навешиваем слушателей
const figurePopup = new PopupWithImage('.image-popup');
figurePopup.setEventListeners();

// Функция создает экземпляр класса Card на основе входящих данных и размещает на страницу.
// Использует иннициализованные в index.js переменные, поэтому размещена здесь.
const renderCard = function(cardData) {
  const card = new Card(cardData, cardTemplateSelector,  (evt) => {
    figurePopup.open(evt);
  });
  const cardElement = card.generateCard();
  cardsSection.addItem(cardElement);
}

// Создаем экземпляр класса UserInfo
const profileInfo = new UserInfo( {
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector
} );

// Создаем экземпляр класса PopupWithForm для попапа редактирования профиля и навешиваем слушателей
const profilePopup = new PopupWithForm( {
  popupSelector: profilePopupSelector,
  handleFormSubmit: (inputData) => {
    profileInfo.setUserInfo(inputData);
  }
} );
profilePopup.setEventListeners();

// Создаем экземпляр класса PopupWithForm для попапа добавления карточки и навешиваем слушателей
const cardPopup = new PopupWithForm( {
  popupSelector: cardPopupSelector,
  handleFormSubmit: () => {
    const cardData = getCardDataFromInput();
    renderCard(cardData);
  }
} );
cardPopup.setEventListeners();

// обработка нажатия кнопки Открытия попапа карточки
addCardBtn.addEventListener('click', () => {
  cardPopup.open();
});

// обработка нажатия кнопки редактирования профиля
profileEditBtn.addEventListener('click', () => {
  const profileElementData = profileInfo.getUserInfo();
  profileNameInput.value = profileElementData.name;
  profileJobInput.value = profileElementData.job;
  profilePopup.open();
});

// Создаем экземпляр класса Section, и заполняем страницу карточками
const cardsSection = new Section({
  items: initialCards,
  renderer: renderCard
}, cardsContainerSelector);

cardsSection.renderItems();

// Включаем валидацию
enableValidation(mestoFormsSet);



