const mesto = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active',

  // имена форм и классы кнопок их открывающих)
  formName1: 'edit-profile',
  formBtnClass1: '.profile__edit-btn',
  formName2: 'add-card',
  formBtnClass2: '.add-btn',
}

function showError(inputElement, errorMessage, page) {
  const formElement = inputElement.closest(page.formSelector);
  const errorElement = formElement.querySelector(`.form__input-error_origin_${inputElement.id}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(page.errorClass);
}

function hideError(inputElement, page) {
  const formElement = inputElement.closest(page.formSelector);
  const errorElement = formElement.querySelector(`.form__input-error_origin_${inputElement.id}`);
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

// Добавляют/удаляют атрибут 'disabled' с элемента, если еще не добавлен/удален и добавляют/удаляют соответствующий класс
function disableElement(element, page) {
  element.classList.add(page.inactiveButtonClass);
  if (!element.hasAttribute('disabled')) {
    element.setAttribute('disabled', true);
  }
}

function enableElement(element, page) {
  element.classList.remove(page.inactiveButtonClass);
  if (element.hasAttribute('disabled')) {
    element.removeAttribute('disabled');
  }
}

// Деактивирует или активирует кнопку Submit в зависимости от наличия/отсутствия невалидного поля ввода в форме
function setButtonState(formElement, buttonElement, page) {
  if (hasInvalidInput(formElement, page)) {
    disableElement(buttonElement, page);
  } else {
    enableElement(buttonElement, page);
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
  // Массив форм страницы
  const formList = Array.from(document.querySelectorAll(page.formSelector));
  // Навешиваем в цикле функции, проверяющие валидность форм во время работы с ними
  formList.forEach((formElement) => {
    addFormListeners(formElement, page);
  })

  // Переменные ниже создаются на основе данных, полученных от объекта 'page'.
  // Связь между формой и кнопкой, которая ее открывает, строится на основе этих данных
  // (page.formName1 соответствует page.formBtnClass1 и т.д.).
  const form1 = document.forms[page.formName1];
  const form2 = document.forms[page.formName2];
  const openBtn1 = document.querySelector(page.formBtnClass1);
  const openBtn2 = document.querySelector(page.formBtnClass2);

  //  Эти слушатели обеспечивают открытие формы в валидном состоянии
  openBtn1.addEventListener('click', () => {
    checkFormValidity(form1, page);
  })
  openBtn2.addEventListener('click', () => {
    checkFormValidity(form2, page);
  })
}

enableValidation(mesto);



