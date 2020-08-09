
// Секция карточек на странице
export const cardsContainerSelector = '.cards__container';
// export const cardsContainer = document.querySelector('.cards__container');
export const cardTemplateSelector = '.card-template';

// Элементы попапа картинки
const figurePopup = document.querySelector('.image-popup');
export const figureCaption = figurePopup.querySelector('.figure__caption');
export const figureImage = figurePopup.querySelector('.figure__image');


// Элементы секции Профиль на странице
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__description';
const profile = document.querySelector('.profile');
// export const profileName = profile.querySelector('.profile__name');
// export const profileJob = profile.querySelector('.profile__description');
export const profileEditBtn = profile.querySelector('.profile__edit-btn');
export const addCardBtn = profile.querySelector('.add-btn');

// Элементы попапа "Редактирование профиля"
export const profilePopupSelector = '.edit-profile-popup';
const profileForm = document.querySelector('[name="edit-profile"]');
// const profilePopup = profileForm.closest('.popup');
export const profileNameInput = profileForm.querySelector('[name="profile-name"]');
export const profileJobInput = profileForm.querySelector('[name="profile-description"]');


// Элементы попапа "Добавление карточки"
export const cardPopupSelector = '.card-popup';
const cardForm = document.querySelector('[name="add-card"]');
// const cardPopup = cardForm.closest('.popup');
export const cardNameInput = cardForm.querySelector('[name="card-name"]');
export const cardLinkInput = cardForm.querySelector('[name="card-link"]');

export const enableValidation = function(formSettings) {
  const forms = Array.from(document.querySelectorAll('.form'));
  forms.forEach((form) => {
    const formValidator = new FormValidator(formSettings, form);
    formValidator.enableValidation();
  });
}



// Данные Начального пользователя
// export const cousteau = {name: 'Жак-Ив Кусто', description: 'Исследователь океана', imageSrc: '#'};

