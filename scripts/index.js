const openFormButton = document.querySelector(".profile__info-edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const inputName = document.querySelector(".popup__form-field-name");
const inputDescription = document.querySelector(
  ".popup__form-field-description"
);
const form = document.querySelector(".popup__form");

function toggleForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popup.classList.toggle("popup_visible");
}

openFormButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.remove("popup_visible");
}

form.addEventListener("submit", handleProfileFormSubmit);
