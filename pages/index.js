import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const validationConfig = {
  inputSelector: ".popup__form-field-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-field-input-type-error",
  errorClass: "popup__form-field-input-error-visible",
};

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

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-description",
});

const profileFormValidator = new FormValidator(validationConfig, document.querySelector("#profile-form"));
const addFormValidator = new FormValidator(validationConfig, document.querySelector("#add-form"));
profileFormValidator.setEventListeners();
addFormValidator.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", handleCardClick);
      cardSection.addItem(card.generateCard());
    },
  },
  ".gallery"
);

cardSection.renderItems();

const editPopup = new PopupWithForm((inputValues) => {
  userInfo.setUserInfo({ name: inputValues.name, job: inputValues.description });
  editPopup.close();
}, "#edit-popup");
editPopup.setEventListeners();

const addPopup = new PopupWithForm((inputValues) => {
  const card = new Card({ name: inputValues.name, link: inputValues.link }, "#card-template", handleCardClick);
  cardSection.addItem(card.generateCard());
  addFormValidator.resetValidation();
  addPopup.close();
}, "#add-popup");
addPopup.setEventListeners();

document.querySelector(".profile__info-edit-button").addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  editPopup.setInputValues({ name, description: job });
  profileFormValidator.resetValidation();
  editPopup.open();
});

document.querySelector(".profile__info-add-button").addEventListener("click", () => {
  addFormValidator.resetValidation();
  addPopup.open();
});
