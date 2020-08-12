export default class FormValidator {
  constructor(formSettings, formElement) {
    this._inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
    this._submitBtnElement = formElement.querySelector(formSettings.submitButtonSelector);
    this._inactiveBtnClass = formSettings.inactiveButtonClass;
    this._activeInputErrorClass = formSettings.activeInputErrorClass;
    this._inputErrorSelectorComponent = formSettings.inputErrorSelectorComponent;
    this._formElement = formElement;
    // Ищем в переданном массиве селектор кнопки, открывающей форму (по имени формы)
    const openBtnSelector = formSettings.openBtnSelectors.find((item) => item.formName === formElement.name).openBtnSelector;
    this._formOpenBtn = document.querySelector(openBtnSelector);
  }

  _getErrorElement(inputElement) {
    // Селектор ошибки складывается из неизменной строки и id поля ввода
    const errorSelector = `${this._inputErrorSelectorComponent}${inputElement.id}`;
    return this._formElement.querySelector(errorSelector);
  }

  // Методы показывают и скрывают сообщение об ошибке. Ошибка с полем ввода связаны через id поля и class элемента ошибки (так было сделано по замечанию ревьюера взамени использования родственных связей)
  _showError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._activeInputErrorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.classList.remove(this._activeInputErrorClass);
    errorElement.textContent = '';
  }

  // Проверяет валидность поля ввода и показывает/скрывает ошибку
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideError(inputElement);
    } else {
      this._showError(inputElement, inputElement.validationMessage);
    }
  }

// Возвращает true, если хотя бы одно из полей формы невалидно
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setFormListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._setButtonState(this._submitBtnElement);
      });
    });
  }

  // Добавляют/удаляют атрибут 'disabled' с элемента, если еще не добавлен/удален и добавляют/удаляют соответствующий класс, отвечающий за видимость
  _disableElement(element) {
    element.classList.add(this._inactiveBtnClass);
    if (!element.hasAttribute('disabled')) {
      element.setAttribute('disabled', true);
    }
  }

  _enableElement(element) {
    element.classList.remove(this._inactiveBtnClass);
    if (element.hasAttribute('disabled')) {
      element.removeAttribute('disabled');
    }
  }

  // Деактивирует или активирует кнопку submit в зависимости от наличия/отсутствия невалидного поля ввода в форме
  _setButtonState(buttonElement) {
    if (this._hasInvalidInput()) {
      this._disableElement(buttonElement);
    } else {
      this._enableElement(buttonElement);
    }
  }

  // Проверяет валидность формы: проверяет все поля, включает сообщения об ошибках, меняет состояние кнопки submit
  // (для проверки формы до начала работы с ней)
  _checkFormValidity() {
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
    this._setButtonState(this._submitBtnElement);
  }


  enableValidation() {
    this._setFormListeners();

    // Навешиваем слушатель на кнопку, открывающую форму:
    // он проверяет валидность формы до начала работы с ней (события input)
    this._formOpenBtn.addEventListener('click', () => {
      this._checkFormValidity();
    });
  }
}



