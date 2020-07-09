function enableValidation(validationSet) {

}

function showError(inputElement, errorMessage) {
  // лучше так, или можно через 'nextElementSibling', как в функции hideError
  const errorElement = inputElement.parentElement.querySelector('.form__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

function hideError(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function toggleButtonState(buttonElement) {
  buttonElement.classList.toggle('button_inactive');
}

// Проверяет валидность одного поля ввода
function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideError(inputElement);
  } else {
    showError(inputElement, inputElement.validationMessage);
  }
}


// Массив полей ввода некоторого объекта
function returnInputList(element) {
  return Array.from(element.querySelectorAll('.form__input'));
}

// Навешивает валидирующих слушателей на инпуты формы
function addFormListeners(formElement) {
  const submitBtnElement = formElement.querySelector('.form__submit-btn');
  returnInputList(formElement).forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      setButtonState(formElement, submitBtnElement);
    })
  })
}

// function isValid(element) {
//   element.validity.valid;
// }

// Возвращает true, если хотя бы одно из полей невалидно
function hasInvalidInput(formElement) {
  const inputList = returnInputList(formElement);
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// Добавляют/удаляют атрибут 'disabled' с элемента, если еще не добавлен/удален
function disableElement(element) {
  if (!element.hasAttribute('disabled')) {
    element.setAttribute('disabled', true);
  }
}

function enableElement(element) {
  if (element.hasAttribute('disabled')) {
    element.removeAttribute('disabled');
  }
}

// Деактивирует или активирует кнопку Submit в зависимости от наличия/отсутствия невалидного поля ввода в форме
function setButtonState(formElement, buttonElement) {
  if (hasInvalidInput(formElement)) {
    disableElement(buttonElement);
  } else {
    enableElement(buttonElement);
  }
}


// addFormListeners(profileForm);
// addFormListeners(cardForm);


const mesto = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function enableValidation() {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    addFormListeners(formElement);
  })
}

enableValidation();




