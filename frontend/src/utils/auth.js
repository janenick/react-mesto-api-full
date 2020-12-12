export const BASE_URL = 'https://auth.nomoreparties.co';

// const checkResponse = (response) => response.ok ? response.json() : Promise.reject(`Ошибка from auth: ${response}`);


const checkResponce = (res) => {
  return new Promise((resolve, reject) => {
    const func = res.status < 400 ? resolve : reject;
    res.json().then((data) => {
      func({ 'status': res.status, 'data': data })
    })
  })
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponce)
};


export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(checkResponce)
};
export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponce)
}


