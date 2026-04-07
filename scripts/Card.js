export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClickCallback = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.cloneNode(true)
      .querySelector(".gallery__card");
  }

  _handleLikeClick() {
    this._likeButton.classList.toggle("gallery__card-like_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    this._handleImageClickCallback(this._name, this._link);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", () => this._handleDeleteClick());
    this._cardImage.addEventListener("click", () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".gallery__card-image");
    this._likeButton = this._element.querySelector(".gallery__card-like");
    this._deleteButton = this._element.querySelector(".gallery__card-delete");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".gallery__card-title").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
