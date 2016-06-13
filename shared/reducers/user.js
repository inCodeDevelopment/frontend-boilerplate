import { handleActions } from 'redux-actions'
import { login, logout, auth } from '../actions/user'

const reducer = handleActions({
  [login]: (state, action) => ({ ...state, ...action.payload }),
  [logout]: () => null,
  [auth]: (state, action) => ({ ...state, ...action.payload })
}, null)
export default reducer
