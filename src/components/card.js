const cardTemplate = document.querySelector('#card-template').content;

function handleLikeButton(likeButton) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}

function createCard(name, link, alt_name, deleteCallBackFunc, handleLikeButton, openImagePopupHandler) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardItem = cardElement.querySelector('.card');
  const likeButton = cardItem.querySelector('.card__like-button');
  const imgButton = cardItem.querySelector('.card__image');
  const deleteButton = cardItem.querySelector('.card__delete-button');

  imgButton.src = link;
  cardItem.querySelector('.card__title').textContent = name;
  imgButton.alt = alt_name;


  deleteButton.addEventListener('click', () => {
    deleteCallBackFunc(cardItem);
  });

  likeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    handleLikeButton(likeButton);
  });

  imgButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    openImagePopupHandler(evt);
  });

  return cardItem;
}

function deleteCard(cardItem) {
  cardItem.remove();
}

export {createCard, cardTemplate, handleLikeButton, deleteCard};