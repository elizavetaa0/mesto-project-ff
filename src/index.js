import './pages/index.css'; 

import { createCard, handleLikeButton, deleteCard } from './components/card.js'; 

import { openModal, closeModal } from './components/modal.js'; 

import { enableValidation, clearValidation, config } from './components/validation.js'; 

import {getUserData, getCardsData, updateAvatar, addNewCard, editProfile} from './components/api.js'; 

const cardList = document.querySelector('.places__list'); 
const addButton = document.querySelector('.profile__add-button'); 
const editButton = document.querySelector('.profile__edit-button'); 
const popupNewCard = document.querySelector('.popup_type_new-card'); 
const popupEditProfile = document.querySelector('.popup_type_edit'); 
const popupImage = document.querySelector('.popup_type_image'); 
const popupEditAvatar = document.querySelector('.popup_type_avatar-edit'); 
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

Promise.all([getUserData(), getCardsData()])
  .then(([userData, cardsData]) => {
    const userId = userData._id;
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((cardData) => {
      const cardId = cardData._id;
      const cardLikes = cardData.likes;
      const ownerId = cardData.owner._id;
      const cardElement = createCard(
        cardData,
        cardId,
        userId,
        ownerId,
        cardLikes,
        deleteCard,
        handleLikeButton,
        openImagePopupHandler
      );
      cardList.appendChild(cardElement);
    });
  })
  .catch((error) => console.log('Ошибка при загрузке данных: ', error));

function addCard(cardData) { 
  console.log(cardData);
  const cardId = cardData._id;
  const userId = cardData._id;
  console.log(cardData.owner);
  const ownerId = cardData.owner._id;
  const cardLikes = cardData.likes;

  const cardItem = createCard(
    cardData,
    cardId,
    userId,
    ownerId,
    cardLikes,
    deleteCard,
    handleLikeButton,
    openImagePopupHandler); 
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
  clearValidation(newPlaceForm, config); 
  openModal(popupNewCard); 
}); 


editButton.addEventListener('click', () => { 
  clearValidation(popupEditProfile, config); 
  openModal(popupEditProfile); 
  nameInput.value = nameDisplay.textContent; 
  jobInput.value = jobDisplay.textContent; 
}); 

avatarEditButton.addEventListener('click', () => { 
  newAvatrForm.reset(); 
  clearValidation(newAvatrForm, config); 
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
    closeModal(popupEditAvatar); 
  }) 
  .catch((error) => { 
    console.log('Ошибка при обновлении аватара: ', error); 
  })
  .finally(() => {
    setButtonText(saveButton, 'Сохранить'); 
  })
} 

const closeButtons = document.querySelectorAll('.popup__close'); 
closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
}); 

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
      closeModal(popupEditProfile); 
    }) 
    .catch((error) => { 
      console.log('Ошибка при обновлении данных: ', error); 
    })
    .finally(() => {
      setButtonText(saveButton, 'Сохранить'); 
    })
} 

popupEditProfile.addEventListener('submit', submitEditProfileForm);  

function handleCardFormSubmit(evt) { 
  evt.preventDefault(); 
  
  const saveButton = popupEditProfile.querySelector('.popup__button');
  const createButton = popupNewCard.querySelector('.popup__button'); 
  setButtonText(createButton, 'Сохранение...'); 
  const newCardName = cardNameInput.value; 
  const newCardLink = cardUrlInput.value; 

  addNewCard(newCardName, newCardLink)
    .then((newCardData) => {
      const cardData = {
        likes: newCardData.likes,
        _id: newCardData._id,
        name: newCardData.name,
        link: newCardData.link,
        owner: {
          name: newCardData.owner.name,
          about: newCardData.owner.about,
          avatar: newCardData.owner.avatar,
          _id: newCardData.owner._id,
          cohort: newCardData.owner.cohort,
        },
        createdAt: newCardData.createdAt,
      };
      addCard(cardData);
      evt.target.reset();
      closeModal(popupNewCard);
    })
    .catch((error) => { 
      console.log('Ошибка при добавлении новой карточки: ', error); 
    })
    .finally(() => {
      setButtonText(saveButton, 'Сохранить'); 
    })
} 

function setButtonText(button, text) { 
  button.textContent = text; 
} 

newPlaceForm.addEventListener('submit', handleCardFormSubmit); 
newAvatrForm.addEventListener('submit', submitEditAvatarForm); 

enableValidation(config); 

export{openImagePopupHandler, cardList}; 
