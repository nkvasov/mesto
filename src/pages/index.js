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
  avatar,
  avatarLinkInput
} from '../utils/constants.js';

import {
  enableValidation
} from '../utils/utils.js';

import './index.css';




// Объявляем переменные для экземпляров класса Section и UserInfo
// Либо весь код нужно разместить внутри Promise.All, и объявить их как константы при создании
let cardsSection;
let profileInfo;

// Создаем экземпляр API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '4925288f-4ad5-4bea-a0ab-09ab5e2fc610',
    'Content-Type': 'application/json'
  }
});

// Функция создает экземпляр класса Card на основе входящих данных и размещает на страницу.
// Используется как колбэк для экземпляра Section
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
      confirmationPopup.setSubmitHandler(card.getActionToConfirm(card));
      confirmationPopup.open();
    },
    handleCardDelete: (cardId) => {
      return api.deleteCard(cardId);
    },
    userId: userId
  });

  const cardElement = card.generateCard();
  cardsSection.addItem(cardElement);
}

// Запрашиваем у сервера данные пользователя и карточки. Размещаем на странице

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData,  initialCards]) => {
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


// попап Картинки
const figurePopup = new PopupWithImage('.image-popup');
figurePopup.setEventListeners();

// попап Редактирования профиля

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

// попап Редактрования аватара

const avatarPopup = new PopupWithForm( {
  popupSelector: avatarPopupSelector,
  handleFormSubmit: (inputData) => {
    return api.patchAvatar({
      avatar: inputData['avatar-link']
    })
    .then((userData) => {
      profileInfo.setUserAvatarToLayout(userData.avatar);
    });
  }
} );
avatarPopup.setEventListeners();

// попап Добавления карточки

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

// попап Подтверждения удаления карточки

const confirmationPopup = new PopupWithSubmit(confirmationPopupSelector);
confirmationPopup.setEventListeners();

// кнопка, открывающая Попап добавления карточки

addCardBtn.addEventListener('click', () => {
  cardPopup.open();
});

// кнопка, открывающая попап Редактирования профиля
// (данные в поля ввода подставляются со страницы)
profileEditBtn.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  profileNameInput.value = userInfo.name;
  profileJobInput.value = userInfo.job;
  profilePopup.open();
});

// Обработка клика по аватару
avatar.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  avatarLinkInput.value = userInfo.avatar;
  avatarPopup.open();
})

// Включаем валидацию
enableValidation(mestoFormsSet);




// Токен: 4925288f-4ad5-4bea-a0ab-09ab5e2fc610
// Идентификатор группы: cohort-14
