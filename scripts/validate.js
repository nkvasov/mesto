const mesto = {
  // formSelector: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  // inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: '.form__input-error',
  errorClass: 'form__input-error_active',

  // добавил в объект свойства (имена форм и классы кнопок их открывающих)
  formName1: 'edit-profile',
  formBtnClass1: '.profile__edit-btn',
  formName2: 'add-card',
  formBtnClass2: '.add-btn',
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


// Проверяет валидность одного поля ввода и показывает/убирает сообщение об ошибке
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
  // setButtonState(formElement, submitBtnElement, page);
  returnInputList(formElement, page).forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, page);
      setButtonState(formElement, submitBtnElement, page);
    })
  })
}

// Проверяет валидность формы: проверяет все поля, включает сообщения об ошибках, меняет состояние кнопки submit
function checkFormValidity(formElement, page) {
  const submitBtnElement = formElement.querySelector(page.submitButtonSelector);
  returnInputList(formElement, page).forEach((inputElement) => {
    checkInputValidity(inputElement, page);
  })
  setButtonState(formElement, submitBtnElement, page);
}


function enableValidation(page) {
  const formList = Array.from(document.forms);
  const form1 = document.forms[page.formName1];
  const form2 = document.forms[page.formName2];
  const openBtn1 = document.querySelector(page.formBtnClass1);
  const openBtn2 = document.querySelector(page.formBtnClass2);

  formList.forEach((formElement) => {
    addFormListeners(formElement, page);
  })
  // Эти слушатели вешаются на кнопки открытия форм. Они проверяют валидность формы при каждом открытии.
  // И устанавливают правильное состояние кнопки submit и ошибок инпутов до события input.
  // Иначе при открытии формы могло остаться неправильное состояние элементов от события input при прошлом открытии, например при выходе через ESC
  openBtn1.addEventListener('click', () => {
    checkFormValidity(form1, page);
  })
  openBtn2.addEventListener('click', () => {
    checkFormValidity(form2, page);
  })
}

enableValidation(mesto);



