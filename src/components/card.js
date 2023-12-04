import { deleteNewCard, likeCard, unlikeCard } from "./api";
const cardTemplate = document.querySelector('#card-template').content;

function handleLikeButton(likeButton) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');

  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}

function createCard(name, link, alt_name, ownerId, cardId, userId, cardLikes, handleLikeButton, openImagePopupHandler) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardItem = cardElement.querySelector('.card');
  const likeButton = cardItem.querySelector('.card__like-button');
  const imgButton = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likesCounter = cardItem.querySelector('.number-of-likes');

  imgButton.src = link;
  cardItem.querySelector('.card__title').textContent = name;
  imgButton.alt = alt_name;
  likesCounter.textContent = cardLikes;

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
      })
      .catch((error) => {
        console.error('Error unliking card:', error);
      });
  } else {
    likeCard(cardId)
      .then((updatedCard) => {
        likesCounter.textContent = updatedCard.likes.length;
      })
      .catch((error) => {
        console.error('Error liking card:', error);
      });
  }
  handleLikeButton(likeButton);
});

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