import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";

const validationConfig = {
  inputSelector: ".popup__form-field-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-field-input-type-error",
  errorClass: "popup__form-field-input-error-visible",
};

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "d66a03ef-2db5-44c7-8963-5d86cd4b89e7",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__info-name",
  jobSelector: ".profile__info-description",
  avatarSelector: ".profile__picture",
});

const profileFormValidator = new FormValidator(validationConfig, document.querySelector("#profile-form"));
const addFormValidator = new FormValidator(validationConfig, document.querySelector("#add-form"));
const avatarFormValidator = new FormValidator(validationConfig, document.querySelector("#avatar-form"));
profileFormValidator.setEventListeners();
addFormValidator.setEventListeners();
avatarFormValidator.setEventListeners();

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deletePopup = new PopupWithConfirmation("#delete-popup");
deletePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

function handleLikeClick(card) {
  api
    .changeLikeStatus(card.getId(), !card.isLiked())
    .then((cardData) => {
      card.setLikeStatus(cardData.isLiked);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteClick(card) {
  deletePopup.setSubmitAction(() => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        deletePopup.close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  deletePopup.open();
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", userInfo.getUserId(), {
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
  });
  return card.generateCard();
}

let cardSection;

api
  .getAppData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          cardSection.addItem(createCard(cardData));
        },
      },
      ".gallery"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const editPopup = new PopupWithForm((inputValues) => {
  editPopup.renderLoading(true);
  api
    .updateUserInfo({ name: inputValues.name, about: inputValues.description })
    .then((userData) => {
      userInfo.setUserInfo(userData);
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.renderLoading(false);
    });
}, "#edit-popup");
editPopup.setEventListeners();

const addPopup = new PopupWithForm((inputValues) => {
  addPopup.renderLoading(true);
  api
    .addCard({ name: inputValues.name, link: inputValues.link })
    .then((cardData) => {
      cardSection.addItem(createCard(cardData));
      addPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPopup.renderLoading(false);
    });
}, "#add-popup");
addPopup.setEventListeners();

const avatarPopup = new PopupWithForm((inputValues) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(inputValues.avatar)
    .then((userData) => {
      userInfo.setAvatar(userData.avatar);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}, "#avatar-popup");
avatarPopup.setEventListeners();

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

document.querySelector(".profile__avatar-edit-button").addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});
