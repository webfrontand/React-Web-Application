import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { commentRemoveRequest } from '../actions/post';

class Comment extends Component {
  constructor(props){
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleRemove(){
    this.props.commentRemoveRequest(this.props.comment[this.props.index]._id, this.props.index).then(
      () => {
        if(this.props.commentremoveStatus === "SUCCESS"){
          let $toastContent = $('<span style="color: #fff">삭제 완료!</span>');
          Materialize.toast($toastContent, 2000);
        }
      }
    )

  }
  render(){
    const { _id, article, thumbnail, username, writer } = this.props.comments;
    const option = (
      <div>
        <button onClick={this.handleRemove}>삭제</button>
        <button>수정</button>
      </div>
    )
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
                { this.props.check == writer ? option : undefined }
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

function mapStateToProps(state){
  return {
    comment: state.post.comment.list,
    commentremoveStatus: state.post.commentremove.status
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    commentRemoveRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
