export default class UserInfo {
  constructor( {nameSelector, jobSelector, avatarSelector} ) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Возвращает объект с данными профиля пользователя на странице
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  // Размещает указанные данные на странице
  // setUserInfo(inputData) {
  //   this._nameElement.textContent = inputData['profile-name'];
  //   this._jobElement.textContent = inputData['profile-description'];
  // }

  //
  setInitialUserInfo({name, job, avatar}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    if(avatar) {
      this._avatarElement.src = avatar;
      this._avatarElement.alt = `Фото ${name}`;
    }
  }



}
