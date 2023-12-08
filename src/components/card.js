import { deleteNewCard, likeCard, unlikeCard } from "./api"; 

const cardTemplate = document.querySelector('#card-template').content; 

function handleLikeButton(likeButton) { 
  likeButton.classList.toggle('card__like-button_is-active');
} 

function createCard(cardData, cardId, userId, ownerId, cardLikes, deleteCard, handleLikeButton, openImagePopupHandler) { 
  const cardElement = cardTemplate.cloneNode(true); 
  const cardItem = cardElement.querySelector('.card'); 
  const likeButton = cardItem.querySelector('.card__like-button'); 
  const imgButton = cardItem.querySelector('.card__image'); 
  const deleteButton = cardItem.querySelector('.card__delete-button'); 
  const likesCounter = cardItem.querySelector('.number-of-likes'); 

  imgButton.src = cardData.link; 
  cardItem.querySelector('.card__title').textContent = cardData.name; 
  imgButton.alt = cardData.name; 
  likesCounter.textContent = cardLikes.length;

  if (ownerId === userId) { 
    deleteButton.style.display = 'block'; 
    deleteButton.addEventListener('click', () => { 
    deleteCard(cardItem, cardId); 
    }); 
  }  
  else { 
    deleteButton.style.display = 'none'; 
  } 

likeButton.addEventListener('click', (evt) => { 
  evt.preventDefault(); 
  const isCurrentlyLiked = likeButton.classList.contains('card__like-button_is-active'); 
  if (isCurrentlyLiked) { 
    unlikeCard(cardId) 
      .then((updatedCard) => { 
        likesCounter.textContent = updatedCard.likes.length; 
        handleLikeButton(likeButton); 
      }) 
      .catch((error) => { 
        console.log('Ошибка при снятии лайка: ', error); 
      }); 
  } else { 
    likeCard(cardId) 
      .then((updatedCard) => { 
        likesCounter.textContent = updatedCard.likes.length; 
        handleLikeButton(likeButton); 
      }) 
      .catch((error) => { 
        console.log('Ошибка при постановке лайка: ', error); 
      }); 
  } 
});  

  imgButton.addEventListener('click', (evt) => { 
    evt.preventDefault(); 
    openImagePopupHandler(evt); 
  }); 

  const userLiked = cardLikes.some(user => user._id === userId);
  if(userLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  return cardItem; 

} 

function deleteCard(cardItem, cardId) { 
  deleteNewCard(cardId) 
    .then(() => { 
      cardItem.remove(); 
    }) 
    .catch((error) => console.log('Ошибка при удалении карточки: ', error)); 
} 

export {createCard, cardTemplate, deleteCard, handleLikeButton};