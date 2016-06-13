import { createAction } from 'redux-actions'
import fetch from 'isomorphic-fetch'

export const login = createAction('user/LOGIN')
export const logout = createAction('user/LOGOUT')

export const auth = createAction('user/AUTH', (email, password) =>
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
    return data
  })
)

function parseJSON(response) {
  return response.json()
}
