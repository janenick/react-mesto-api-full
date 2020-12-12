import {
  apiParams
} from './constants.js';

const _handleError = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    console.log(`Неудачный запрос fentch`);
    return Promise.reject(res.status);
  }
}

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }


  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(_handleError);
  }


  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        data
      )
    })
      .then(_handleError);
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(_handleError);
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(_handleError);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(_handleError);
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(_handleError);
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(_handleError);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(_handleError);
  }

  changeLikeCardStatus(id, isntLike) {
    if (isntLike) {
      return this.putLike(id);
    }
    else {

      return this.deleteLike(id);
    }
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardsFromServer()]);
  }
}

const api = new Api({
  baseUrl: apiParams.baseUrl + '/v1/' + apiParams.cohortId,
  headers: {
    authorization: apiParams.token,
    'Content-Type': 'application/json'
  }
});

export default api;