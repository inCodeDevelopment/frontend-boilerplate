import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { loadPosts } from '../actions'

class Posts extends Component {
  static needs = [
    loadPosts
  ]

  static propTypes = {
    posts: PropTypes.array
  }

  componentWillMount() {
    let { dispatch } = this.props
    dispatch(loadPosts())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts !== this.props.posts) {
      let { dispatch } = this.props
      dispatch(loadPosts())
    }
  }

  render() {
    let posts = this.props.posts

    if (posts) {
      return (
        <div>
          <Helmet title="Blog" />
          <h2>Blog:</h2>
          {posts.length ? (
            <ul>
              {this.props.posts.map((post, idx) =>
                <li key={idx}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
              )}
            </ul>
          ) : <span>No posts :(</span>}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

export default connect(
  state => ({ posts: state.blog.posts })
)(Posts)
