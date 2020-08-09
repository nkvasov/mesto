import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {mestoFormsSet} from '../utils/mestoFormsSet.js';
import {initialCards} from '../utils/initial-cards.js';
import {
  cardsContainerSelector,
  cardTemplateSelector,
  profileEditBtn,
  profilePopupSelector,
  profileNameSelector,
  profileJobSelector,
  profileNameInput,
  profileJobInput,
  cardPopupSelector,
  addCardBtn,
  cardNameInput,
  cardLinkInput
} from '../utils/constants.js';

import {enableValidation} from '../utils/utils.js';


const figurePopup = new PopupWithImage('.image-popup');
figurePopup.setEventListeners();


const cardRenderer = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector,  (evt) => {
    figurePopup.open(evt);
  });
  return card.generateCard();
}

// Создаем экземпляр класса Section, и заполняем страницу карточками
const cardsSection = new Section({items: initialCards, renderer: cardRenderer}, cardsContainerSelector);

cardsSection.renderItems();

// Создаем экземпляр класса UserInfo
new UserInfo( {
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector
} );

// Создаем попап редактирования профиля
const profilePopup = new PopupWithForm( {
  popupSelector: profilePopupSelector,
  handleFormSubmit: (inputData) => {
    profileInfo.setUserInfo(inputData);
  }
} );

profilePopup.setEventListeners();




// Функция открывает попап редактирования профиля, предварительно заполняет поля значениями со страницы
function editProfile() {
  const profileElementData = profileInfo.getUserInfo();
  profileNameInput.value = profileElementData.name;
  profileJobInput.value = profileElementData.job;
  profilePopup.open();
}

// обработка нажатия кнопки редактирования профиля
profileEditBtn.addEventListener('click', editProfile);

const cardPopup = new PopupWithForm( {
  popupSelector: cardPopupSelector,
  handleFormSubmit: () => {
    const cardData = {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    };
    const newCard = cardRenderer(cardData);
    document.querySelector('.cards__container').prepend(newCard);
  }
} );

cardPopup.setEventListeners();

// обработка нажатия кнопки Добавления карточки
addCardBtn.addEventListener('click', () => {
  cardPopup.open();
});



enableValidation(mestoFormsSet);


// Создает новую карточку и добавляет в указанное место
// function addCard(container, cardData) {
//   const card = new Card(cardData, '.card-template');
//   const cardElement = card.generateCard();
//   container.prepend(cardElement);
// }

// Функция запускает создание новой карточки на основе введенных данных, размещает карточку на странице и закрывает форму.
// function cardFormSubmitHandler(evt) {
//   evt.preventDefault();
//   const cardData = getCardDataFromInput();
//   addCard(cardsContainer, cardData);
//   closePopup(cardPopup);
// }


// Функция возвращает объект с двумя свойствами для генерации карточки. Значения свойств вводятся пользователем.
function getCardDataFromInput() {
  return {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
}

