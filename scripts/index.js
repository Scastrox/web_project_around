const openFormButton = document.querySelector(".profile__info-edit-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");

function toggleForm() {
  popup.classList.toggle("popup_visible");
}

openFormButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);
