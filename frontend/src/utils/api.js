const baseUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3003'}`;

const _handleError = (res) => {
  if (res.ok) {
    return res.json();
  }

  console.log('Неудачный запрос fentch');
  return Promise.reject(res.status);
};

class Api {
  constructor({ baseApiUrl, headers }) {
    this._baseUrl = baseApiUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(_handleError);
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(
        data,
      ),
    })
      .then(_handleError);
  }

  changeAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(_handleError);
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(_handleError);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(_handleError);
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(_handleError);
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(_handleError);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(_handleError);
  }

  changeLikeCardStatus(id, isntLike) {
    if (isntLike) {
      return this.putLike(id);
    }

    return this.deleteLike(id);
  }

  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardsFromServer()]);
  }
}

const api = new Api(
  {
    baseApiUrl: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  },
);

export default api;
