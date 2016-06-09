import { createAction } from 'redux-actions'

const POSTS = [
  {
    id: 1,
    title: 'Lorem ipsum',
    body: 'Lorem ipsum dolor sit amet'
  }
]

export const setPosts = createAction('posts/SET_POSTS')

// mock api
export const loadPosts = createAction('posts/LOAD_POSTS', () => {
  return new Promise(resolve => setTimeout(() => {
    resolve(POSTS)
  }, 100))
})
