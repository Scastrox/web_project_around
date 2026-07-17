export default class Card {
  constructor(data, templateSelector, userId, { handleCardClick, handleLikeClick, handleDeleteClick }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._ownerId = data.owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.cloneNode(true)
      .querySelector(".gallery__card");
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._likeButton.classList.toggle("gallery__card-like_active", isLiked);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick(this));
    this._deleteButton.addEventListener("click", () => this._handleDeleteClick(this));
    this._cardImage.addEventListener("click", () => this._handleCardClick(this._name, this._link));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".gallery__card-image");
    this._likeButton = this._element.querySelector(".gallery__card-like");
    this._deleteButton = this._element.querySelector(".gallery__card-delete");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".gallery__card-title").textContent = this._name;

    this.setLikeStatus(this._isLiked);
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();
    return this._element;
  }
}
