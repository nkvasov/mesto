import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import {mestoFormsSet} from '../utils/mestoFormsSet.js';
import Api from '../components/Api.js';
import {
  cardsContainerSelector,
  profileEditBtn,
  profilePopupSelector,
  profileNameInput,
  profileJobInput,
  cardPopupSelector,
  addCardBtn,
  cardTemplateSelector,
  confirmationPopupSelector,
  profileSelectors,
  avatarPopupSelector,
  avatar
} from '../utils/constants.js';

import {
  enableValidation
} from '../utils/utils.js';

import './index.css';


// Создаем экземпляр класса PopupWithImage, и навешиваем слушателей
const figurePopup = new PopupWithImage('.image-popup');
figurePopup.setEventListeners();

// Объявляем переменные для экземпляров класса Section и UserInfo
let cardsSection;
let profileInfo;

// Функция создает экземпляр класса Card на основе входящих данных и размещает на страницу.
// Использует иннициализованные в index.js переменные, поэтому размещена здесь.
const renderCard = function(cardData, userId) {
  const card = new Card(cardData, {
    cardTemplateSelector: cardTemplateSelector,
    handleLikeClick: (cardId) => {
      return api.likeCard(cardId)
    },
    handleUnlikeClick: (cardId) => {
      return api.unlikeCard(cardId)
    },
    handleImageClick: (evt) => {
      figurePopup.open(evt);
    },
    handleTrashClick: () => {
      confirmationPopup.setSubmitHandler(card.getDeleteHandler());
      confirmationPopup.open(card);
    },
    handleCardDelete: (cardId) => {
      return api.deleteCard(cardId);
    },
    userId: userId
  });

  const cardElement = card.generateCard();
  cardsSection.addItem(cardElement);
}

// Создаем экземпляр класса PopupWithForm для попапа редактирования профиля и навешиваем слушателей
const profilePopup = new PopupWithForm( {
  popupSelector: profilePopupSelector,
  handleFormSubmit: (inputData) => {
    return api.patchUserInfo({
      name: inputData['profile-name'],
      about: inputData['profile-description']
    })
    .then((userData) => {
      profileInfo.setUserInfoToLayout({
        name: userData.name,
        job: userData.about
      });
    });
  }
} );
profilePopup.setEventListeners();

const avatarPopup = new PopupWithForm( {
  popupSelector: avatarPopupSelector,
  handleFormSubmit: (inputData) => {
    return api.patchAvatar({
      avatar: inputData['avatar-link']
    })
    .then((userData) => {
      profileInfo.setUserAvatarToLayout(userData.avatar);
    })
    .catch((err) => {
      console.log(err);
    });
  }
} );
avatarPopup.setEventListeners();

// Создаем экземпляр класса PopupWithForm для попапа добавления карточки и навешиваем слушателей
const cardPopup = new PopupWithForm( {
  popupSelector: cardPopupSelector,
  handleFormSubmit: (inputData) => {
    return api.postCard({
      name: inputData['card-name'],
      link: inputData['card-link']
    })
    .then((cardData) => {
      renderCard(cardData, profileInfo.getUserId());
    });
  }
} );
cardPopup.setEventListeners();

// Создаем попап подтверждения удаления карточки и навешиваем слушателей
const confirmationPopup = new PopupWithSubmit(confirmationPopupSelector);
confirmationPopup.setEventListeners();

// обработка нажатия кнопки Открытия попапа добавления карточки
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

// Обработка клика по аватару
avatar.addEventListener('click', () => {
  avatarPopup.open();
})

// Создаем экземпляр API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '4925288f-4ad5-4bea-a0ab-09ab5e2fc610',
    'Content-Type': 'application/json'
  }
});

// Запрашиваем у сервера данные пользователя и карточки. Размещаем на странице

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData,  initialCards]) => {
  // console.log(userData);
  profileInfo = new UserInfo(profileSelectors, userData);
  profileInfo.setUserInfoToLayout({
    name: userData.name,
    job: userData.about,
  });
  profileInfo.setUserAvatarToLayout(userData.avatar);
  cardsSection = new Section({
    items: initialCards,
    renderer: renderCard
  }, cardsContainerSelector);
  cardsSection.renderItems(profileInfo.getUserId());
})
.catch((err) => {
  console.log(err);
});


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


