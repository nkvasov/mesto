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
  cardTemplateSelector,
  confirmationPopupSelector
} from '../utils/constants.js';

import {
  enableValidation,
  // getCardDataFromInput
} from '../utils/utils.js';

import './index.css';


// Создаем экземпляр класса PopupWithImage, и навешиваем слушателей
const figurePopup = new PopupWithImage('.image-popup');
figurePopup.setEventListeners();

// Объявляем переменную для экземпляра класса Section
let cardsSection;
let profileInfo;

// Функция создает экземпляр класса Card на основе входящих данных и размещает на страницу.
// Использует иннициализованные в index.js переменные, поэтому размещена здесь.
const renderCard = function(cardData) {
  // console.log(cardData);
  const card = new Card(cardData, cardTemplateSelector,  (evt) => {
    figurePopup.open(evt);
  }, profileInfo.getUserId());
  const cardElement = card.generateCard();
  cardsSection.addItem(cardElement);
}

// Создаем экземпляр класса UserInfo
// const profileInfo = new UserInfo( {
//   nameSelector: profileNameSelector,
//   jobSelector: profileJobSelector,
//   avatarSelector: profileAvatarSelector
// } );

// Создаем экземпляр класса PopupWithForm для попапа редактирования профиля и навешиваем слушателей
const profilePopup = new PopupWithForm( {
  popupSelector: profilePopupSelector,
  handleFormSubmit: (inputData) => {
    api.patchUserInfo({
      name: inputData['profile-name'],
      about: inputData['profile-description']
    })
    .then(() => {
      profileInfo.setUserInfo({
        name: inputData['profile-name'],
        job: inputData['profile-description']
      });
    });
  }
} );
profilePopup.setEventListeners();

// Создаем экземпляр класса PopupWithForm для попапа добавления карточки и навешиваем слушателей
const cardPopup = new PopupWithForm( {
  popupSelector: cardPopupSelector,
  handleFormSubmit: (inputData) => {
    api.postCard({
      name: inputData['card-name'],
      link: inputData['card-link']
    })
    .then(() => {
      renderCard({
        name: inputData['card-name'],
        link: inputData['card-link']
      });
    });
  }
} );
cardPopup.setEventListeners();

// Создаем попап подтверждения удаления карточки
const confirmationPopup = new PopupWithForm( {
  popupSelector: confirmationPopupSelector,
  handleFormSubmit: () => {
    console.log('fire');
  }
});

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

  profileInfo = new UserInfo( {
    nameSelector: profileNameSelector,
    jobSelector: profileJobSelector,
    avatarSelector: profileAvatarSelector
  }, userData);

  profileInfo.setUserInfo({
    name: userData.name,
    job: userData.about,
  });
  profileInfo.setUserAvatar(userData.avatar);
})
// Запрашиваем у сервера карточки и размещаем на странице
.then(() => {
  api.getInitialCards()
  .then((initialCards) => {
    cardsSection = new Section({
      items: initialCards,
      renderer: renderCard
    }, cardsContainerSelector);
    cardsSection.renderItems();
  });
})
.catch((err) => {
  console.log(err);
});


// Запрашиваем у сервера карточки и размещаем на странице
// api.getInitialCards()
// .then((initialCards) => {
//   cardsSection = new Section({
//     items: initialCards,
//     renderer: renderCard
//   }, cardsContainerSelector);
//   cardsSection.renderItems();
// });




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


// owner:
// about: "в тумане"
// avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
// cohort: "cohort-14"
// name: "Ёжик"
// _id: "ba37387273f60dba93dd8938"


