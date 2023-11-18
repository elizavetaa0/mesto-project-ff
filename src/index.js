import './pages/index.css';
import avatarImage from './images/avatar.jpg';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarImage})`;


import { createCard, cardTemplate, handleLikeButton, deleteCard } from './components/card.js';

import { openModal, closeModal, closePopupHandler } from './components/modal.js';

import { initialCards } from './components/cards.js';

const cardList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

function openImagePopupHandler(event) {
  event.preventDefault();
  openModal(popupImage);
  
  const imageSource = event.target.src;
  const caption = event.target.alt;
  
  const imageElement = popupImage.querySelector('.popup__image');
  const captionElement = popupImage.querySelector('.popup__caption');
  imageElement.src = imageSource;
  captionElement.textContent = caption;
}

function addCards(cards) {
  cards.forEach((cardData) => {
    const cardItem = createCard(cardData.name, cardData.link, cardData.alt_name, deleteCard, handleLikeButton, openImagePopupHandler);
    cardList.appendChild(cardItem);
  });
  
}

addCards(initialCards);

function addPopupAnimation(...popups) {
  popups.forEach(popup => {
    if (popup) {
      popup.classList.add('popup_is-animated');
    }
  });
}

addPopupAnimation(popupNewCard, popupEditProfile, popupImage);

addButton.addEventListener('click', () => openModal(popupNewCard));
editButton.addEventListener('click', () => openModal(popupEditProfile));
const closeButton = document.querySelectorAll('.popup__close');
closeButton.forEach(button => button.addEventListener('click', closePopupHandler));


function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const nameDisplay = document.querySelector('.profile__title');
  const jobDisplay = document.querySelector('.profile__description');
  nameDisplay.textContent = nameInput.value;
  jobDisplay.textContent = jobInput.value;
  closeModal(formElement.closest('.popup'));
}

formElement.addEventListener('submit', handleFormSubmit); 

function addCard(cardData) {
  const cardItem = createCard(cardData.name, cardData.link, cardData.alt_name, deleteCard, handleLikeButton, openImagePopupHandler);
  cardList.prepend(cardItem);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  addCard({
    name: cardNameInput.value,
    link: cardUrlInput.value,
    alt_name: cardNameInput.value,
  });
  
  evt.target.reset();
  closeModal(popupNewCard);
}

document.forms['new-place'].addEventListener('submit', handleCardFormSubmit); 

