/*import {
  apiParams
} from './constants.js';

const BASE_URL = apiParams.baseUrl;
*/

const baseUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3003'}`

const checkResponce = (res) => {
  return new Promise((resolve, reject) => {
    const func = res.status < 400 ? resolve : reject;
    res.json().then((data) => {
      func({ 'status': res.status, 'data': data })
    })
  })
}

export const register = (password, email) => {
  return fetch(`${baseUrl}/signup`, {
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
  return fetch(`${baseUrl}/signin`, {
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
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(checkResponce)
}


