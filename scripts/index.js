// Из чеклиста для самопроверки:
// DOM-элементы, к которым есть обращение в скрипте, вынесены в константы.

const profile = document.querySelector('.profile'); // секция Профиль
const profileName = profile.querySelector('.profile__name'); // имя профиля на странице
const profileJob = profile.querySelector('.profile__description'); // описание профиля на странице
const profileEditBtn = profile.querySelector('.profile__edit-btn'); // кнопка редактирования профиля
const addCardBtn = profile.querySelector('.add-btn'); // кнопка добавления карточки


const editProfilePopup = document.querySelector('.edit-profile-popup'); // попап профиля
// const editProfileForm = editProfilePopup.querySelector('.popup__container'); // форма попапа
const editProfileForm = document.forms['edit-profile']; // форма попапа
const editProfileCloseBtn = editProfileForm.elements.close; // кнопка закрытия попапа
const editProfileNameInput = editProfileForm.querySelector('.popup__name-input'); // поле ввода имени Профиля
const editProfileJobInput = editProfileForm.querySelector('.popup__job-input'); // поле ввода описания Профиля

const addCardPopup = document.querySelector('.add-card-popup'); // попап добавления карточки ???
const addCardForm = document.forms['add-card']; // форма добавления карточки

const cardsContainer = document.querySelector('.cards__container'); // секция карточек
// массив карточек
const initialCards = [
  {
      name: 'Архыз ',
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
      name: 'Камчатка',
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

// editProfileCloseBtn.addEventListener('click', popupToggle); // обработка нажатия кнопки "Закрыть" попап
editProfileCloseBtn.addEventListener('click', currentPopupToggle); // обработка нажатия кнопки "Закрыть" попап

editProfileForm.addEventListener('submit', formSubmitHandler); // обработка нажатия кнопки "Cохранить" попап или клавиши Enter

addCardBtn.addEventListener('click', currentPopupToggle);



function addCard(cardTitle, cardLink) {
  const newCard = document.querySelector('.card-template').content.cloneNode(true); // клонируем разметку для карточки
  newCard.querySelector('.card__title').textContent = cardTitle; // заполняем заголовок карточки
  newCard.querySelector('.card__image').src = cardLink; // линк на имидж
  newCard.querySelector('.card__image').alt = 'фото ' + cardTitle ;
  addCardListeners(newCard);
  cardsContainer.prepend(newCard); // добавляем в начало списка
}


function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function toggleLikeCard(evt) {
  evt.target.classList.toggle('card__like-btn_enabled');
}

function openImagePopup(evt) {
  console.log('open');
}

function addCardListeners(card) {
  card.querySelector('.card__trash-btn').addEventListener('click', deleteCard);
  card.querySelector('.card__like-btn').addEventListener('click', toggleLikeCard);
  card.querySelector('.card__image').addEventListener('click', openImagePopup);
}

function openImagePopup(evt) {
  const card = evt.target.closest('.card');
  const imagePopup = document.querySelector('.image-popup-template').content.cloneNode(true);
  imagePopup.querySelector('.image-popup__image').src = evt.target.src;
  imagePopup.querySelector('.image-popup__image').alt = evt.target.alt;
  imagePopup.querySelector('.image-popup__caption').textContent = card.querySelector('.card__title').textContent;
  imagePopup.querySelector('.image-popup__close-btn').addEventListener('click', () => {
    document.querySelector('.image-popup').remove();
  });
  document.querySelector('.content').append(imagePopup);
  // let width = document.querySelector('.image-popup__image').offsetWidth;
  // console.log(width);
  // document.querySelector('.image-popup__caption').style.width = `${width}px`;
  // console.log(document.querySelector('.image-popup__caption').offsetWidth);
}

// function popupToggle(evt) {
//   evt.target.closest('.popup').classList.toggle('popup_opened');
// }


function popupToggle1(popup) {
  popup.classList.toggle('popup_opened');
}


function returnCurrentPopup(evt) {
  if (evt.target === profileEditBtn || evt.target === editProfileCloseBtn || evt.target === editProfileForm) {
    return editProfilePopup;
  } else if (evt.target === addCardBtn) {
    return addCardPopup;
  }
}

function currentPopupToggle(evt) {
  const currentEvent = evt;
  popupToggle1(returnCurrentPopup(currentEvent));
}


function editProfile(evt) {
  const currentEvt = evt;
  editProfileNameInput.value = profileName.textContent;
  editProfileJobInput.value = profileJob.textContent;
  currentPopupToggle(currentEvt);
}

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
    const currentEvt = evt;
    profileName.textContent = editProfileNameInput.value;
    profileJob.textContent = editProfileJobInput.value;
    currentPopupToggle(currentEvt);
}



// function popupToggle(evt) {
//   let currentPopup;
//   switch (evt.target) {
//     case addCardBtn:
//       currentPopup = addCardPopup;
//       break;
//     case profileEditBtn:
//       currentPopup = editProfilePopup;
//       break;
//     case editProfileCloseBtn:
//       currentPopup = editProfilePopup;
//       break;
//     case editProfileForm:
//       currentPopup = editProfilePopup;
//   }
//   currentPopup.classList.toggle('popup_opened');
// }
// ______________________________________

