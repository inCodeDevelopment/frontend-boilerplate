import { LOGIN, LOGOUT } from '../actions/user'

export default function user(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.user }
    case LOGOUT:
      return null
    default:
      return state
  }
}
