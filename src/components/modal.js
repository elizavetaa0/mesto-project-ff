function openModal(popup) { 
  popup.classList.add('popup_is-opened'); 
  popup.addEventListener('click', closeByOverlayClick); 
  document.addEventListener('keydown', closeByEscHandler); 
} 

function closeModal(popup) { 
  popup.classList.remove('popup_is-opened'); 
  popup.removeEventListener('click', closeByOverlayClick); 
  document.removeEventListener('keydown', closeByEscHandler); 
} 


function closeByEscHandler(event) { 
  if (event.key === 'Escape') { 
    const openedPopup = document.querySelector('.popup_is-opened'); 
      closeModal(openedPopup);
  } 
} 

function closeByOverlayClick(event) { 
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) { 
    const clickedPopup = event.currentTarget; 
    if (clickedPopup) { 
      closeModal(clickedPopup); 
    } 
  } 
} 

export {openModal, closeModal}; 