// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



function createCard(name, link, deleteCallBackFunc) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardItem = cardElement.querySelector('.card');
  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__title').textContent = name;

  const deleteButton = cardItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCallBackFunc(cardItem);
  });

  return cardItem;
}

function addCards(cards) {
  const listCard = document.querySelector('.places__list');

  cards.forEach((cardData) => {
    const cardItem = createCard(cardData.name, cardData.link, deleteCard);
    listCard.appendChild(cardItem);
  });
}

function deleteCard(cardItem) {
  cardItem.remove();
}

addCards(initialCards);















