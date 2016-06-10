import React, { Component } from 'react'

class Blog extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}


export default Blog
