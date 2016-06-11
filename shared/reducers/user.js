import { handleActions } from 'redux-actions'
import { login } from '../actions/user'

const reducer = handleActions({
  [login]: (state, action) => action.payload
}, null)
export default reducer
