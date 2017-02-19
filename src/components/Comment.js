import React, { Component } from 'react';

class Comment extends Component {
  render(){
    const { _id, article, thumbnail, username } = this.props.comments
    return (
      <div>
        <ul className="collection">
          <li className="collection-item" key={_id}>
            <div className="row">
              <div className="col s12 m6 l6">
                <img
                  className="circle thumbnailsmall"
                  src={`/thumbnail/${thumbnail}.jpg`}
                />
              </div>
              <div className="col s12 m6 l6">
                <h2>{username}</h2>
                <p>
                  {article}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Comment;
