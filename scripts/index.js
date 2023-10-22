// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


const cardTemplate = document.querySelector('#card-template').content;

function createCard(name, link, alt_name, deleteCallBackFunc) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardItem = cardElement.querySelector('.card');
  cardItem.querySelector('.card__image').src = link;
  cardItem.querySelector('.card__title').textContent = name;
  cardItem.querySelector('.card__image').alt = alt_name;

  const deleteButton = cardItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCallBackFunc(cardItem);
  });

  return cardItem;
}

const cardList = document.querySelector('.places__list');

function addCards(cards) {
  cards.forEach((cardData) => {
    const cardItem = createCard(cardData.name, cardData.link, cardData.alt_name, deleteCard);
    cardList.appendChild(cardItem);
  });
}

function deleteCard(cardItem) {
  cardItem.remove();
}

addCards(initialCards);















