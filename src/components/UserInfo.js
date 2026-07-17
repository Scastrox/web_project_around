export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  getUserId() {
    return this._id;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    if (avatar) {
      this.setAvatar(avatar);
    }
    if (_id) {
      this._id = _id;
    }
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
