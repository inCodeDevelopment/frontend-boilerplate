import { createAction } from 'redux-actions'

const POSTS = [
  {
    id: 1,
    title: 'Hello World!',
    body: 'This is a React + Redux universal app!'
  },
  {
    id: 2,
    title: 'Lorem ipsum',
    body: 'Lorem ipsum dolor sit amet'
  }
]

// mock api
export const loadPosts = createAction('posts/LOAD_POSTS', () => {
  return new Promise(resolve => setTimeout(() => {
    resolve(POSTS)
  }, 100))
})

export const loadPost = createAction('posts/LOAD_POST', (id) => {
  return new Promise(resolve => setTimeout(() => {
    resolve(POSTS.filter(post => post.id == id).pop())
  }, 100))
})
