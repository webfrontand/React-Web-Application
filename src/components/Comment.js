import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { commentRemoveRequest, commentUpdateRequest } from '../actions/post';

class Comment extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      article: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name] : e.target.value
    });
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
  handleToggle(){
    this.setState({
      isEdit: !this.state.isEdit
    });
    if(!this.state.isEdit){
      this.setState({
        article: this.props.comments.article
      });
    } else {
      let id = this.props.comment[this.props.index]._id;
      this.props.commentUpdateRequest(id, this.state.article, this.props.index).then(
        () => {
          if(this.props.commentupdateStatus === "SUCCESS"){
            let $toastContent = $('<span style="color: #fff">수정 완료!</span>');
            Materialize.toast($toastContent, 2000);
          } else {
            let errorMessage = [
              "올바르지 않은 접근입니다.",
              "내용은 필수 입력입니다.",
              "올바르지 않은 접근입니다."
            ];

            let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.commentupdateError] + '</span>');
            Materialize.toast($toastContent, 2000);
          }
        }
      )
    }
  }

  render(){
    const { _id, article, thumbnail, username, writer } = this.props.comments;
    const option = (
      <div>
        <button onClick={this.handleRemove}>삭제</button>
        <button onClick={this.handleToggle}>수정</button>
      </div>
    )

    const edit = (
      <div>
      <ul className="collection">
        <li className="collection-item">
          <h6>덧글</h6>
          <div className="input-field col s12">
            <textarea id="textarea1"
              className="materialize-textarea"
              name="article"
              value={this.state.article}
              onChange={this.handleChange}
              >
            </textarea>
            <label htmlFor="textarea1"></label>
          </div>
          <div className="col s12">
            { option }
          </div>
        </li>
      </ul>
      </div>
    )

    const basic = (
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
    )
    return (
      <div>
        { this.state.isEdit ? edit : basic }
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    comment: state.post.comment.list,
    commentremoveStatus: state.post.commentremove.status,
    commentupdateStatus: state.post.commentupdate.status,
    commentupdateError: state.post.commentupdate.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    commentRemoveRequest,
    commentUpdateRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
