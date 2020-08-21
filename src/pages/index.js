import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import {mestoFormsSet} from '../utils/mestoFormsSet.js';
// import {initialCards} from '../utils/initial-cards.js';
import Api from '../components/Api.js';
import {
  cardsContainerSelector,
  profileEditBtn,
  profilePopupSelector,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
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

// Объявляем переменную для экземпляра класса Section
let cardsSection;

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
  jobSelector: profileJobSelector,
  avatarSelector: profileAvatarSelector
} );

// Создаем экземпляр класса PopupWithForm для попапа редактирования профиля и навешиваем слушателей
const profilePopup = new PopupWithForm( {
  popupSelector: profilePopupSelector,
  handleFormSubmit: (inputData) => {
    profileInfo.setInitialUserInfo({
      name: inputData['profile-name'],
      job: inputData['profile-description']
    });
    api.patchUserInfo({
      name: inputData['profile-name'],
      about: inputData['profile-description']
    });
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
// (данные в поля ввода подставляются со страницы)
profileEditBtn.addEventListener('click', () => {
  const profileElementData = profileInfo.getUserInfo();
  profileNameInput.value = profileElementData.name;
  profileJobInput.value = profileElementData.job;
  profilePopup.open();
});

// Создаем экземпляр API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '4925288f-4ad5-4bea-a0ab-09ab5e2fc610',
    'Content-Type': 'application/json'
  }
});

// Запрашиваем у сервера данные пользователя и размещаем на странице
api.getUserInfo()
.then((userData) => {
  console.log(userData);
  profileInfo.setInitialUserInfo({
    name: userData.name,
    job: userData.about,
    avatar: userData.avatar
  });
})

// Запрашиваем у сервера карточки и размещаем на странице
api.getInitialCards()
.then((initialCards) => {
  cardsSection = new Section({
    items: initialCards,
    renderer: renderCard
  }, cardsContainerSelector);
  cardsSection.renderItems();
});




// Создаем экземпляр класса Section, и заполняем страницу карточками
// const cardsSection = new Section({
//   items: [initialCards],
//   renderer: renderCard
// }, cardsContainerSelector);

// cardsSection.renderItems();

// Включаем валидацию
enableValidation(mestoFormsSet);




// Токен: 4925288f-4ad5-4bea-a0ab-09ab5e2fc610
// Идентификатор группы: cohort-14


