const mesto = {
  // formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  // inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.form__input-error',
  errorClass: 'form__input-error_active'
}

function showError(inputElement, errorMessage, page) {
  // надёжнее так выбрать errorElement, или можно через 'nextElementSibling', как в функции hideError
  const errorElement = inputElement.parentElement.querySelector(page.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(page.errorClass);
}

function hideError(inputElement, page) {
  // как здесь
  const errorElement = inputElement.nextElementSibling;
  errorElement.classList.remove(page.errorClass);
  errorElement.textContent = '';
}

// function toggleButtonState(buttonElement) {
//   buttonElement.classList.toggle('button_inactive');
// }

// Проверяет валидность одного поля ввода
function checkInputValidity(inputElement, page) {
  if (inputElement.validity.valid) {
    hideError(inputElement, page);
  } else {
    showError(inputElement, inputElement.validationMessage, page);
  }
}

// Массив полей ввода некоторого объекта
function returnInputList(element, page) {
  return Array.from(element.querySelectorAll(page.inputSelector));
}



// Возвращает true, если хотя бы одно из полей формы невалидно
function hasInvalidInput(formElement, page) {
  const inputList = returnInputList(formElement, page);
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
function setButtonState(formElement, buttonElement, page) {
  if (hasInvalidInput(formElement, page)) {
    disableElement(buttonElement);
  } else {
    enableElement(buttonElement);
  }
}

// Навешивает валидирующих слушателей на инпуты формы
function addFormListeners(formElement, page) {
  const submitBtnElement = formElement.querySelector(page.submitButtonSelector);
  returnInputList(formElement, page).forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, page);
      setButtonState(formElement, submitBtnElement, page);
    })
  })
}



function enableValidation(page) {
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    addFormListeners(formElement, page);
  })
}

enableValidation(mesto);




