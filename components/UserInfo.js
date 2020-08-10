export default class UserInfo {
  constructor( {nameSelector, jobSelector} ) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  // Возвращает объект с данными профиля пользователя на странице
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  // Размещает указанные данные на странице
  setUserInfo(inputData) {
    this._nameElement.textContent = inputData['profile-name'];
    this._jobElement.textContent = inputData['profile-description'];
  }
}
