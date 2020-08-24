export default class UserInfo {
  constructor( {nameSelector, jobSelector, avatarSelector}, user ) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._user = user;
  }

  // Возвращает объект с данными профиля пользователя на странице
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
  }

  // Размещает указанные данные на странице
  setUserInfo({name, job}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.alt = `Аватар пользователя ${name}`;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  getUserId() {
    return this._user._id;
  }
}
