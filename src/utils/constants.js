
// Секция карточек на странице
export const cardsContainerSelector = '.cards__container';
export const cardTemplateSelector = '.card-template';

// Элементы секции Профиль на странице
const profile = document.querySelector('.profile');
export const profileEditBtn = profile.querySelector('.profile__edit-btn');
export const addCardBtn = profile.querySelector('.add-btn');
export const avatar = profile.querySelector('.profile__avatar');
// Селекторы секции профиль на странице
export const profileSelectors = {
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
};

// Элементы попапа "Редактирование профиля"
export const profilePopupSelector = '.edit-profile-popup';
const profileForm = document.querySelector('[name="edit-profile"]');
export const profileNameInput = profileForm.querySelector('[name="profile-name"]');
export const profileJobInput = profileForm.querySelector('[name="profile-description"]');


// Элементы попапа "Добавление карточки"
export const cardPopupSelector = '.card-popup';
const cardForm = document.querySelector('[name="add-card"]');
// export const cardNameInput = cardForm.querySelector('[name="card-name"]');
// export const cardLinkInput = cardForm.querySelector('[name="card-link"]');

// Селектор попапа "Подтверждение удаления карточки"
export const confirmationPopupSelector = '.confirmation-popup';

// Селектор попапа "Обновление аватара"
export const avatarPopupSelector = '.update-avatar-popup';

