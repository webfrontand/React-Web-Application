import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { commentAddRequest } from '../actions/post';

class CommentBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      article:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }
  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    console.log(this.state.article);
  }
  handleComment(){
    this.props.commentAddRequest(this.props.detail._id, this.state.article).then(
      () => {
        console.log(this.props.detail._id);
        if(this.props.commentAddStatus === "SUCCESS"){
          this.setState({
            article: ''
          })
          let $toastContent = $('<span style="color: #fff">추가 완료!</span>');
          Materialize.toast($toastContent, 2000);
        } else {
          let errorMessage = [
            "올바르지 않은 접근입니다.",
            "내용은 필수 입력입니다.",
            "올바르지 않은 접근입니다."
          ];

          let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.commentAddError] + '</span>');
          Materialize.toast($toastContent, 2000);
        }
      }
    )
  }
  render(){

    return (
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
            <button
              className="btn waves-effect marginRight waves-light pink accent-3"
              onClick={this.handleComment}
            >
              작성
            </button>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    detail: state.post.detail.result,
    commentAddStatus: state.post.commentadd.status,
    commentAddError: state.post.commentadd.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    commentAddRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);
