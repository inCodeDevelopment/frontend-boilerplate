export const SET_POST = 'blog/SET_POST'
export const SET_POSTS = 'blog/SET_POSTS'
export const LOAD_POSTS = 'blog/LOAD_POSTS'
export const LOAD_POST = 'blog/LOAD_POST'

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

export function setPost(post) {
  return {
    type: SET_POST,
    post
  }
}

export function setPosts(posts) {
  return {
    type: SET_POSTS,
    posts
  }
}

// mock api
export function loadPosts() {
  return dispatch => new Promise(resolve => setTimeout(() => {
    dispatch(setPosts(POSTS))
    resolve()
  }, 100))
}

export function loadPost(id) {
  return dispatch => new Promise(resolve => setTimeout(() => {
    dispatch(setPost(POSTS.filter(post => post.id == id).pop()))
    resolve()
  }, 100))
}
