export function openPopup(popup) {
  popup.classList.add("popup_visible");
}

export function closePopup(popup) {
  popup.classList.remove("popup_visible");
}

export function handleOverlayClick(evt, popup, closeFn) {
  if (evt.target === popup) {
    closeFn();
  }
}

export function handleEscClose(evt, closeFn) {
  if (evt.key === "Escape") {
    closeFn();
  }
}

export function setEventListeners(popup, closeFn) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", closeFn);
  popup.addEventListener("click", (evt) => handleOverlayClick(evt, popup, closeFn));
  document.addEventListener("keydown", (evt) => handleEscClose(evt, closeFn));
}
