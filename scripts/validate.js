const mesto = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active',

  // имена форм и селекторы кнопок их открывающих передаем как массив объектов
  formsData: [
    {
      name: 'edit-profile',
      openBtnSelector: '.profile__edit-btn',
    },
    {
      name: 'add-card',
      openBtnSelector: '.add-btn',
    }
  ]
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
  // перебираем переданный массив с данными о формах
  page.formsData.forEach((formData) => {
    const form = document.querySelector(`[name=${formData.name}]`);
    const openBtn = document.querySelector(formData.openBtnSelector);
    // На каждую форму навешиваем слушателей, которые проверяют валидность во время работы с формой
    addFormListeners(form, page);
    // Навешиваем слушатель на кнопку, открывающую форму:
    // он проверяет валидность формы до начала работы с ней (события input)
    openBtn.addEventListener('click', () => {
      checkFormValidity(form, page);
    })
  })

}

enableValidation(mesto);



