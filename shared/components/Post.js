import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadPost } from '../actions'

class Post extends Component {
  static needs = [
    params => loadPost(params.id)
  ]

  static propTypes = {
    post: PropTypes.object
  }

  componentWillMount() {
    let { dispatch, params } = this.props
    dispatch(loadPost(params.id))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts !== this.props.posts) {
      let { dispatch, params } = this.props
      dispatch(loadPost(params.id))
    }
  }

  render() {
    const post = this.props.post
    if (post) {
      return (
        <div>
          <h2>{post.title}</h2>
          <div>{post.body}</div>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default connect(
  state => ({ post: state.blog.post })
)(Post)
