// =====================
// Selección de elementos del DOM
// =====================
const openFormButton = document.querySelector(".profile__info-edit-button"); // Botón para abrir el popup de edición de perfil
const addButton = document.querySelector(".profile__info-add-button"); // Botón para abrir el popup de agregar lugar
const popup = document.querySelector(".popup"); // Contenedor principal del popup
const closeButton = popup.querySelector(".popup__close-button"); // Botón para cerrar el popup
const profileName = document.querySelector(".profile__info-name"); // Elemento que muestra el nombre del perfil
const profileDescription = document.querySelector(".profile__info-description"); // Elemento que muestra la descripción del perfil
const inputName = document.querySelector(".popup__form-field-name"); // Input para el nombre en el formulario de edición
const inputDescription = document.querySelector(
  ".popup__form-field-description"
); // Input para la descripción en el formulario de edición
const form = document.querySelector(".popup__form"); // Formulario de edición de perfil
const addForm = document.querySelector(".popup__add-form"); // Formulario para agregar un nuevo lugar
const popupEditContainer = document.querySelector(".popup__container-edit"); // Contenedor del formulario de edición
const popupAddContainer = document.querySelector(".popup__container-add"); // Contenedor del formulario de agregar
const gallery = document.querySelector(".gallery"); // Lista de tarjetas en la galería

// =====================
// Tarjetas iniciales
// =====================
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

// =====================
// Funciones para abrir popups
// =====================
function openEditForm() {
  popup.classList.add("popup_visible");
  popupEditContainer.style.display = "block";
  popupAddContainer.style.display = "none";
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function openAddForm() {
  popup.classList.add("popup_visible");
  popupEditContainer.style.display = "none";
  popupAddContainer.style.display = "block";
  addForm.reset();
}

// =====================
// Funciones para cerrar popups
// =====================
function closePopupByButton() {
  popup.classList.remove("popup_visible");
}

function closePopupByOverlay(evt) {
  if (evt.target === popup) {
    popup.classList.remove("popup_visible");
  }
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    popup.classList.remove("popup_visible");
  }
}

function addCard(name, link) {
  // Crea y agrega la nueva tarjeta
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".gallery__card-image").src = link;
  cardElement.querySelector(".gallery__card-image").alt = name;
  cardElement.querySelector(".gallery__card-title").textContent = name;
  gallery.prepend(cardElement);
}

// =====================
// Funciones de manejo de formularios
// =====================
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.remove("popup_visible");
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  // Usar los selectores correctos según el HTML
  const name = addForm.querySelector(".popup__add-form-field-title").value;
  const link = addForm.querySelector(".popup__add-form-field-image").value;
  addCard(name, link);
  popup.classList.remove("popup_visible");
  addForm.reset();
}

// =====================
// Asignación de eventos
// =====================
openFormButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", openAddForm);
closeButton.addEventListener("click", closePopupByButton);
popup.addEventListener("click", closePopupByOverlay);
document.addEventListener("keydown", closePopupByEsc);
form.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);
