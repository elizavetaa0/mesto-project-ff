function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupHandler);
  document.addEventListener('keydown', closePopupHandler);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopupHandler);
  document.removeEventListener('keydown', closePopupHandler);
}

function closePopupHandler(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  } else if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) {
    const clickedPopup = event.target.closest('.popup_is-opened');
    if (clickedPopup) {
      closeModal(clickedPopup);
    }
  }
}

export {openModal, closeModal, closePopupHandler};