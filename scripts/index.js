// Selección de elementos del DOM
const openFormButton = document.querySelector(".profile__info-edit-button");
const addButton = document.querySelector(".profile__info-add-button");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__info-name");
const profileDescription = document.querySelector(".profile__info-description");
const inputName = document.querySelector(".popup__form-field-name");
const inputDescription = document.querySelector(
  ".popup__form-field-description"
);
const form = document.querySelector(".popup__form");
const addForm = document.querySelector(".popup__add-form");
const popupEditContainer = document.querySelector(".popup__container-edit");
const popupAddContainer = document.querySelector(".popup__container-add");
const gallery = document.querySelector(".gallery");
const imagePopup = document.querySelector(".popup__image");
const imagePopupPhoto = document.querySelector(".popup__image-photo");
const popupImageText = document.querySelector(".popup__image-text");

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

// Funciones para abrir popups
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
  imagePopup.style.display = "none";
  popupAddContainer.style.display = "block";
  addForm.reset();
}

function openImage(name, link) {
  imagePopupPhoto.src = link;
  imagePopupPhoto.alt = name;
  popupImageText.textContent = name;
  popup.classList.add("popup_visible");
  imagePopup.style.display = "block";
  popupEditContainer.style.display = "none";
  popupAddContainer.style.display = "none";
}

// Funciones para cerrar popups
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

// Función para agregar una tarjeta a la galería
function addCard(name, link) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".gallery__card-image");
  const cardTitle = cardElement.querySelector(".gallery__card-title");
  const likeButton = cardElement.querySelector(".gallery__card-like");
  const deleteButton = cardElement.querySelector(".gallery__card-delete");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", deleteCard);
  cardImage.addEventListener("click", () => openImage(name, link));
  gallery.prepend(cardElement);
}

// Funciones de manejo de formularios
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  popup.classList.remove("popup_visible");
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const name = addForm.querySelector(".popup__add-form-field-title").value;
  const link = addForm.querySelector(".popup__add-form-field-image").value;
  addCard(name, link);
  popup.classList.remove("popup_visible");
  addForm.reset();
}

// Función para manejar el evento de "me gusta"
function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("gallery__card-like_active");
}

// Función para eliminar una tarjeta
function deleteCard(evt) {
  const card = evt.target.closest(".gallery__card");
  card.remove();
}

// Función para crear tarjetas iniciales
function createInitialCards() {
  initialCards.forEach((card) => {
    addCard(card.name, card.link);
  });
}

// Asignación de eventos
openFormButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", openAddForm);
closeButton.addEventListener("click", closePopupByButton);
popup.addEventListener("click", closePopupByOverlay);
document.addEventListener("keydown", closePopupByEsc);
form.addEventListener("submit", handleProfileFormSubmit);
addForm.addEventListener("submit", handleAddFormSubmit);

// Crear las tarjetas iniciales al cargar la página
createInitialCards();
