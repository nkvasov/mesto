import FormValidator from '../components/FormValidator.js';
export const enableValidation = function(formSettings) {
  const forms = Array.from(document.querySelectorAll('.form'));
  forms.forEach((form) => {
    const formValidator = new FormValidator(formSettings, form);
    formValidator.enableValidation();
  });
}
