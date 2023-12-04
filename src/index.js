import './pages/index.css';

import { createCard, cardTemplate, handleLikeButton, deleteCard } from './components/card.js';

import { openModal, closeModal, closeByEscHandler, closeByOverlayClick } from './components/modal.js';

import { enableValidation, clearValidation } from './components/validation.js';

import {updateAvatar, addNewCard, editProfile} from './components/api.js';

//import { initialCards } from './components/cards.js';

//import {userData, cardsData, userCardsPromise, editProfile, addNewCard, updateAvatar, likeCard, unlikeCard} from './components/api.js'

//import avatarImage from './images/avatar.jpg';

//const profileImage = document.querySelector('.profile__image');
//profileImage.style.backgroundImage = `url(${avatarImage})`;

const cardList = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_avatar-edit');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const imageElement = popupImage.querySelector('.popup__image');
const captionElement = popupImage.querySelector('.popup__caption');
const nameDisplay = document.querySelector('.profile__title');
const jobDisplay = document.querySelector('.profile__description');
const newPlaceForm = document.forms['new-place'];
const newAvatrForm = document.forms['avatar-edit'];
const avatarEditButton = document.querySelector('.profile__image');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar');
const saveButton = document.querySelector('.popup__button');

function addCard(cardData) {
  const cardItem = createCard(
    cardData.name,
    cardData.link,
    cardData.alt_name,
    deleteCard,
    handleLikeButton,
    openImagePopupHandler
    );
  cardList.prepend(cardItem);
}

function openImagePopupHandler(event) {
  event.preventDefault();
  openModal(popupImage);
  const imageSource = event.target.src;
  const caption = event.target.alt;
  imageElement.src = imageSource;
  captionElement.textContent = caption;
}

/*function addCards(cards) {
  cards.forEach((cardData) => {
    const cardItem = createCard(cardData.name, cardData.link, cardData.alt_name, cardData.likes.length, deleteCard, handleLikeButton, openImagePopupHandler);
    cardList.appendChild(cardItem);
  });
}*/

//addCards(initialCards);

function addPopupAnimation(...popups) {
  popups.forEach(popup => {
    if (popup) {
      popup.classList.add('popup_is-animated');
    }
  });
}

addPopupAnimation(popupNewCard, popupEditProfile, popupImage, popupEditAvatar);

addButton.addEventListener('click', () => {
  newPlaceForm.reset();
  clearValidation(newPlaceForm);
  openModal(popupNewCard);
});

editButton.addEventListener('click', () => {
  clearValidation(popupEditProfile);
  openModal(popupEditProfile);
  nameInput.value = nameDisplay.textContent;
  jobInput.value = jobDisplay.textContent;
});

avatarEditButton.addEventListener('click', () => {
  newAvatrForm.reset();
  clearValidation(newAvatrForm);
  openModal(popupEditAvatar);
});

function submitEditAvatarForm(evt) {
  evt.preventDefault();
  const saveButton = popupEditAvatar.querySelector('.popup__button');
  setButtonText(saveButton, 'Сохранение...');
  const newAvatarUrl = avatarUrlInput.value;
  updateAvatar(newAvatarUrl)
  .then((newAvatar) => {
    document.querySelector('.profile__image').style.backgroundImage = `url(${newAvatar.avatar})`;
    setButtonText(saveButton, 'Сохранить');
    closeModal(popupEditAvatar);
  })
  .catch((error) => {
    console.error('Ошибка при обновлении аватара: ', error);
  });
}

const closeButton = document.querySelectorAll('.popup__close');
closeButton.forEach(button => button.addEventListener('click', closeByEscHandler, closeByOverlayClick));

function submitEditProfileForm(evt) {
  evt.preventDefault(); 
  const saveButton = popupEditProfile.querySelector('.popup__button');
  setButtonText(saveButton, 'Сохранение...');
  const newName = nameInput.value;
  const newAbout = jobInput.value;
  nameDisplay.textContent = newName;
  jobDisplay.textContent = newAbout;
  
  editProfile(newName, newAbout)
    .then((userData) => {
      nameDisplay.textContent = newName;
      jobDisplay.textContent = newAbout;
      setButtonText(saveButton, 'Сохранить');
      closeModal(popupEditProfile);
    })
}

popupEditProfile.addEventListener('submit', submitEditProfileForm); 

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const createButton = popupNewCard.querySelector('.popup__button');
  setButtonText(createButton, 'Сохранение...');
  const newCardName = cardNameInput.value;
  const newCardLink = cardUrlInput.value;
  addNewCard(newCardName, newCardLink)
    .then((newCardData) => {
      addCard({
        name: newCardData.name,
        link: newCardData.link,
        alt_name: newCardData.name,
      });
      setButtonText(createButton, 'Сохранить');
      evt.target.reset();
      closeModal(popupNewCard);
    })
}

function setButtonText(button, text) {
  button.textContent = text;
}

newPlaceForm.addEventListener('submit', handleCardFormSubmit);
newAvatrForm.addEventListener('submit', submitEditAvatarForm);

enableValidation();

export{openImagePopupHandler, cardList};