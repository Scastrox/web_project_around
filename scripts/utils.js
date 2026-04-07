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
