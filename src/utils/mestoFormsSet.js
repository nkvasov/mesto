export const mestoFormsSet = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input-error',
  activeInputErrorClass: 'form__input-error_active',
  inputErrorSelectorComponent: '.form__input-error_origin_',

  // имена форм и селекторы кнопок их открывающих передаем как массив объектов
  openBtnSelectors: [
    {
      formName: 'edit-profile',
      openBtnSelector: '.profile__edit-btn',
    },
    {
      formName: 'add-card',
      openBtnSelector: '.add-btn',
    },
    {
      formName: 'update-avatar',
      openBtnSelector: '.profile__avatar'
    }
  ]
};
