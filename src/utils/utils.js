import FormValidator from '../components/FormValidator.js';
// import {
//   cardNameInput,
//   cardLinkInput
// } from './constants.js';

// Функция включает валидацию для всех форм в документе
export const enableValidation = function(formSettings) {
  const forms = Array.from(document.querySelectorAll('.form'));
  forms.forEach((form) => {
    const formValidator = new FormValidator(formSettings, form);
    formValidator.enableValidation();
  });
}

// Функция возвращает объект с двумя свойствами для генерации карточки. Значения свойств вводятся пользователем.
// export const getCardDataFromInput = function() {
//   return {
//     name: cardNameInput.value,
//     link: cardLinkInput.value,
//   };
// }


