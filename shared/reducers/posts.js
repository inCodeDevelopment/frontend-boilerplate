import { handleActions } from 'redux-actions'
import { setPosts, loadPosts } from '../actions'

const reducer = handleActions({
  [setPosts]: (state, action) => action.payload,
  [loadPosts]: (state, action) => action.payload
}, [])
export default reducer
