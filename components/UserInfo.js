export default class UserInfo {
  constructor( {nameSelector, jobSelector} ) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  setUserInfo(inputData) {
    this._nameElement.textContent = inputData['profile-name'];
    this._jobElement.textContent = inputData['profile-description'];
  }
}


// Функция возвращает объект с двумя свойствами для генерации карточки. Значения свойств вводятся пользователем.
// function getCardDataFromInput() {
//   return {
//     name: cardNameInput.value,
//     link: cardLinkInput.value,
//   };
// }


// Функция открывает попап редактирования профиля, предварительно заполняет поля значениями со страницы
// function editProfile() {
//   profileNameInput.value = profileName.textContent;
//   profileJobInput.value = profileJob.textContent;
//   openPopup(profilePopup);
// }

// Функция размещает введенные данные Профиля на страницу и закрывает форму.
// function profileFormSubmitHandler(evt) {
//   evt.preventDefault();
//   profileName.textContent = profileNameInput.value;
//   profileJob.textContent = profileJobInput.value;
//   closePopup(profilePopup);
// }
