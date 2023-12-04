//Токен: 08a43134-6ee2-4e78-92c0-d49d38caaecf
//Идентификатор группы: wff-cohort-2
//Адрес сервера проекта Mesto: https://mesto.nomoreparties.co

import {createCard, handleLikeButton} from './card.js';
import {openImagePopupHandler, cardList} from '../index.js';

//запросы данных о пользователе и карточек
const userData = fetch ('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me', {
  headers: {
    authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf'
  }
})

  .then(res => res.json())


const cardsData = fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/cards', {
  headers: {
    authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf',
  },
})

  .then((res) => res.json())


const userCardsPromise = Promise.all([userData, cardsData])
  .then(([userData, cardsData]) => {
    const userId = userData._id;
    document.querySelector('.profile__title').textContent = userData.name;
    document.querySelector('.profile__description').textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

    cardsData.forEach((cardData) => {
      const cardId = cardData._id;
      const cardLikes = cardData.likes.length;
      const cardElement = createCard(cardData.name, cardData.link, cardData.alt_name, cardData.owner._id, cardId, userId, cardLikes, handleLikeButton, openImagePopupHandler);
      cardList.appendChild(cardElement);
    });
  })

  .catch((error) => console.log('Ошибка при получении данных: ', error));

//постановка/снятие лайка
function likeCard(cardId) {
  return fetch (`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf',
    },
  })

  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
}

function unlikeCard(cardId) {
  return fetch (`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf',
    },
  })

  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })
}

//удаление карточки
function deleteNewCard(cardId) {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-2/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf',
    },
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
}

//редактирование профиля
function editProfile(profileName, profileAbout) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  })
  
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })

  .then((userData) => {
    return userData;
  })
  
    .catch((error) => console.log('Ошибка при изменении данных: ', error));
  
}

//добавление новой карточки
function addNewCard(cardName, cardLink) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/cards', {
    method: 'POST',
    headers: {
      authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  })

  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })

  .catch((error) => console.log('Ошибка при добавлении данных: ', error));
}

//обновление аватара
function updateAvatar (avatarImg) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarImg,
    }),
  })

  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  })

  .catch((error) => console.log('Ошибка при обновлении данных: ', error));
}


export {userData, cardsData, userCardsPromise, addNewCard, editProfile, updateAvatar, likeCard, unlikeCard, deleteNewCard};

