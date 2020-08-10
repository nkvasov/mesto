
// Секция карточек на странице
export const cardsContainerSelector = '.cards__container';
export const cardTemplateSelector = '.card-template';

// Элементы попапа картинки
const figurePopup = document.querySelector('.image-popup');
export const figureCaption = figurePopup.querySelector('.figure__caption');
export const figureImage = figurePopup.querySelector('.figure__image');

// Элементы секции Профиль на странице
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__description';
const profile = document.querySelector('.profile');
export const profileEditBtn = profile.querySelector('.profile__edit-btn');
export const addCardBtn = profile.querySelector('.add-btn');

// Элементы попапа "Редактирование профиля"
export const profilePopupSelector = '.edit-profile-popup';
const profileForm = document.querySelector('[name="edit-profile"]');
export const profileNameInput = profileForm.querySelector('[name="profile-name"]');
export const profileJobInput = profileForm.querySelector('[name="profile-description"]');


// Элементы попапа "Добавление карточки"
export const cardPopupSelector = '.card-popup';
const cardForm = document.querySelector('[name="add-card"]');
export const cardNameInput = cardForm.querySelector('[name="card-name"]');
export const cardLinkInput = cardForm.querySelector('[name="card-link"]');
