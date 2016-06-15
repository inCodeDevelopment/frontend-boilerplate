import fetch from 'isomorphic-fetch'

export const LOGIN = 'user/LOGIN'
export const LOGOUT = 'user/LOGOUT'
export const AUTH = 'user/AUTH'

export function login(user) {
  return {
    type: LOGIN,
    user
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function auth(email, password) {
  return dispatch => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    .then(parseJSON)
    .then((data) => {
      dispatch(login(data))
      return data
    })
  }
}

function parseJSON(response) {
  return response.json()
}
