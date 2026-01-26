const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__form-field-input-type-error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__form-field-input-error-visible");
};

// Ocultar el mensaje de error para un campo específico
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__form-field-input-type-error");
  errorElement.classList.remove("popup__form-field-input-error-visible");
  errorElement.textContent = "";
};

// Validar un campo individual y mostrar/ocultar su error
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Retorna true si cualquier campo en la lista es inválido
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Habilitar/deshabilitar botón de envío según la validez de los campos
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__form-button_disabled");
    buttonElement.setAttribute("disabled", "");
  } else {
    buttonElement.classList.remove("popup__form-button_disabled");
    buttonElement.removeAttribute("disabled");
  }
};

// Adjuntar listeners de eventos a todos los campos dentro de un formulario/fieldset
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".popup__form-field-input"),
  );
  const buttonElement = formElement.querySelector(".popup__form-button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Inicializar validación en todos los formularios popup
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(".popup__form-fieldset"),
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

// iniciar validación
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field-input",
  submitButtonSelector: ".popup__form-button",
  inactiveButtonClass: "popup__form-button_disabled",
  inputErrorClass: "popup__form-field-input-type-error",
  errorClass: "popup__form-field-input-error-visible",
});

const resetValidation = () => {
  const formReset = Array.from(document.querySelectorAll(".popup__form"));
  formReset.forEach((formElement) => {
    // Resetear el formulario
    formElement.reset();

    // Limpiar todos los errores visuales
    const inputList = Array.from(
      formElement.querySelectorAll(".popup__form-field-input"),
    );
    const buttonElement = formElement.querySelector(".popup__form-button");

    // Limpiar clases de error y mensajes de todos los campos
    inputList.forEach((inputElement) => {
      inputElement.classList.remove("popup__form-field-input-type-error");
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`,
      );
      if (errorElement) {
        errorElement.classList.remove("popup__form-field-input-error-visible");
        errorElement.textContent = "";
      }
    });

    // Habilitar el botón de envío
    if (buttonElement) {
      buttonElement.classList.remove("popup__form-button_disabled");
      buttonElement.removeAttribute("disabled");
    }
  });
};
