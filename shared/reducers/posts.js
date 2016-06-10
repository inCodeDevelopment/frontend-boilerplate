import { handleActions } from 'redux-actions'
import { loadPosts, loadPost } from '../actions'

const reducer = handleActions({
  [loadPost]: (state, action) => ({ post: action.payload }),
  [loadPosts]: (state, action) => ({ posts: action.payload })
}, [])
export default reducer
