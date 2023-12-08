//Токен: 08a43134-6ee2-4e78-92c0-d49d38caaecf 

//Идентификатор группы: wff-cohort-2 

//Адрес сервера проекта Mesto: https://mesto.nomoreparties.co 

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '08a43134-6ee2-4e78-92c0-d49d38caaecf',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

//запросы данных о пользователе и карточек 

function getUserData() { 
return fetch (`${config.baseUrl}/users/me`, { 
  headers: { 
    authorization: config.headers.authorization 
  } 
}) 
  .then(handleResponse)
  .catch((error) => console.log('Ошибка при получении данных: ', error)) 
}

function getCardsData () {
  return fetch(`${config.baseUrl}/cards`, { 
  headers: { 
    authorization: config.headers.authorization, 
  }, 
}) 
  .then(handleResponse) 
  .catch((error) => console.log('Ошибка при получении данных: ', error))
}

//постановка/снятие лайка 
function likeCard(cardId) { 
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'PUT', 
    headers: { 
      authorization: config.headers.authorization, 
    }, 
  }) 

  .then(handleResponse) 
  .catch((error) => console.log('Ошибка при постановке лайка: ', error))
} 

function unlikeCard(cardId) { 
  return fetch (`${config.baseUrl}/cards/likes/${cardId}`, { 
    method: 'DELETE', 
    headers: { 
      authorization: config.headers.authorization, 
    }, 
  }) 

  .then(handleResponse) 
  .catch((error) => console.log('Ошибка при снятии лайка: ', error))
}

//удаление карточки 
function deleteNewCard(cardId) { 
  return fetch(`${config.baseUrl}/cards/${cardId}`, { 
    method: 'DELETE', 
    headers: { 
      authorization: config.headers.authorization, 
    }, 
  }) 
  .then(handleResponse) 
  .catch((error) => console.log('Ошибка при удалении карточки: ', error))
}

//редактирование профиля 
function editProfile(profileName, profileAbout) { 
  return fetch(`${config.baseUrl}/users/me`, { 
    method: 'PATCH', 
    headers: { 
      authorization: config.headers.authorization, 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ 
      name: profileName, 
      about: profileAbout, 
    }), 
  }) 

    .then(handleResponse) 
    .then((getUserData) => { 
    return getUserData; 
  }) 
    .catch((error) => console.log('Ошибка при изменении данных: ', error)); 
} 

//добавление новой карточки 
function addNewCard(cardName, cardLink) { 
  return fetch(`${config.baseUrl}/cards`, { 
    method: 'POST', 
    headers: { 
      authorization: config.headers.authorization, 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ 
      name: cardName, 
      link: cardLink, 
    }), 
  }) 

  .then(handleResponse) 
  .catch((error) => console.log('Ошибка при добавлении данных: ', error)); 
} 

//обновление аватара 
function updateAvatar (avatarImg) { 
  return fetch(`${config.baseUrl}/users/me/avatar`, { 
    method: 'PATCH', 
    headers: { 
      authorization: config.headers.authorization, 
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify({ 
      avatar: avatarImg, 
    }), 
  }) 

  .then(handleResponse) 
  .catch((error) => console.log('Ошибка при обновлении данных: ', error)); 
}

export {getUserData, getCardsData, addNewCard, editProfile, updateAvatar, likeCard, unlikeCard, deleteNewCard}; 