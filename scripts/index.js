import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, handleOverlayClick, handleEscClose } from "./utils.js";

// Configuración de validación
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-field-input-type-error",
  errorClass: "popup__form-field-input-error-visible",
};

// Selección de elementos del DOM
const openFormButton = document.querySelector(".profile__info-edit-button");
const addButton = document.querySelector(".profile__info-add-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const inputName = document.querySelector(".popup__form-field-name");
const inputDescription = document.querySelector(".popup__form-field-description");
const form = document.querySelector(".popup__form");
const addForm = document.querySelector(".popup__add-form");
const popupEditContainer = document.querySelector(".popup__container-edit");
const popupAddContainer = document.querySelector(".popup__container-add");
const gallery = document.querySelector(".gallery");
const imagePopup = document.querySelector(".popup__image");
const imagePopupPhoto = document.querySelector(".popup__image-photo");
const imagePopupText = document.querySelector(".popup__image-text");

// Tarjetas iniciales
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

// Instancias de FormValidator para cada formulario
const profileFormValidator = new FormValidator(validationConfig, form);
const addFormValidator = new FormValidator(validationConfig, addForm);
profileFormValidator.setEventListeners();
addFormValidator.setEventListeners();

// Funciones para abrir popups
function openEditForm() {
  openPopup(popup);
  popupEditContainer.style.display = "block";
  popupAddContainer.style.display = "none";
  imagePopup.style.display = "none";
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function openAddForm() {
  openPopup(popup);
  popupEditContainer.style.display = "none";
  imagePopup.style.display = "none";
  popupAddContainer.style.display = "block";
  addFormValidator.resetValidation();
}

function openImage(name, link) {
  imagePopupPhoto.src = link;
  imagePopupPhoto.alt = name;
  imagePopupText.textContent = name;
  openPopup(popup);
  imagePopup.style.display = "block";
  popupEditContainer.style.display = "none";
  popupAddContainer.style.display = "none";
}

// Función para cerrar el popup y resetear validaciones
function handleClosePopup() {
  closePopup(popup);
  profileFormValidator.resetValidation();
  addFormValidator.resetValidation();
}

// Función para crear una tarjeta usando la clase Card
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", openImage);
  return card.generateCard();
}

// Función para agregar una tarjeta a la galería
function addCard(name, link) {
  gallery.prepend(createCard({ name, link }));
}

// Funciones de manejo de formularios
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  handleClosePopup();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = addForm.querySelector(".popup__add-form-field-title").value.trim();
  const link = addForm.querySelector(".popup__add-form-field-image").value.trim();
  if (!name || !link) return;
  addCard(name, link);
  handleClosePopup();
}

// Asignación de eventos
openFormButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", openAddForm);
closeButton.addEventListener("click", handleClosePopup);
popup.addEventListener("click", (evt) => handleOverlayClick(evt, popup, handleClosePopup));
document.addEventListener("keydown", (evt) => handleEscClose(evt, handleClosePopup));
form.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);

// Crear las tarjetas iniciales al cargar la página
initialCards.forEach((cardData) => {
  gallery.prepend(createCard(cardData));
});
