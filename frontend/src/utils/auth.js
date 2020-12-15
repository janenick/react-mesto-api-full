const baseUrl = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3003'}`;

const checkResponce = (res) => new Promise((resolve, reject) => {
  console.log('checkResponce.res', res);
  const func = res.status < 400 ? resolve : reject;
  res.json().then((data) => {
    console.log('res.json().then((data)', data);
    func({ status: res.status, data });
  });
});

export const register = (password, email) => fetch(`${baseUrl}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then(checkResponce);

export const authorize = (email, password) => fetch(`${baseUrl}/signin`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ password, email }),
})
  .then(checkResponce);

export const getContent = (token) => fetch(`${baseUrl}/users/me`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then(checkResponce);
