import { SET_POSTS, SET_POST } from '../actions'

export default function posts(state = {}, action) {
  switch (action.type) {
    case SET_POST:
      return { ...state, post: action.post }
    case SET_POSTS:
      return { ...state, posts: action.posts }
    default:
      return state
  }
}
